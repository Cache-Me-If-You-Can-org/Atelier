import { useEffect, useState } from "react";
import axios from "axios"
axios.defaults.baseURL = 'http://localhost:3000';

export default function Card({ product_id }) {
  const [product, setProduct] = useState({});

  useEffect(() => {
    axios.get(`/products/${product_id}`)
      .then(res => {
        setProduct(res.data);
      })
      .catch(err => {
        console.error('error loading product by id:', err)
      })
  }, [])

  if (!product.name) {
    return (
      <div className="product-card" style={{ minHeight: 150 }}>
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="product-card" style={{ minHeight: 150 }}>
      <p>{product.category}</p>
      <h4>{product.name}</h4>
      <small>${product.default_price}</small>
      <p>stars</p>
    </div>
  )
}