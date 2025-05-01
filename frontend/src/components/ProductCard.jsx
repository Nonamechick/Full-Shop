'use client'

import React, { useState } from 'react';
import { useProductStore } from '../store/product';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { ExclamationTriangleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

const ProductCard = ({ product, color }) => {
  // All your existing state and functions remain exactly the same
  const { deleteProduct, updateProduct } = useProductStore();
  const [openDelete, setOpenDelete] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [updatedProduct, setUpdateProduct] = useState(product);

  const handleDeleteProduct = async (pid) => {
    console.log('Deleting product with ID:', pid);
    const { success, message } = await deleteProduct(pid);
    console.log('Delete response:', { success, message });
    if (!success) {
      toast.error(message || 'Error deleting product', {
        position: 'top-right',
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      toast.success(message || 'Product deleted!', {
        position: 'top-right',
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const confirmDelete = () => {
    setOpenDelete(false);
    handleDeleteProduct(product._id);
  };

  const handleUpdateProduct = async (pid, updatedProduct) => {
    const {success, message} = await updateProduct(pid, updatedProduct);
    setOpenDetails(false);

    if (!success) {
      toast.error(message || 'Product not updated', {
        position: 'top-right',
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      toast.success(message || 'Product updated successfully', {
        position: 'top-right',
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  // Only style changes below this point
  return (
    <>
      <div className={`${color} text-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 w-full border border-gray-700`}>
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.image || 'https://images.unsplash.com/photo-1745905932716-431e50eac74b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4fHx8ZW58MHx8fHx8'}
            alt={product.name || 'Product'}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-bold line-clamp-1">{product.name || `Product ${product._id}`}</h3>
          <p className="text-xl font-semibold mt-2">${product.price || 'N/A'}</p>
          <div className="flex justify-end space-x-3 mt-4">
            <button
              onClick={() => setOpenDetails(true)}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Edit product"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </button>
            <button
              onClick={() => setOpenDelete(true)}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Delete product"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Delete Dialog - Styled but functionally identical */}
      <Dialog open={openDelete} onClose={() => setOpenDelete(false)} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md rounded-xl bg-gray-800 border border-gray-700 shadow-2xl overflow-hidden">
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-500/20">
                  <ExclamationTriangleIcon className="h-6 w-6 text-red-500" />
                </div>
                <div>
                  <DialogTitle className="text-lg font-bold text-white">
                    Delete Product
                  </DialogTitle>
                  <div className="mt-2">
                    <p className="text-sm text-gray-300">
                      Are you sure you want to delete "{product.name || `Product ${product._id} ? This action cannot be undone.` }
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-700/50 flex justify-end gap-3">
              <button
                onClick={() => setOpenDelete(false)}
                className="px-4 py-2 rounded-lg bg-gray-600 text-white font-medium hover:bg-gray-500 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-500 transition-colors"
              >
                Delete
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Edit Dialog - Styled but functionally identical */}
      <Dialog open={openDetails} onClose={() => setOpenDetails(false)} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        <div className="fixed inset-0 flex items-center justify-center p-4 overflow-y-auto">
          <DialogPanel className="w-full max-w-2xl rounded-xl bg-gray-800 border border-gray-700 shadow-2xl overflow-hidden">
            <div className="p-6 max-h-[80vh] overflow-y-auto">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-500/20">
                  <InformationCircleIcon className="h-6 w-6 text-blue-500" />
                </div>
                <DialogTitle className="text-xl font-bold text-white">
                  Product Details
                </DialogTitle>
              </div>

              <img
                src={product.image || 'https://images.unsplash.com/photo-1745905932716-431e50eac74b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4fHx8ZW58MHx8fHx8'}
                alt={product.name || 'Product'}
                className="w-full h-48 object-cover rounded-lg mb-6"
              />

              <form className="space-y-4">
                {Object.entries(updatedProduct).map(([key, value]) => {
                  const isReadOnly = ['_id', 'createdAt', 'updatedAt', '__v'].includes(key);
                  return (
                    <div key={key}>
                      <label className="block text-sm font-medium text-gray-300 capitalize mb-1">
                        {key}
                      </label>
                      <input
                        type="text"
                        value={typeof value === 'object' ? JSON.stringify(value) : value}
                        readOnly={isReadOnly}
                        onChange={(e) => {
                          if (!isReadOnly) {
                            const newValue = e.target.value;
                            setUpdateProduct((prev) => ({
                              ...prev,
                              [key]: newValue,
                            }));
                          }
                        }}
                        className={`w-full rounded-lg border ${isReadOnly ? 'border-gray-700 bg-gray-700 cursor-not-allowed' : 'border-gray-600 bg-gray-700'} px-3 py-2 text-sm text-white shadow-sm focus:outline-none ${!isReadOnly && 'focus:ring-2 focus:ring-blue-500'}`}
                      />
                    </div>
                  );
                })}
              </form>
            </div>

            <div className="px-6 py-4 bg-gray-700/50 flex justify-end gap-3 border-t border-gray-700">
              <button
                onClick={() => setOpenDetails(false)}
                className="px-4 py-2 rounded-lg bg-gray-600 text-white font-medium hover:bg-gray-500 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleUpdateProduct(product._id, updatedProduct)}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-500 transition-colors"
              >
                Save
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default ProductCard;