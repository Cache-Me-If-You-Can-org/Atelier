import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import Cookies from 'js-cookie';
import Card from './Card';
import settings from './Carousel';
import * as styles from './relatedOutfit.module.css';

function AddOutfitButton({ addNewItem, productId }) {
  return (
    <div className={`${styles.productCard} ${styles.addOutfit}`}>
      <span
        className={styles.addOutfitText}
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

export default function Outfit({ productId, setSelectedProductId }) {
  const [outfit, setOutfit] = useState(() => {
    const saved = Cookies.get('outfit');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    Cookies.set('outfit', JSON.stringify(outfit), { expires: 7, path: '/' });
  }, [outfit]);

  const addItem = (id) => {
    setOutfit((prev) => {
      const exists = prev.find((currentId) => currentId === id);
      if (exists) {
        return prev;
      }
      return [...prev, id];
    });
  };

  return (
    <div className={styles.relatedOutfit}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Slider {...settings}>
        <AddOutfitButton addNewItem={addItem} productId={productId} />
        {outfit.map((id) => (
          <Card
            key={`key-${id}`}
            productId={id}
            originalProductId={productId}
            remove={setOutfit}
            setSelectedProductId={setSelectedProductId}
          />
        ))}
      </Slider>
    </div>
  );
}
