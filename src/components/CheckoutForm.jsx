import { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";

const CheckoutForm = ({ productName, totalPrice }) => {
  // Permet de faire une requête à Stripe pour confirmer le paiement
  const stripe = useStripe();
  // Permet de récupérer le contenu des inputs
  const elements = useElements();

  // State qui gère les messages d'erreurs
  const [error, setError] = useState(null);
  // State qui gère le fait que le paiement a été effectué
  const [completed, setCompleted] = useState(false);
  // State qui gère le fait qu'on est en train de payer
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setIsLoading(true);

      if (elements == null) {
        return;
      }

      // Vérification et validation des infos entrées dans les inputs
      const { error: submitError } = await elements.submit();
      if (submitError) {
        // Affiche l'erreur en question
        setError(error.message);
        return;
      }

      // Demande au backend de créer l'intention de paiement, il nous renvoie le clientSecret
      const response = await axios.post(
        `https://site--vinted-backend--47xhmxvzybsz.code.run/payment`,
        {
          amount: totalPrice,
          title: productName,
        }
      );

      const clientSecret = response.data.client_secret;

      // Requête à Stripe pour valider le paiement
      const stripeResponse = await stripe.confirmPayment({
        // elements contient les infos et la configuration du paiement
        elements,
        clientSecret,
        // Éventuelle redirection
        confirmParams: {
          return_url: "http://localhost:5173/",
        },
        // Bloque la redirections
        redirect: "if_required",
      });

      // Si une erreur a lieu pendant la confirmation
      if (stripeResponse.error) {
        // On la montre au client
        setError(stripeResponse.error.message);
      }

      // Si on reçois un status succeeded on fais passer completed à true
      if (stripeResponse.paymentIntent.status === "succeeded") {
        setCompleted(true);
      }
      // On a fini de charger
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  return completed ? (
    <p>Merci pour votre achat</p>
  ) : (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button type="submit" disabled={!stripe || !elements || isLoading}>
        Pay
      </button>
      {/* Éventuel message d'erreur */}
      {error && <div>{error}</div>}
    </form>
  );
};

export default CheckoutForm;
