import { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card.jsx";
import Slider from "react-slick";
import settings from "./Carousel.jsx";
import * as styles from './relatedOutfit.module.css';

export default function Outfit({ productId }) {
  const [outfit, setOutfit] = useState([]);
  const [newItem, setNewItem] = useState(null);

  useEffect(() => {
    axios.get('/cart')
      .then(res => setOutfit(res.data))
      .catch(err => console.error('error loading outfit:', err));
  }, [newItem])

  async function postToCart(id) {
    axios.post('/cart', {
      params: { sku_id: id }
    })
      .then(res => setNewItem(id))
      .catch(err => console.error('error posting to cart'));
  }

  return (
    <div className={styles.relatedOutfit}>
      <Slider {...settings}>
        <AddToOutfit onClick={postToCart} productId={productId} />
        {outfit.map((id, index) => (
          <Card key={index} productId={id} />
        ))}
      </Slider>
    </div>
  );
};

function AddToOutfit({ onClick, productId }) {
  return (<>
    <div className={`${styles.productCard} ${styles.addOutfit}`} onClick={() => postToCart(productId)}>
      <p>+</p>
      <p>Add to Outfit</p>
    </div>
  </>
  );
};