import { useState, useEffect } from "react";
import "../components/signup.css";
import "../components/addproduct.css";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    let token = JSON.parse(localStorage.getItem("user"));
    let result = await fetch(
      `http://localhost:5000/getproductsupdate/${params.id}`,
      {
        method: "get",
      }
    );
    result = await result.json();
    console.log(result);
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.company);
  };

  let userId2 = localStorage.getItem("user");
  userId2 = JSON.parse(userId2);
  let userId = userId2.data._id;

  const handleSubmit = async () => {
    if (!name || !price || !company || !category || !userId) {
      setError(true);
      return false;
    }
    // if(name,price,company,category,userId)

    console.log(name, price, company, category, userId);
    let token = JSON.parse(localStorage.getItem("user"));
    let result = await fetch(
      `http://localhost:5000/updateproduct/${params.id}`,
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          authorization: token.auth,
        },
        body: JSON.stringify({ name, price, category, company }),
      }
    );
    console.log(result);
    result = await result.json();
    if (result) {
      navigate("/");
    }
  };
  return (
    <div className="register">
      <h1>Update Product</h1>
      <input
        type="text"
        placeholder="enter product name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>
      {error && !name && <span className="name"> Enter Valid name </span>}
      <input
        type="text"
        placeholder="enter Product price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      ></input>
      {error && !price && <span className="name"> Enter Valid setPrice </span>}
      <input
        type="text"
        placeholder="enter Product category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      ></input>
      {error && !category && (
        <span className="name"> Enter Valid Category </span>
      )}
      <input
        type="text"
        placeholder="enter Product comapney"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      ></input>
      {error && !company && <span className="name"> Enter Valid Company </span>}
      <button type="submit" className="appButton" onClick={handleSubmit}>
        Update Product
      </button>
    </div>
  );
};

export default UpdateProduct;
