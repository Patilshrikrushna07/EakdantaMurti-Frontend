import React, { useState } from 'react';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    brand:"",
    category:"",
    stock_quantity: "",
    images: [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prevData) => ({
      ...prevData,
      images: files,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Perform client-side validation
    if (!formData.name || !formData.description || !formData.price) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      const response = await fetch(`${apiUrl}/create-product`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
    //   const data = await response.json();

      

      if (response.ok) {
        const data = await response.json();
        console.log("Product added successfully", data.data);
  
        const { name, description, images, price, category, brand } =   data;
        console.log("Name:", name);
        console.log("Description:", description);
        console.log("Images:", images);
        console.log("Price:", price);
        console.log("Category:", category);
        console.log("Brand:", brand);
      } else {
        console.error("Error adding product:", response.statusText);
        setError("Error adding product");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      setError("Error adding product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-lg font-semibold mb-4">Add Product</h2>
      {error && <div className="text-red-500">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Product Description:</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleChange} required className="mt-1 p-2 border border-gray-300 rounded-md w-full"></textarea>
        </div>
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Product Price:</label>
          <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} required className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Product Category:</label>
          <input type="text" id="category" name="category" value={formData.category} onChange={handleChange} required className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
        </div>
        <div>
          <label htmlFor="brand" className="block text-sm font-medium text-gray-700">Product Brand:</label>
          <input type="text" id="brand" name="brand" value={formData.brand} onChange={handleChange} required className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
        </div>
        <div>
          <label htmlFor="images" className="block text-sm font-medium text-gray-700">Product Images:</label>
          <input type="file" id="images" name="images" onChange={handleImageChange} multiple className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
