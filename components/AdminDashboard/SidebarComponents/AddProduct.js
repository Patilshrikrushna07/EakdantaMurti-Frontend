import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import { toast } from "react-hot-toast";

export default function AddProduct({ products }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);

  const [formData, setFormData] = useState({
    productName: "",
    productPrice: "",
    productDescription: "",
    productBrand: "",
    productCategory: "",
    productSize: "",
    productQuantity: "",
    selectedImages: [],
  })

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleImageChange = (event) => {
    const files = event.target.files;
    setFormData((prevFormData) => ({
      ...prevFormData,
      selectedImages: [...prevFormData.selectedImages, ...files],
    }));
  };

  const removeImage = (indexToRemove) => {
    setFormData((prevFormData)=>({
      ...prevFormData,
      selectedImages: prevFormData.selectedImages.filter(
        (_, index) => index !== indexToRemove
      ),
    }))
    
  };

  const uploadProduct=async()=>{
    try {
      const formDataToUpload = new FormData();
      formDataToUpload.append("name", formData.productName);
      formDataToUpload.append("price", formData.productPrice);
      formDataToUpload.append("description", formData.productDescription);
      formDataToUpload.append("brand", formData.productBrand);
      formDataToUpload.append("category", formData.productCategory);
      formDataToUpload.append("size", formData.productSize);
      formDataToUpload.append("stock_quantity", formData.productQuantity);
      formData.selectedImages.forEach((image) =>
        formDataToUpload.append("images", image)
      );

      const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      const response = await fetch(`${apiUrl}/create-product`,{
        method:"POST",
        body:formDataToUpload
      });

      if(!response.ok){
        throw new Error("Failed to upload Product")
      }

      closeModal();
      toast.success("Product Added Successfully")

      console.log("Product Added Successfully");
    } catch (error) {
      console.error("Error uploading product:", error);
    }
  }

  // console.log("Products fetch successfully", products);
  const productsArray = products.data;

  return (
    <div className="w-[90%] relative mx-auto my-[5vh]">
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
          <div className="flex flex-row justify-between my-[2vh] items-center bg-white shadow-md p-[2vh]">
            <img
              src={product.images[0]}
              alt=""
              className="w-[15vh] h-[15vh] object-cover"
            />
            <div className="w-[70%]">
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
            <div>
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
                  {formData.selectedImages.map((image, index) => (
                    <div key={index} className="relative inline-block mr-[1vh]">
                      <img
                        src={URL.createObjectURL(image)}
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
                    id="outlined-basic"
                    label="Enter Product Name"
                    variant="outlined"
                    className="w-full"
                    value={formData.productName}
                    onChange={(e) =>
                      setFormData((prevFormData) => ({
                        ...prevFormData,
                        productName: e.target.value,
                      }))
                    }

                  />
                  <TextField
                    id="outlined-basic"
                    label="Enter Product Price"
                    variant="outlined"
                    className="w-full"
                    value={formData.productPrice}
                    onChange={(e) =>
                      setFormData((prevFormData) => ({
                        ...prevFormData,
                        productPrice: e.target.value,
                      }))
                    }
                  />
                </div>

                <TextField
                  id="outlined-basic"
                  label="Enter Product Description"
                  variant="outlined"
                  className="w-full mt-[2vh]"
                  value={formData.productDescription}
                  onChange={(e) =>
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      productDescription: e.target.value,
                    }))
                  }
                />

                <div className="flex flex-row gap-[1vh] my-[2vh]">
                  <TextField
                    id="outlined-basic"
                    label="Enter Product Brand"
                    variant="outlined"
                    className="w-full"
                    value={formData.productBrand}
                    onChange={(e) =>
                      setFormData((prevFormData) => ({
                        ...prevFormData,
                        productBrand: e.target.value,
                      }))
                    }
                  />
                  <TextField
                    id="outlined-basic"
                    label="Enter Product Category"
                    variant="outlined"
                    className="w-full"
                    value={formData.productCategory}
                    onChange={(e) =>
                      setFormData((prevFormData) => ({
                        ...prevFormData,
                        productCategory: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="flex flex-row gap-[1vh] my-[2vh]">
                  <TextField
                    id="outlined-basic"
                    label="Enter Product Size"
                    variant="outlined"
                    className="w-full"
                    value={formData.productSize}
                    onChange={(e) =>
                      setFormData((prevFormData) => ({
                        ...prevFormData,
                        productSize: e.target.value,
                      }))
                    }
                  />
                  <TextField
                    id="outlined-basic"
                    label="Enter Product Quantity"
                    variant="outlined"
                    className="w-full"
                    value={formData.productQuantity}
                    onChange={(e) =>
                      setFormData((prevFormData) => ({
                        ...prevFormData,
                        productQuantity: e.target.value,
                      }))
                    }
                  />
                </div>

                <button onClick={uploadProduct} className="text-center rounded-md text-[3vh] text-white px-[2vh] py-[1vh] bg-green-600">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
