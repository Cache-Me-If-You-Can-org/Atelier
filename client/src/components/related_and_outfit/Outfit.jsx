import React, { useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import Card from './Card';
import settings from './Carousel';
import * as styles from './relatedOutfit.module.css';

function addToOutfit(setNewItem, id) {

}

function AddToOutfit({ setNewItem, productId }) {
  return (
    <div className={`${styles.productCard} ${styles.addOutfit}`}>
      <span
        onClick={() => {}}
        onKeyPress={() => addToOutfit(setNewItem, productId)}
        role='button'
        tabIndex='0'
      >
        <p>+</p>
        <p>Add to Outfit</p>
      </span>
    </div>
  );
}

export default function Outfit({ productId }) {
  const [outfit, setOutfit] = useState([]);
  const [newItem, setNewItem] = useState(null);

  return (
    <div className={styles.relatedOutfit}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Slider {...settings}>
        <AddToOutfit setNewItem={setNewItem} productId={productId} />
        {outfit.map((id) => (
          <Card key={id} productId={id} originalProductId={productId} />
        ))}
      </Slider>
    </div>
  );
}
