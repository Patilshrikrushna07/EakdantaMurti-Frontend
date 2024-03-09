import React from "react";
import { useStateContext } from "../../context/StateContext";

export default function Cart() {
  const { cartItems, totalPrice, incQty, decQty, clearCart, removeProduct } =
    useStateContext();

  return (
    <div className="w-[90vw]">
      <h1 className="text-[4vh] font-semibold my-[4vh] text-center">My Cart</h1>
      <button
        onClick={clearCart}
        className="text-[2vh] mb-4 bg-red-500 text-white px-3 py-1 rounded"
      >
        Clear Cart
      </button>
      {cartItems.length > 0 ? (
        <div className="w-[100%]">
          {cartItems.map((product) => (
            <div
              key={product.data._id}
              className="w-[70%] flex flex-row bg-amber-100 border p-4 mb-4"
            >
              <div>
                <img
                  src={product.data.images[0]}
                  alt={product.data.name}
                  className="w-[25vh] h-[20vh]  object-cover rounded-sm"
                />
              </div>
              <div className="ml-[3vh]">
                <h3 className="text-[3vh] font-semibold">{product.data.name}</h3>
                <p className="text-gray-600 text-[2.7vh]">MRP: Rs.{product.data.price}</p>
                <p className="text-gray-600 text-wrap w-[60%]">{product.data.description}</p>
              </div>

              {/* <p className="text-gray-600">Size: {product.selectedSize}</p> */}

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
              </div>
              <button
                onClick={() => removeProduct(product.data._id)}
                className="text-[2.5vh] font-medium text-red-500 ml-auto"
              >
                Remove
              </button>
            </div>
          ))}
          <p className="text-xl font-semibold text-right">
            Total Price: Rs.{totalPrice}
          </p>
        </div>
      ) : (
        <p>Your cart is empty!</p>
      )}
    </div>
  );
}
