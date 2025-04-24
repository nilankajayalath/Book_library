import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5000/api";
axios.defaults.withCredentials = true;

export const useBookStore = create((set) => ({
  // initial state
  book: null,
  books: [],
  isLoading: false,
  error: null,
  message: null,

  // functions
  addBook: async (image, title, subtitle, author, link, review) => {
    set({ isLoading: true, error: null, message: null });

    try {
      const response = await axios.post(`${API_URL}/add-book`, {
        image,        // ✅ include the image here
        title,
        subtitle,
        author,
        link,
        review,
      });

      const { message, book } = response.data;

      set({ book, message, isLoading: false });
      return { message, book };
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Error adding book",
      });
      throw error;
    }
  },

   fetchBooks:async ()=>{
    set({isLoading:true,error:null});

    try{
        const response = await axios.get(`${API_URL}/fetch-books`);

        set({books:response.data.books,isLoading:false});
    }catch(error){
        set({
            isLoading: false,
            error: error.response?.data?.message || "Error fetching books",
          });
          throw error;
        }
    },
    
    SearchBooks : async (searchTerm)=>{
        set({isLoading:true,error:null});


        try {
            const response = await axios.get(`${API_URL}/search?${searchTerm}`);

            set({books:response.data.books,isLoading:false})
        } catch (error) {
            set({
                isLoading: false,
                error: error.response?.data?.message || "Error fetching books",
              });
              throw error;
            }
        
    },
    updateBook: async (id, updatedData) => {
        set({ isLoading: true, error: null });
      
        try {
          const response = await axios.put(`${API_URL}/update-book/${id}`, updatedData);
          const updatedBook = response.data.book;
      
          set((state) => ({
            books: state.books.map((book) => (book._id === id ? updatedBook : book)),
            isLoading: false,
          }));
        } catch (error) {
          set({
            isLoading: false,
            error: error.response?.data?.message || "Error updating book",
          });
        }
      },
      
      deleteBook: async (id) => {
        set({ isLoading: true, error: null });
      
        try {
          await axios.delete(`${API_URL}/delete-book/${id}`);
      
          set((state) => ({
            books: state.books.filter((book) => book._id !== id),
            isLoading: false,
          }));
        } catch (error) {
          set({
            isLoading: false,
            error: error.response?.data?.message || "Error deleting book",
          });
        }
      },
      

   
}));
