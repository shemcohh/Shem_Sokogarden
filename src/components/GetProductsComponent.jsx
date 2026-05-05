import { use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavbarComponent from "./NavbarComponent";
{/* <NavbarComponent cartCount={cart} /> */}

const GetProductsComponent = () => {
  let [products, setProducts] = useState([]);
  let [loading, setLoading] = useState("");
  let [error, setError] = useState("");

  let navigator = useNavigate();

  // base url for image location
  const img_url = "https://shemriley.alwaysdata.net/static/images/";

  // function to fetch products from the server
  const getProducts = async () => {
    setError("");
    setLoading("Fetching Products please wait.....");

    try {
      const response = await axios.get(
        "https://shemriley.alwaysdata.net/api/get_products",
      );
      console.log(response);
      if (response.status === 200) {
        setLoading("");
        setProducts(response.data);
      }
    } catch (error) {
      setLoading("");
      setError(error.message);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div className="row"  style={{
      background: "var(--bg)",
      color: "var(--text)",
      minHeight: "100vh"
    }}>
      <NavbarComponent />
      <h3>Available products</h3>
      <h5 className="text-warning">{loading}</h5>
      <h5 className="text-danger">{error}</h5>

      {/* map/loop over the products array to access one at a */}

      {products.map((product) => (
        <div className="col-md-3 justify-content-center mb-4">
          <div className="card shadow card-margin">
            <img
              src={img_url + product.product_image}
              alt=""
              className="product_img mt-4"
            />

            <div className="card-body">
              <h5 className="mt-2">{product.product_name}</h5>
              <p className="text-muted">{product.product_description}</p>
              <b className="text-warning">{product.product_cost}</b>
              <br />
              <button className="btn btn-dark" onClick={()=>{
                navigator("/makepayment", {state: { product } })
              }}
              >purchase now</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GetProductsComponent;
