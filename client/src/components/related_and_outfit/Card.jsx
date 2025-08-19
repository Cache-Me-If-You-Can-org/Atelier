import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as styles from './relatedOutfit.module.css';
import ComparisonTable from './ComparisonTable';
import Modal from '../shared/Modal';
import QuarterStarRating from '../shared/QuarterStarRating';

function ImageWithButton({
  url,
  related,
  original,
  remove,
}) {
  const [hover, setHover] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className='thumbnail-square'
      style={{ height: 200 }}
      onClick={(e) => e.stopPropagation()}
      onKeyPress={() => {}}
      tabIndex='0'
      role='button'
    >
      <img className='thumbnail-image' src={url} alt={original.name} style={{ objectPosition: 'center bottom' }} />
      {remove ? (
        <button
          type='button'
          className={styles.overlayBtn}
          onClick={(e) => {
            e.stopPropagation();
            remove((prev) => prev.filter((item) => item !== related.id));
          }}
        >
          &times;
        </button>
      )
        : (
          <>
            <button
              type='button'
              className={styles.overlayBtn}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(true);
              }}
            >
              {hover ? '★' : '☆'}
            </button>
            <Modal
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              Module={<ComparisonTable related={related} original={original} />}
              style={{ width: '40%' }}
            />
          </>
        )}
    </div>
  );
}

function calculateStars(ratings) {
  // Puts the string amounts of each rating
  // in a single place
  const allRatings = [
    ratings['1'],
    ratings['2'],
    ratings['3'],
    ratings['4'],
    ratings['5'],
  ];
  let total = 0;
  let valueTotal = 0;

  // Calculates the average using (total * value) / total
  for (let i = 0; i < allRatings.length; i += 1) {
    total += Number(allRatings[i]) * 1;
    valueTotal += Number(allRatings[i]) * (i + 1);
  }

  return valueTotal / total;
}

// remove is used to see if the card is an outfit card
// (if remove is a valid function then it's an outfit card)
export default function Card({
  productId,
  originalProductId,
  setSelectedProductId,
  remove,
}) {
  const [product, setProduct] = useState(null);
  const [originalProduct, setOriginalProduct] = useState(null);
  const [salePrice, setSalePrice] = useState(null);
  const [images, setImages] = useState(null);
  const [ratings, setRatings] = useState(null);

  useEffect(() => {
    setImages(null);
    // Fetch basic data (price, name, category)
    axios.get(`/products/${productId}`)
      .then((res) => {
        setProduct(res.data);
        // Fetch review data for the time being
        return axios.get(`/products/${originalProductId}`);
      })
      .then((res) => {
        setOriginalProduct(res.data);
        // Fetch review data for the time being
        return axios.get('/reviews/meta', {
          params: { product_id: productId },
        });
      })
      .then((res) => {
        setRatings(res.data.ratings);
        // Fetch images for slide show and thumbnail
        return axios.get(`/products/${productId}/styles`);
      })
      .then((res) => {
        setSalePrice(res.data.results[0].sale_price);
        setImages(res.data.results[0].photos);
      })
      .catch((err) => {
        console.error('error loading product by id:', err);
      });
  }, [originalProductId, productId]);

  if (!images) {
    return (
      <div className={styles.productCard}>
        <div className='thumbnail-square' style={{ height: 200 }}>
          <img className='thumbnail-image' src='https://blocks.astratic.com/img/general-img-landscape.png' alt='loading...' style={{ objectPosition: 'center bottom' }} />
        </div>
        <div className={styles.productCardInfo}>
          <small>LOADING...</small>
        </div>
      </div>
    );
  }

  // Get the star unicode for the footer portion of the card
  const number = calculateStars(ratings);

  return (
    <div
      className={styles.productCard}
      onClick={() => setSelectedProductId(productId)}
      onKeyPress={() => {}}
      role='button'
      tabIndex='0'
    >
      <ImageWithButton url={images[0].thumbnail_url ? images[0].thumbnail_url : 'https://blocks.astratic.com/img/general-img-landscape.png'} related={product} original={originalProduct} remove={remove} />
      <div className={styles.productCardInfo}>
        <small>{product.category.toUpperCase()}</small>
        <h4>{product.name}</h4>
        <div>
          {salePrice ? (
            <>
              <small style={{ textDecoration: 'line-through' }}>
                $
                {product.default_price}
              </small>
              <small style={{ color: 'red' }}>
                $
                {salePrice}
              </small>
            </>
          )
            : (
              <small>
                $
                {product.default_price}
              </small>
            )}
        </div>
        <div className={styles.cardStars}>
          <QuarterStarRating rating={number} />
        </div>
      </div>
    </div>
  );
}
