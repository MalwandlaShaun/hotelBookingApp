import  { useEffect } from "react";
import { Button, Form, Input } from "antd";
import { loadScript } from "../../utils/paystack"; // A utility function to load scripts dynamically
import "./payment.css"
const PaymentForm = () => {
  useEffect(() => {
    loadScript("https://js.paystack.co/v1/inline.js"); // Load the Paystack script dynamically
  }, []);

  const payWithPaystack = (e) => {
    e.preventDefault();

    let handler = window.PaystackPop.setup({
      key: "<Replace with your API Key>", // Replace with your public key
      email: document.getElementById("email-address").value,
      amount: document.getElementById("amount").value * 100,
      currency: "ZAR",
      ref: "" + Math.floor(Math.random() * 1000000000 + 1),
      onClose: function () {
        alert("Window closed.");
      },
      callback: function (response) {
        let message = "Payment complete! Reference: " + response.reference;
        alert(message);
      },
    });

    handler.openIframe();
  };

  return (
    <form id="paymentForm">
      <div className="form-group">
        <label htmlFor="email">Email Address</label>
        <input type="email" id="email-address" required />
      </div>
      <div className="form-group">
        <label htmlFor="amount">Amount</label>
        <input type="tel" id="amount" required />
      </div>
      <div className="form-group">
        <label htmlFor="first-name">First Name</label>
        <input type="text" id="first-name" />
      </div>
      <div className="form-group">
        <label htmlFor="last-name">Last Name</label>
        <input type="text" id="last-name" />
      </div>
      <div className="form-submit">
        <Button type="primary" onClick={payWithPaystack}>
          Pay
        </Button>
      </div>
    </form>
  );
};

export default PaymentForm;
