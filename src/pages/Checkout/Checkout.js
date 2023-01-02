import React, { useContext } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider/AuthProvider";

const Checkout = () => {
  const { _id, title, price, img } = useLoaderData();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleOrderPlace = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = `${form.firstName.value} ${form.lastName.value}`;
    const email = user?.email || "unregistered";
    const phone = form.phone.value;
    const address = form.address.value;
    const postCode = form.postcode.value;
    const currency = form.currency.value;

    const order = {
      service: _id,
      serviceName: title,
      price,
      customer: name,
      email,
      phone,
      address,
      postCode,
      currency,
    };

    // if(phone.length>10){
    //     alert('Phone number shoud be 10 characters or longer')
    // }else{}

    fetch("http://localhost:5000/orders", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("genius-token")}`,
      },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          alert("Order Place Successfully");
          form.reset();
          navigate("/orders");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="my-12">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl">You are about to order: {title}</h2>
          <h4 className="text-3xl">Price: {price}</h4>
          <img src={img} alt="" />
        </div>
        <div>
          <form className="mt-10" onSubmit={handleOrderPlace}>
            <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                className="input  input-bordered w-full "
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="input  input-bordered w-full "
              />
              <input
                type="text"
                name="phone"
                placeholder="Your Phone"
                required
                className="input  input-bordered w-full "
              />
              <input
                type="text"
                name="email"
                defaultValue={user?.email}
                readOnly
                placeholder="Your email"
                className="input input-bordered w-full "
              />
              <select
                defaultValue="BDT"
                name="currency"
                className="select select-bordered w-full max-w-xs"
              >
                <option value="BDT">BDT</option>
                <option value="USD">USD</option>
              </select>

              <input
                type="text"
                name="postcode"
                placeholder="Your PostCode"
                className="input input-bordered w-full "
              />
            </div>

            <textarea
              name="address"
              className="textarea my-4 textarea-bordered h-24 w-full"
              required
              placeholder="Your address"
            ></textarea>

            <input type="submit" className="btn w-full" value="Pay" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
