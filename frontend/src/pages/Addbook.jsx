import React, { useState } from 'react';
import toast from "react-hot-toast";
import { useBookStore } from "../store/bookStore";
import { useNavigate } from "react-router";

const Addbook = () => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [author, setAuthor] = useState("");
  const [link, setLink] = useState("");
  const [review, setReview] = useState("");

  const { addBook, isLoading, error } = useBookStore();
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = function () {
      setImage(reader.result); // ✅ FIXED: changed setImage0 to setImage
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image || !title || !author || !link) {
      toast.error("Please fill in required info.");
      return;
    }

    try {
      const { message } = await addBook(image, title, subtitle, author, link, review);
      toast.success(message);
      navigate("/");
    } catch (err) {
      toast.error("Failed to add book.");
    }
  };

  return (
    <div className='min-h-screen text-[#252422] bg-[#f5f5f5] px-4 md:px-12 pb-16'>
      <h2 className='text-center font-semibold pt-8 md:text-2xl w-full max-w-xl mx-auto'>Add Book to Library</h2>

      <form
        onSubmit={handleSubmit}
        className='flex flex-col justify-center items-center w-full max-w-xl mx-auto space-y-4 mt-10'>

        <div className='flex flex-col w-full'>
          <label className='md:text-lg'>Book Image*:</label>
          <input type='file' accept='image/*' onChange={handleImageChange} className='w-full px-3 py-1.5 md:py-2 text-[#252422] rounded-lg bg-white border border-gray-500' />
        </div>

        <div className='flex flex-col w-full'>
          <label className='md:text-lg'>Title*: </label>
          <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} className='w-full px-3 py-1.5 md:py-2 text-[#252422] rounded-lg bg-white border border-gray-500' />
        </div>

        <div className='flex flex-col w-full'>
          <label className='md:text-lg'>Subtitle (optional): </label>
          <input type='text' value={subtitle} onChange={(e) => setSubtitle(e.target.value)} className='w-full px-3 py-1.5 md:py-2 text-[#252422] rounded-lg bg-white border border-gray-500' />
        </div>

        <div className='flex flex-col w-full'>
          <label className='md:text-lg'>Author*: </label>
          <input type='text' value={author} onChange={(e) => setAuthor(e.target.value)} className='w-full px-3 py-1.5 md:py-2 text-[#252422] rounded-lg bg-white border border-gray-500' />
        </div>

        <div className='flex flex-col w-full'>
          <label className='md:text-lg'>Link*: </label>
          <input type='text' value={link} onChange={(e) => setLink(e.target.value)} className='w-full px-3 py-1.5 md:py-2 text-[#252422] rounded-lg bg-white border border-gray-500' />
        </div>

        <div className='flex flex-col w-full'>
          <label className='md:text-lg'>Personal review (optional): </label>
          <textarea rows={4} value={review} onChange={(e) => setReview(e.target.value)} className='w-full px-3 py-1.5 md:py-2 text-[#252422] rounded-lg bg-white border border-gray-500' />
        </div>

        {error && <p className='text-red-500'>{error}</p>}

        <button
          type='submit'
          className='w-full bg-[#403D39] text-[#FFFCF2] py-2 font-medium rounded-lg'>
          {isLoading ? "Please wait..." : "Add book"}
        </button>

      </form>
    </div>
  );
};

export default Addbook;
