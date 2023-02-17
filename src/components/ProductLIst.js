import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../components/productlist.css";
const ProductLIst = () => {
  const [products, setProduct] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let token = JSON.parse(localStorage.getItem("user"));
    console.log(token.auth);
    let result = await fetch("http://localhost:5000/getproducts", {
      headers: {
        authorization: token.auth,
      },
    });
    result = await result.json();
    setProduct(result);
  };

  // for delete product we are making this function
  const deleteProduct = async (id) => {
    let token = JSON.parse(localStorage.getItem("user"));
    let result = await fetch(`http://localhost:5000/deleteproduct/${id}`, {
      method: "Delete",
      headers: {
        authorization: token.auth,
      },
    });
    result = await result.json();
    if (result) {
      alert("product deleted successfully");
      getProducts();
    }
  };

  const searchHandle = async (event) => {
    // console.log(event.target.value);
    let token = JSON.parse(localStorage.getItem("user"));
    let key = event.target.value;
    if (key) {
      let result = await fetch(`http://localhost:5000/searchproduct/${key}`, {
        method: "get",
        headers: {
          authorization: token.auth,
        },
      });
      result = await result.json();
      console.log(result);
      if (result) {
        setProduct(result);
      }
    } else {
      getProducts();
    }
  };

  return (
    <div className="product-list">
      <h3>ProductLIst</h3>
      <input
        type=""
        className="search-product-box"
        placeholder="search products"
        onChange={searchHandle}
      />
      <ul>
        <li>S. No.</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Operations</li>
      </ul>
      {products.length > 0 ? (
        products.map((item, index) => (
          <ul key={item._id}>
            <li>{index + 1}</li>
            <li>{item.name}</li>
            <li>{item.price}</li>
            <li>{item.category}</li>
            <li>
              <button onClick={() => deleteProduct(item._id)}>Delete</button>
              <Link to={"/update/" + item._id}>
                <button>Update</button>
              </Link>
            </li>
          </ul>
        ))
      ) : (
        <h1> No result found </h1>
      )}
    </div>
  );
};

export default ProductLIst;
