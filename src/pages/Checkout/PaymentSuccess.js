import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const PaymentSuccess = () => {
  const [order, setOrder] = useState({});
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const transactionId = query.get("transactionId");

  useEffect(() => {
    fetch(`http://localhost:5000/orders/by-transactionId/${transactionId}`)
      .then((res) => res.json())
      .then((data) => setOrder(data));
  }, [transactionId]);

  console.log(order);

  if (!order?._id) {
    return <div>No order found</div>;
  }

  return (
    <div className="my-10 w-[30%] mx-auto">
      <h2 className="text-2xl font-bold mb-3 text-green-600">
        Congrats! Successfully Paid.
      </h2>

      <div className="border p-4 rounded-md">
        <h3 className="text-xl mb-1 font-medium">Your Order Summary</h3>
        <p>
          <span className="font-medium">Name:</span> {order.customer}
        </p>
        <p>
          <span className="font-medium">ServiceName:</span> {order.serviceName}
        </p>
        <p>
          <span className="font-medium">Price:</span> {order.price}
        </p>
        <p>
          <span className="font-medium">Shipping Address:</span> {order.address}
        </p>
        <p>
          <span className="font-medium">TransactionId:</span>{" "}
          {order.transactionId}
        </p>
      </div>
      <button
        className="btn btn-primary mt-5 print:hidden"
        onClick={() => window.print()}
      >
        Print
      </button>
    </div>
  );
};

export default PaymentSuccess;
