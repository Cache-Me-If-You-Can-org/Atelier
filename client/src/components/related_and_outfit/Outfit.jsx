import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import Card from './Card';
import settings from './Carousel';
import * as styles from './relatedOutfit.module.css';

function AddOutfitButton({ addNewItem, productId }) {
  return (
    <div className={`${styles.productCard} ${styles.addOutfit}`}>
      <span
        onClick={() => {
          addNewItem(productId);
        }}
        onKeyPress={() => {}}
        role='button'
        tabIndex='0'
      >
        <p>+</p>
        <p>Add to Outfit</p>
      </span>
    </div>
  );
}

function useOutfit() {
  const [outfit, setOutfit] = useState(() => {
    const saved = sessionStorage.getItem('outfit');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    sessionStorage.setItem('outfit', JSON.stringify(outfit));
  }, [outfit]);

  const addItem = (productId) => {
    setOutfit((prev) => {
      const exists = prev.find((item) => item.productId === productId);
      if (exists) {
        return prev;
      }
      return [...prev, productId];
    });
  };

  const removeItem = (productId) => {
    setOutfit((prev) => prev.filter((item) => item.productId !== productId));
  };

  return {
    outfit,
    addItem,
    removeItem,
  };
}

export default function Outfit({ productId }) {
  const {
    outfit,
    addItem,
    removeItem,
  } = useOutfit();

  return (
    <div className={styles.relatedOutfit}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Slider {...settings}>
        <AddOutfitButton addNewItem={addItem} productId={productId} />
        {outfit.map((id) => (
          <Card key={`key-${id}`} productId={id} originalProductId={productId} remove={removeItem} />
        ))}
      </Slider>
    </div>
  );
}
