import express from "express";
import dotenv from "dotenv"
import { connectToDB } from "./config/db.js";
import User from "./models/user.models.js";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken";
import cors from "cors";
import cookieParser from "cookie-parser";
import {v2 as cloudinary} from "cloudinary";
import Book from "./models/book.model.js";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET,
});

const app = express();
const PORT = process.env.PORT || 5000;

console.log("PORT is", process.env.PORT)

//middleware
app.use(cors({origin: "http://localhost:5173",credentials: true}));
app.use(express.json({limit: "20mb"}));
app.use(cookieParser());

// Sign Up
app.post("/api/signup", async (req,res)=>{
    const {username,email,password} = req.body;

    try{
        if(!username || !email || !password){
            throw new Error("All fields are required.");
        }

     const emailExists = await User.findOne({email});
     if(emailExists){
        return res.status(400).json({message: "User already exists."})
     }
     const usernameExists = await User.findOne({username});
     if(usernameExists){
        return res.status(400).json({message:"Username is taken,try another name."});
     }
     //Hash the password
     const hashedPassword = await bcryptjs.hash(password,10);

      const userDoc = await User.create({
        username,
        email,
        password: hashedPassword,
      });
      

      //JWT 
      if(userDoc){
        const token = jwt.sign({id: userDoc._id}, process.env.JWT_SECRET,{
            expiresIn:"7d",
        });
        res.cookie("token",token,{
            httpOnly:true,
            secure:process.env.NODE_ENV === "production",
            sameSite:"strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
      }
      return res.status(200).json({user:userDoc,message: "User created Successfully."});
    }catch(error){
      return res.status(400).json({message: error.message});
    }
});

//login
app.post("/api/login", async(req,res) =>{
    const {email,password} = req.body;

    try{
        const userDoc = await User.findOne({email});

        if(!userDoc){
            return res.status(400).json({message: "Invalid credentials."});
        }

        const isPasswordValid = await bcryptjs.compareSync(
            password,
            userDoc.password
        );

        if(!isPasswordValid){
            return res.status(400).json({message: "Invalid credentials."});
        }

          //JWT 
      if(userDoc){
        const token = jwt.sign({id: userDoc._id}, process.env.JWT_SECRET,{
            expiresIn:"7d",
        });
        res.cookie("token",token,{
            httpOnly:true,
            secure:process.env.NODE_ENV === "production",
            sameSite:"strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
      }
      return res.status(200).json({user:userDoc,message: "Logged Successfully."});

    }catch(error){
        return res.status(400).json({message: error.message});
    }
});

//Fetch user
app.get("/api/fetch-user", async(req,res)=>{
    const {token} = req.cookies;

    if(!token){
        return res.status(401).json({message : "No token provided."});
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded){
            return res.status(401).json({message : "Invalid token."});
        }
        const userDoc = await User.findById(decoded.id).select("-password");

        if(!userDoc){
            return res.status(400).json({message: "User not found."});
        }
          res.status(200).json({user: userDoc});
    }catch(error){
       res.status(400).json({message: error.message});
    }
});

app.post("/api/logout",async (req,res)=>{
    res.clearCookie("token");
    res.status(200).json({message: "Logged out successfully."});
});

app.get("/api/search", async (req,res)=>{
    try{
        const searchTerm = req.query.searchTerm || "";

        const books = await Book.find({
            title:{$regex: searchTerm,$options:"i"},
        }).sort({createdAt: -1});

          return res.status(200).json({books});
    }catch(error){
           res.status(400).json({message:error.message});
    }
})

// ============ Book Functionalities ==========================
app.post("/api/add-book",async (req,res)=>{
    const {image,title,subtitle,author,link,review} = req.body;
    const {token} = req.cookies;
    if(!token){
        return res.status(401).json({message: "No token provided"});
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        if(!decoded){
            return res.status(401).json({ message: "Invalid token"});
        }
       //image processes
       const imageResponse = await cloudinary.uploader.upload(image,{
        folder:"/library"
       });

       console.log("Image response: ",imageResponse)

        const userDoc = await User.findById(decoded.id).select("-password");

        const book = await Book.create({
            image:imageResponse.secure_url,
            title,
            subtitle,
            author,
            link,
            review,
            user:userDoc,
        });
        return res.status(200).json({book,message: "Book added Successfully."});
    }catch(error){
        return res.status(400).json({message : error.message});
    }
})

 app.get("/api/fetch-books", async (req,res)=>{
    try{
        const books = await Book.find().sort({ createdAt: -1});
        return res.status(200).json({books});
    }catch(error){
        res.status(400).json({message:error.message});
    }
 })


 // DELETE a book
app.delete('/api/delete-book/:id', async (req, res) => {
    const { id } = req.params;
    await Book.findByIdAndDelete(id);
    res.json({ message: 'Book deleted successfully' });
  });
  
  // UPDATE a book
  app.put('/api/update-book/:id', async (req, res) => {
    const { id } = req.params;
    const { image, title, subtitle, author, link, review } = req.body;
  
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { image, title, subtitle, author, link, review },
      { new: true }
    );
  
    res.json({ message: 'Book updated successfully', book: updatedBook });
  });
  
app.listen(PORT,async ()=>{
    await connectToDB();
    console.log("Server started at PORT: ", PORT)
})