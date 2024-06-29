// CardItem.js

import React from 'react';
import toast, { Toaster } from "react-hot-toast";

const CardItems = ({ spaceName, imageUrl, spaceDescription, owner, location, height, width, price, category, userRole }) => {

    const handlePayment = async () => {
        try {
            const res = await fetch(`http://localhost:4000/api/payment/order`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    price
                })
            });

            const data = await res.json();
            console.log(data);
            handlePaymentVerify(data.data)
        } catch (error) {
            console.log(error);
        }
    }

    // handlePaymentVerify Function
    const handlePaymentVerify = async (data) => {
        const options = {
            key: 'rzp_test_ebn1FxoDnSsjSN',
            amount: price,
            currency: 'INR',
            name: "OOH",
            description: "Test Mode",

            handler: async (response) => {
                console.log("response", response)
                try {
                    const res = await fetch(`http://localhost:4000/api/payment/verify`, {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        })
                    })

                    const verifyData = await res.json();

                    if (verifyData.message) {
                        toast.success(verifyData.message)
                    }
                } catch (error) {
                    console.log(error);
                }
            },
            theme: {
                color: "#5f63b8"
            }
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    }
    return (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
            <h2 className="text-xl font-semibold">{spaceName}</h2>
            <img src={imageUrl}></img>
            <p className="text-gray-600 mb-2">{spaceDescription}</p>
            <div className="flex flex-wrap mb-2">
                <div className="w-full lg:w-1/2 mb-2 lg:mb-0">
                    <strong>Owner:</strong> {owner}
                </div>
                <div className="w-full lg:w-1/2">
                    <strong>Location:</strong> {location}
                </div>
            </div>
            <div className="flex flex-wrap">
                <div className="w-full lg:w-1/3 mb-2 lg:mb-0">
                    <strong>Dimensions:</strong> {height} x {width}
                </div>
                <div className="w-full lg:w-1/3 mb-2 lg:mb-0">
                    <strong>Price:</strong> Rs {price}
                </div>
                <div className="w-full lg:w-1/3">
                    <strong>Category:</strong> {category}
                </div>
            </div>
            <div className="flex justify-end mt-4">
                {userRole === 'admin' && (
                    <button className="bg-blue-500 text-white py-2 px-4 rounded-lg mr-2">Edit</button>
                )}
                {userRole === 'user' && (
                    <button className="bg-green-500 text-white py-2 px-4 rounded-lg" onClick={handlePayment}>Booking</button>
                )}
            </div>
        </div>
    );
};

export default CardItems;
