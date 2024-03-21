import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import { getCookie, getCookies, setCookie } from "cookies-next";
import { toast } from "react-hot-toast";

export default function AddProduct({ products }) {

  const [showModal, setShowModal] = useState(false);
  const [images, setImages] = useState([]);
  const [imageUploading, setImageUploading] = useState(false);
  const token = getCookie('auth_token')

  const [formData, setFormData] = useState({
    name: "",
    size: "",
    images: [],
    description: "",
    price: "",
    category: "",
    brand: "",
    stock_quantity: ""
  });

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = async (event) => {
    const files = event.target.files;
    if (!files || files.length === 0) {
      toast.error("No images selected!");
      return;
    }

    const validFiles = Array.from(files).filter(
      (file) =>
        file.type === "image/png" ||
        file.type === "image/jpg" ||
        file.type === "image/jpeg"
    );

    if (validFiles.length === 0) {
      toast.error("No valid images selected!");
      return;
    }

    setImageUploading(true);

    const uploadPromises = validFiles.map((file) => {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "ekdanta-murti"); 
      data.append("cloud_name", "gaurav-1920");

      return fetch("https://api.cloudinary.com/v1_1/gaurav-1920/image/upload", {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          setFormData((prevFormData) => ({
            ...prevFormData,
            images: [...prevFormData.images, res.url],
          }));
          return res.url;
        })

        .catch((error) => {
          console.error("Error uploading image:", error);
          toast.error("Failed to upload image!");
          return null;
        });
    });

    Promise.all(uploadPromises)
      .then((uploadedUrls) => {
        const successfulUploads = uploadedUrls.filter((url) => url !== null);
        console.log("Successfully uploaded URLs:", successfulUploads);
        setImageUploading(false);
      })
      .catch((error) => {
        console.error("Error uploading images:", error);
        toast.error("Failed to upload images!");
        setImageUploading(false);
      });
  };

  const removeImage = (indexToRemove) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      images: prevFormData.images.filter(
        (_, index) => index !== indexToRemove
      ),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        !formData.name ||
        !formData.price ||
        !formData.description ||
        !formData.brand ||
        !formData.category ||
        !formData.size ||
        !formData.stock_quantity ||
        formData.images.length === 0
      ) {
        toast.error("Please fill all required fields");
        return;
      }
  
      const data = {
        name: formData.name,
        size: formData.size,
        description: formData.description,
        price: formData.price,
        category: formData.category,
        brand: formData.brand,
        stock_quantity: formData.stock_quantity,
        images: formData.images // Sending all images as an array
      };
  
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/create-product`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data)
      });
  
      const responseData = await response.json();
  
      if (response.status === 200 && responseData.status) {
        toast.success("Product Added Successfully");
        // Optionally, reset the form fields after successful upload
        setFormData({
          name: "",
          size: "",
          images: [],
          description: "",
          price: "",
          category: "",
          brand: "",
          stock_quantity: ""
        });
      } else {
        throw new Error(responseData.message || "Failed to add product");
      }
    } catch (error) {
      console.error("Error uploading product:", error);
      toast.error("Failed to add product!");
    }
  };
  
  
  const productsArray = products ? products.data : [];

  

  return (
    <div className=" relative mx-auto my-[5vh]">
      <h1 className="text-[3.6vh] font-semibold text-center text-[#2a2a2a]">
        EkdantaMurti - Products
      </h1>

      <button
        onClick={openModal}
        className="text-[2.7vh] active:bg-blue-800 px-[2vh] py-[1vh] text-white font-medium absolute top-0 right-0 bg-blue-600"
      >
        Add Product
      </button>

      <div className="my-[5vh]">
        {productsArray.map((product) => (
          <div key={product._id} className="flex flex-row justify-between my-[2vh] items-center bg-white shadow-md p-[2vh]">
            <img
              src={product.images[0]}
              alt=""
              className="w-[15vh] h-[15vh] object-cover"
            />
            <div className="w-[60%]">
              <h1 className="text-[3vh] font-semibold text-[#2a2a2a]">
                {product.name}
              </h1>
              <p className="text-[2.4vh] text-gray-700">
                {product.description}
              </p>
            </div>
            <div>
              <p className="text-[3vh] text-green-600 font-semibold">
                Rs. {product.price}
              </p>
            </div>
            <div>
              <button className="text-white active:bg-blue-800 mr-[1vh] rounded-md bg-blue-600 px-[2vh] py-[1vh] text-[2.5vh] font-semibold">
                Edit
              </button>
              <button className="text-white active:bg-red-700 rounded-md bg-red-600 px-[2vh] py-[1vh] text-[2.5vh] font-semibold">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for adding a product */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white relative w-[60vw] h-auto p-[2vh] rounded-lg">
            <h2 className="text-[3.5vh] text-amber-950 text-center font-semibold mb-[2vh]">
              Add Product
            </h2>
            <h1
              onClick={closeModal}
              className="absolute right-[2vh] top-[2.5vh] text-red-600 cursor-pointer"
            >
              <CloseIcon className="text-[5vh]" />
            </h1>

            {/* form */}
            <form onSubmit={handleSubmit}>
              <div>
                <div className="relative">
                  <label
                    htmlFor="images"
                    className="cursor-pointer bg-blue-600 text-white py-[1vh] px-[2vh] rounded-md inline-block"
                  >
                    Select Images
                  </label>
                  <input
                    type="file"
                    name="images"
                    id="images"
                    multiple
                    onChange={handleImageChange}
                    className="opacity-0 absolute inset-0"
                  />
                </div>

                <div className=" flex flex-row gap-[1vh] my-[2vh] ">
                  {formData.images.map((imageUrl, index) => (
                    <div key={index} className="relative inline-block mr-[1vh]">
                      <img
                        src={imageUrl}
                        alt={`Image ${index + 1}`}
                        className="w-[20vh] h-[20vh] object-cover mt-[1vh] overflow-x-scroll"
                      />
                      <CloseIcon
                        className="absolute bg-red-600 rounded-md text-white -top-[0.5vh] -right-[0.5vh] cursor-pointer"
                        onClick={() => removeImage(index)}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex flex-row gap-[1vh]">
                  <TextField
                    id="outline-basic"
                    name="name"
                    label="Enter Product Name"
                    variant="outlined"
                    className="w-full"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <TextField
                    id="outline-basic"
                    name="price"
                    label="Enter Product Price"
                    variant="outlined"
                    className="w-full"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </div>

                <TextField
                  id="outline-basic"
                  name="description"
                  label="Enter Product Description"
                  variant="outlined"
                  className="w-full mt-[2vh]"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />

                <div className="flex flex-row gap-[1vh] my-[2vh]">
                  <TextField
                    id="outline-basic"
                    name="brand"
                    label="Enter Product Brand"
                    variant="outlined"
                    className="w-full"
                    value={formData.brand}
                    onChange={handleChange}
                    required
                  />
                  <TextField
                    id="outline-basic"
                    name="category"
                    label="Enter Product Category"
                    variant="outlined"
                    className="w-full"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="flex flex-row gap-[1vh] my-[2vh]">
                  <TextField
                    id="outline-basic"
                    name="size"
                    label="Enter Product Size"
                    variant="outlined"
                    className="w-full"
                    value={formData.size}
                    onChange={handleChange}
                    required
                  />
                  <TextField
                    id="outline-basic"
                    name="stock_quantity"
                    label="Enter Product Quantity"
                    variant="outlined"
                    className="w-full"
                    value={formData.stock_quantity}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button
                  // onClick={uploadProduct}
                  type="submit"
                  className="text-center rounded-md text-[3vh] text-white px-[2vh] py-[1vh] bg-green-600"
                >
                  Save Changes
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
}
