import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useLocation } from "react-router-dom";

import CheckoutForm from "../components/CheckoutForm";

const Payment = () => {
  const stripePromise = loadStripe(
    "pk_test_51P14G0LBBp7DtaJdoG5N3adfYKy98znOUp8qmBC5O7wh9AHbCvuafQcoURXd2b86yz7WOGfCQAlQlkunOZXZ87NS00Xz7r5NaZ"
  );
  const location = useLocation();

  const { productName, totalPrice, protectionFees, shippingFees, price } =
    location.state;

  const options = {
    mode: "payment",
    amount: Number((price * 100).toFixed(0)),
    currency: "eur",
  };

  return (
    <div className="payment-section">
      <div className="payment-container">
        <div className="payment-sumup">
          <div className="title-summary">Résumé de la commande</div>
          <div className="content">
            <ul>
              <li>
                Commande <p>{price} €</p>
              </li>
              <li>
                Frais protection acheteurs <p>{protectionFees} €</p>
              </li>
              <li>
                Frais de port <p>{shippingFees} €</p>
              </li>
            </ul>
          </div>
          <div className="divider" />
          <div className="content">
            <ul>
              <li className="bold">
                Total <p>{totalPrice} €</p>
              </li>
            </ul>
          </div>
        </div>
        <div className="payment-sumup">
          <div className="content">
            <div className="text-summary">
              Il ne vous reste plus qu'un étape pour vous offrir
              <span className="bold"> {productName}</span>. Vous allez payer
              <span className="bold"> {totalPrice} €</span> (frais de protection
              et frais de port inclus).
            </div>
            <div className="divider" />
            <div className="card-info">
              <Elements stripe={stripePromise} options={options}>
                <CheckoutForm
                  productName={productName}
                  totalPrice={totalPrice}
                />
              </Elements>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
