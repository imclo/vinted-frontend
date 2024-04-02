import { useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const Publish = ({ token }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState();
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState();
  const [exchange, setExchange] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("color", color);
      formData.append("condition", condition);
      formData.append("city", city);
      formData.append("price", price);
      formData.append("picture", picture);
      const response = await axios.post(
        // "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        `${import.meta.env.VITE_API_URL}offer/publish`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return token ? (
    <>
      <div className="publish-main">
        <div className="publish-container">
          <h2>Vends ton article</h2>
          <form onSubmit={handleSubmit}>
            <div className="file-selection">
              <div className="preview-file">
                <div className="input-file">
                  <label htmlFor="file" className="label-file">
                    <span className="input-sign">+</span>
                    <span>Ajoute une photo</span>
                  </label>
                  <input
                    style={{ display: "none" }}
                    id="file"
                    type="file"
                    className="input"
                    onChange={(event) => {
                      setPicture(event.target.files[0]);
                    }}
                  />
                </div>
              </div>
              {picture && (
                <img
                  style={{ height: "100px" }}
                  src={URL.createObjectURL(picture)}
                  alt="produit"
                />
              )}
            </div>
            <div className="text-section">
              <div className="text-input">
                <label htmlFor="title">Titre</label>
                <input
                  id="title"
                  type="text"
                  name="title"
                  placeholder="ex: Chemise Sézane verte"
                  value={title}
                  onChange={(event) => {
                    setTitle(event.target.value);
                  }}
                />
              </div>
              <div className="text-input">
                <label htmlFor="description">Décris ton article</label>
                <textarea
                  id="description"
                  name="description"
                  cols="30"
                  rows="10"
                  placeholder="ex: porté quelques fois, taille correctement"
                  value={description}
                  onChange={(event) => {
                    setDescription(event.target.value);
                  }}
                ></textarea>
              </div>
            </div>
            <div className="text-section">
              <div className="text-input">
                <label htmlFor="brand">Marque</label>
                <input
                  id="brand"
                  type="text"
                  name="brand"
                  placeholder="ex: Zara"
                  value={brand}
                  onChange={(event) => {
                    setBrand(event.target.value);
                  }}
                />
              </div>
              <div className="text-input">
                <label htmlFor="size">Taille</label>
                <input
                  id="size"
                  type="text"
                  name="size"
                  placeholder="ex: L / 40 / 12"
                  value={size}
                  onChange={(event) => {
                    setSize(event.target.value);
                  }}
                />
              </div>
              <div className="text-input">
                <label htmlFor="color">Couleur</label>
                <input
                  id="color"
                  type="text"
                  name="color"
                  placeholder="ex: Fuschia"
                  value={color}
                  onChange={(event) => {
                    setColor(event.target.value);
                  }}
                />
              </div>
              <div className="text-input">
                <label htmlFor="condition">Etat</label>
                <input
                  id="condition"
                  type="text"
                  name="condition"
                  placeholder="Neuf avec étiquette"
                  value={condition}
                  onChange={(event) => {
                    setCondition(event.target.value);
                  }}
                />
              </div>
              <div className="text-input">
                <label htmlFor="city">Lieu</label>
                <input
                  id="city"
                  type="text"
                  name="city"
                  placeholder="ex: Paris"
                  value={city}
                  onChange={(event) => {
                    setCity(event.target.value);
                  }}
                />
              </div>
            </div>
            <div className="text-section">
              <div className="text-input">
                <label htmlFor="price">Prix</label>
                <div className="checkbox-section">
                  <input
                    id="price"
                    type="text"
                    name="price"
                    placeholder="0,00 €"
                    value={price}
                    onChange={(event) => {
                      setPrice(event.target.value);
                    }}
                  />
                  <div className="checkbox-input">
                    <input
                      className="checkbox-design"
                      type="checkbox"
                      name="exchange"
                      value={exchange}
                      onChange={() => setExchange(!exchange)}
                    />
                    <span>Je suis intéressé(e) par les échanges</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="form-button">
              <button type="submit" className="form-validation">
                Ajouter
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default Publish;
