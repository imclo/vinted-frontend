import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Offer = ({ token }) => {
  const params = useParams();
  const id = params.id;
  const navigate = useNavigate();

  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}offer/${id}`
          // `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
        // console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.log(error);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [id]);

  const price = data.product_price;
  const protectionFees = (price / 10).toFixed(2);
  const shippingFees = (protectionFees * 1.5).toFixed(2);
  const total = Number(price) + Number(protectionFees) + Number(shippingFees);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div className="offer-body">
      <div className="offer-container">
        {/* {data.offers.map((image) => {
          return (
            <img
              key={image.asset_id}
              className="offer-pic"
              src={image.secure_url}
              alt="product-pic"
            />
          );
        })} */}
        <img
          className="offer-pic"
          src={data.product_image.secure_url}
          alt="product-pic"
        />
        <div className="offer-description">
          <div>
            <span className="offer-price">{data.product_price} €</span>
            <ul className="offer-list">
              {data.product_details.map((detail) => {
                // console.log(detail);
                const elem = Object.keys(detail);
                // console.log(elem);
                const elems = elem[0];

                return (
                  <>
                    <li>
                      <span className="elem-offer" key={elems}>
                        {elem}
                      </span>
                      <span className="elem-detail">{detail[elem]}</span>
                    </li>
                  </>
                );
              })}
            </ul>
          </div>
          <div className="divider"></div>
          <div className="offer-content">
            <p className="offer-title">{data.product_name}</p>
            <p className="offer-detail">{data.product_description}</p>{" "}
            <div className="offer-avatar-username">
              {data.owner.account.avatar && (
                <img src={data.owner.account.avatar.secure_url} alt="" />
              )}
              <span>{data.owner.account.username}</span>
            </div>
          </div>
          <button
            className="offer-sold"
            onClick={() => {
              token
                ? navigate("/payment", {
                    state: {
                      productName: data.product_name,
                      totalPrice: total,
                      protectionFees: protectionFees,
                      shippingFees: shippingFees,
                      price: data.product_price,
                    },
                  })
                : navigate("/login");
            }}
          >
            Acheter
          </button>
        </div>
      </div>
    </div>
  );
};

export default Offer;
