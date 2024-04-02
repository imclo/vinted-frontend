import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

import Pages from "../components/Pages";

const Home = ({ fetchRange, search, sortPrice }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const limit = 10;
  const maxPages = Math.ceil(Number(data.count) / limit);

  const params = useParams();
  const id = params.id;
  //   console.log(params);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }offers?page=${page}&limit=${limit}&priceMin=${
            fetchRange[0]
          }&priceMax=${fetchRange[1]}&sort=${
            sortPrice ? "price-desc" : "price-asc"
          }&title=${search}`
          // `https://lereacteur-vinted-api.herokuapp.com/offers?page=${page}&limit=${limit}&title=${search}`
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [page, search, fetchRange, sortPrice]);

  const handleFirstPage = () => {
    setPage(1);
  };

  const handleLastPage = () => {
    setPage(maxPages);
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    setPage(page - 1);
  };

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <main>
      <div className="picture-background">
        <div className="hero-container">
          <div className="hero-ready">
            <p>Prêt à faire du tri dans vos placards ?</p>
            <Link to="/publish">
              <button>Commencer à vendre</button>
            </Link>
          </div>
        </div>
      </div>
      <div className="card-wrapper">
        <div className="card-container">
          {data.offers.map((offer) => {
            return (
              <section key={offer._id}>
                <Link
                  to={`/offer/${offer._id}`}
                  style={{ textDecoration: "none" }}
                >
                  <div className="card-avatar-username">
                    {offer.owner.account.avatar && (
                      <img
                        className="profile-pic"
                        src={offer.owner.account.avatar.secure_url}
                        alt="profile-pic"
                      />
                    )}
                    <p>{offer.owner.account.username}</p>
                  </div>

                  <div className="pic-offers">
                    <img src={offer.product_image.url} alt="pic-offer" />
                  </div>

                  <div className="text-offers">
                    <p className="price-offer">{offer.product_price} €</p>
                    <span>{offer.product_details[1].TAILLE}</span>
                    <span>{offer.product_details[0].MARQUE}</span>
                  </div>
                </Link>
              </section>
            );
          })}
        </div>
      </div>
      <Pages
        page={page}
        maxPages={maxPages}
        handleFirstPage={handleFirstPage}
        handleLastPage={handleLastPage}
        handleNextPage={handleNextPage}
        handlePrevPage={handlePrevPage}
      />
    </main>
  );
};

export default Home;
