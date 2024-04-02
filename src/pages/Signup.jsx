import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Signup = ({ handleToken }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(email, password, username, newsletter);
    try {
      setErrorMessage("");
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}user/signup`,
        // "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        {
          username,
          email,
          password,
          newsletter,
        }
      );
      handleToken(response.data.token);
      navigate("/");

      console.log(response.data);
    } catch (error) {
      if (error.response.data.message === "Missing parameters") {
        setErrorMessage("Please fill in all fields");
      } else if (error.response.status === 409) {
        setErrorMessage(
          "This email already has an account, please use another one 🙂 "
        );
      }
    }
  };

  return (
    <>
      <div className="signup-container">
        <h2>S'inscrire</h2>
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="signup-choice">
            <input
              className="username"
              type="text"
              placeholder="Nom d'utilisateur"
              onChange={(event) => setUsername(event.target.value)}
            />
            <input
              className="email"
              type="text"
              placeholder="Email"
              onChange={(event) => setEmail(event.target.value)}
            />
            <input
              className="password"
              type="password"
              placeholder="Mot de passe"
              onChange={(event) => setPassword(event.target.value)}
            />

            <div className="checkbox-container">
              <div>
                <input type="checkbox" id="checkbox" />
                <span>S'inscrire à notre newsletter</span>
              </div>
              <p>
                En m'inscrivant je confirme avoir lu et accepté les Termes &
                Conditions et Politique de Confidentialité de Vinted. Je
                confirme avoir au moins 18 ans.
              </p>
            </div>
            <input className="submit" value="S'inscrire" type="submit" />
            {errorMessage && (
              <p className="email-used" style={{ color: "red" }}>
                {errorMessage}
              </p>
            )}
            <Link className="link" to="/login">
              Tu as déjà un compte ? Connecte-toi !
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
