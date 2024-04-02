import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const Login = ({ handleToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setErrorMessage("");
      const response = await axios.post(
        `https://site--vinted-backend--47xhmxvzybsz.code.run/user/login`,
        // "https://lereacteur-vinted-api.herokuapp.com/user/login",
        {
          email,
          password,
        }
      );
      handleToken(response.data.token);
      navigate("/");
      //   console.log(response.data);
    } catch (error) {
      if (error.response.status === 401 || error.response.status === 400) {
        setErrorMessage("Wrong email and/or password");
      }
      //   console.log(error.response);
    }
  };

  return (
    <>
      <div className="signup-container">
        <h2>Se Connecter</h2>
        <form className="signup-form" onSubmit={handleSubmit}>
          <input
            className="email"
            type="email"
            placeholder="Adresse email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            className="password"
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <div>
            <input
              className="submit-connect"
              value="Se Connecter"
              type="submit"
            />
            {errorMessage && (
              <p className="email-used" style={{ color: "red" }}>
                {errorMessage}
              </p>
            )}
          </div>
          <Link className="link" to="/signup">
            Pas encore de compte ? Inscris-toi !
          </Link>
        </form>
      </div>
    </>
  );
};

export default Login;
