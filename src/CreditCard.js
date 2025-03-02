import React, { useState } from "react";

function CreditCard({ cart, totalPrice }) {
  const [cardNumber, setCardNumber] = useState("");
  const [error, setError] = useState("");
  const [isCardSaved, setIsCardSaved] = useState(false);

  // Format and validate credit card number
  const handleCardNumberChange = (event) => {
    let value = event.target.value.replace(/\D/g, ""); // Remove non-digit characters
    if (value.length <= 16) {
      setCardNumber(value.replace(/(\d{4})(?=\d)/g, "$1 ").trim()); // Format as 1234 5678 9012 3456
    }
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!/^\d{4} \d{4} \d{4} \d{4}$/.test(cardNumber)) {
      setError("Invalid card number format. Please enter a valid card.");
      return;
    }

    // Save card to localStorage
    localStorage.setItem("creditCard", cardNumber);
    setIsCardSaved(true);
    setError("");
  };

  return (
    <div className="credit-card-container">
      <h2>Credit Card Payment</h2>
      {isCardSaved ? (
        <div>
          <p>Card saved successfully!</p>
          <button onClick={() => alert("Payment Successful!")}>Confirm Payment</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Credit Card Number:</label>
            <input
              type="text"
              value={cardNumber}
              onChange={handleCardNumberChange}
              maxLength="19"
              placeholder="1234 5678 9012 3456"
              required
            />
          </div>
          {error && <div className="error">{error}</div>}
          <div>
            <button type="submit">Save Card</button>
          </div>
        </form>
      )}
      <div>
        <p>Total to Pay: ${totalPrice}</p>
      </div>
    </div>
  );
}

export default CreditCard;
