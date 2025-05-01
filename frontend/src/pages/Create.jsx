import React, { useState } from 'react';
import { useProductStore } from '../store/product';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';

const Create = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { createProduct } = useProductStore();

  const handleAddProduct = async () => {
    setIsSubmitting(true);
    const { success, message } = await createProduct(newProduct);
    
    toast[success ? 'success' : 'error'](message || (success ? "Product created!" : "An error occurred"), {
      position: "top-right",
      autoClose: 3000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'dark',
    });

    if (success) {
      setNewProduct({ name: "", price: "", image: "" });
    }
    setIsSubmitting(false);
  };

  const inputVariants = {
    focus: {
      scale: 1.02,
      boxShadow: "0 0 0 2px rgba(168, 85, 247, 0.5)"
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl space-y-6 max-w-md mx-auto my-12 border border-gray-700"
    >
      <motion.p 
        className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-6"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        Create New Product
      </motion.p>
      
      <motion.div className="w-full space-y-6">
        <motion.div whileFocus="focus" variants={inputVariants}>
          <input
            placeholder="Product Name"
            name="name"
            value={newProduct.name}
            className="w-full px-5 py-3 bg-gray-800 text-white border border-gray-700 rounded-xl focus:outline-none placeholder-gray-400 transition-all duration-200"
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          />
        </motion.div>

        <motion.div whileFocus="focus" variants={inputVariants}>
          <input
            type="number"
            placeholder="Price"
            name="price"
            value={newProduct.price}
            className="w-full px-5 py-3 bg-gray-800 text-white border border-gray-700 rounded-xl focus:outline-none placeholder-gray-400 transition-all duration-200"
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          />
        </motion.div>

        <motion.div whileFocus="focus" variants={inputVariants}>
          <input
            name="image"
            placeholder="Image URL"
            value={newProduct.image}
            className="w-full px-5 py-3 bg-gray-800 text-white border border-gray-700 rounded-xl focus:outline-none placeholder-gray-400 transition-all duration-200"
            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
          />
        </motion.div>
      </motion.div>

      <motion.button
        onClick={handleAddProduct}
        disabled={isSubmitting}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`w-full px-5 py-3 text-white font-semibold rounded-xl transition-all duration-300 ${isSubmitting ? 'bg-purple-800 cursor-not-allowed' : 'bg-gradient-to-r from-purple-600 to-pink-500 hover:shadow-lg hover:shadow-purple-500/30'}`}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </span>
        ) : (
          "Add Product"
        )}
      </motion.button>

      <ToastContainer 
        position="top-right"
        autoClose={3000}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </motion.div>
  );
};

export default Create;