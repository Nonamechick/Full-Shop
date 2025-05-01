'use client'

import { create } from 'zustand';

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: 'Please provide with good input' };
    }
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });
      const data = await res.json();
      if (!data.success || !data.data) {
        return { success: false, message: data.message || 'Failed to create product' };
      }
      set((state) => ({ products: [...state.products, data.data] }));
      return { success: true, message: 'Product created' };
    } catch (error) {
      return { success: false, message: error.message || 'Error creating product' };
    }
  },

  fetchProducts: async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      // Handle different API response structures
      const fetchedProducts = Array.isArray(data.data) ? data.data : Array.isArray(data) ? data : [];
      set({ products: fetchedProducts });
    } catch (error) {
      console.error('Failed to fetch products:', error);
      set({ products: [] }); // Fallback to empty array on error
    }
  },

  deleteProduct: async (pid) => {
    try {
      const res = await fetch(`/api/products/${pid}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!data.success) {
        return { success: false, message: data.message || 'Failed to delete product' };
      }
      // Update the UI immediately
      set((state) => ({
        products: state.products.filter((product) => product._id !== pid),
      }));
      return { success: true, message: data.message || 'Product deleted' };
    } catch (error) {
      return { success: false, message: error.message || 'Error deleting product' };
    }
  },


  updateProduct: async (pid, updateProduct) => {
    try {
      const res = await fetch(`/api/products/${pid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateProduct),
      });
      const data = await res.json();
      if (!data.success) {
        return { success: false, message: data.message || 'Failed to update product' };
      }
      // Update the UI immediately
      set((state) => ({
        products: state.products.map((product) =>
          (product._id === pid ? data.data : product)
        ),
      }));
      return { success: true, message: data.message || 'Product updated' };
    } catch (error) {
      return { success: false, message: error.message || 'Error updating product' };
    }
  },

}));