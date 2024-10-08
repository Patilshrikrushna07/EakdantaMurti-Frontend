import React, {useState} from "react";
import { useStateContext } from "../../context/StateContext";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from "next/link";
import DeleteIcon from "@mui/icons-material/Delete";


export default function Cart() {
  const { cartItems, totalPrice, incQty, decQty, clearCart, removeProduct } =
    useStateContext();

  const calculateTotal = () => {
    const shippingCharges = 299;
    const total = totalPrice + shippingCharges;
    return total;
  };

  // checkbox
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <div className="w-[90vw]">
      {/* <h1 className="text-[4vh] font-semibold my-[4vh] text-center">My Cart</h1> */}
      {cartItems.length > 0 && (
        <button
          onClick={clearCart}
          className="text-[2vh] mb-4 bg-red-500 text-white px-3 py-1 rounded"
        >
          Clear Cart
        </button>
      )}

      {cartItems.length > 0 ? (
        <div className="flex flex-col md:flex-row justify-between  md:space-x-5">
          <div className="overflow-y-scroll md:h-[50vh] w-[70vw]">
            {cartItems.map((product) => (
              <div
                key={product.data._id}
                className="flex flex-row md:justify-evenly bg-[#ffffffdc] border p-4 mb-4"
              >
                <div>
                  <img
                    src={product.data.images[0]}
                    alt={product.data.name}
                    className="md:w-[20vh] md:h-[20vh] w-[12vh]  object-cover rounded-sm"
                  />
                </div>
                <div className="mx-[3vh] w-[60%] flex flex-col space-y-2">
                  <h3 className="md:text-[3vh] font-semibold">
                    {product.data.name}
                  </h3>

                  <p className="text-gray-600 text-wrap hidden md:block ">
                    {product.data.description}
                  </p>
                </div>

                {/* <p className="text-gray-600">Size: {product.selectedSize}</p> */}
                <div className="flex flex-col justify-between">
                  <p className="text-gray-600 md:text-[2.3vh] font-medium">
                    MRP: Rs.{product.data.price}
                  </p>
                  <div className="flex items-center mt-2">
                    <div className="flex items-center border rounded">
                      <button onClick={() => decQty(product)} className="px-2">
                        -
                      </button>
                      <span className="px-2">{product.quantity}</span>
                      <button onClick={() => incQty(product)} className="px-2">
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeProduct(product.data._id)}
                      className="text-[2.5vh] font-medium text-[#B88E2F] hover:text-red-600 ml-auto"
                    >
                      <DeleteIcon />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="md:w-[30vw] sticky bg-[#fcf0e8be]  shadow-md flex flex-col justify-center  space-y-4">
            <h1 className="md:text-[3.2vh] text-[#652222] font-medium text-center">
              Cart Totals
            </h1>
            <div className="mx-auto p-[2vh]">
              <p className="text-lg my-[2vh] ">Sub Total: Rs.{totalPrice}</p>
              <p className="text-lg my-[2vh] ">Shipping Carges: Rs.299</p>
              <p className="text-lg my-[2vh] font-medium">
                Total : Rs.{calculateTotal()}
              </p>
              <FormControlLabel
                control={<Checkbox checked={checked} onChange={handleChange} required />}
                label="I agree to the terms and conditions"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="h-auto my-[15vh]">
          <p className="text-[5vh] text-center my-[2vh]">Your cart is empty!</p>
          <Link href="/shop">
            <p className="text-center my-[2vh] font-semibold shadow-md hover:scale-125 hover:bg-[#B88E2F] hover:text-white transition-all mx-auto py-[1vh] text-[#B88E2F]  border-[#B88E2F] border-[0.3vh] w-[35vw] md:w-[15vw]">
              Continue Shopping
            </p>
          </Link>
        </div>
      )}
    </div>
  );
}
