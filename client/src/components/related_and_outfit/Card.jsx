import { useEffect, useState } from "react";
import axios from "axios";
import * as styles from './relatedOutfit.module.css';
import Modal from '../shared/Modal.jsx';

export default function Card({ productId, originalProductId }) {
  const [product, setProduct] = useState(null);
  const [originalProduct, setOriginalProduct] = useState(null);
  const [productImages, setProductImages] = useState(null);
  const [ratings, setRatings] = useState(null);

  useEffect(() => {
    // Fetch basic data (price, name, category)
    axios.get(`/products/${productId}`)
      .then(res => {
        setProduct(res.data);
        // Fetch review data for the time being
        return axios.get(`/products/${originalProductId}`)
      })
      .then(res => {
        setOriginalProduct(res.data);
        // Fetch review data for the time being
        return axios.get('/reviews/meta', {
          params: {product_id: productId}
        })
      })
      .then(res => {
        setRatings(res.data.ratings)
        // Fetch images for slide show and thumbnail
        return axios.get(`/products/${productId}/styles`)
      })
      .then(res => setProductImages(res.data.results[0].photos))
      .catch(err => {
        console.error('error loading product by id:', err)
      });
  }, [])

  if (!productImages) {
    return (
      <div className={styles.productCard}>
        <p>Loading...</p>
      </div>
    )
  }

  // Get the star unicode for the footer portion of the card
  var stars = Math.round(calculateStars(ratings));

  return (
    <div className={styles.productCard}>
      <ImageWithButton url={productImages[0].thumbnail_url ? productImages[0].thumbnail_url : 'https://blocks.astratic.com/img/general-img-landscape.png'} related={product} original={originalProduct} />
      <div className={styles.productCardInfo}>
        <small>{product.category.toUpperCase()}</small>
        <h4>{product.name}</h4>
        <small>${product.default_price}</small>
        <p>{stars} stars</p>
      </div>
    </div>
  )
}

function ImageWithButton({ url, related, original }) {
  const [hover, setHover] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="thumbnail-square" style={{height: 200}}>
      <img className="thumbnail-image" src={url} style={{objectPosition: 'center bottom'}}/>
      <button className={styles.overlayBtn}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => setIsOpen(true)}
      >
        {hover ? '★' : '☆'}
      </button>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} Module={() => ComparingTable({ related: related, original: original })}/>
    </div>
  );
};

function ComparingTable({ related, original }) {
  const rows = [];
  const features = [];
  const relatedFeatures = related.features;
  const originalFeatures = original.features;
  const relatedObj = [];
  const originalObj = [];

  function addRow(row, col1, col3) {
    row.col1 = col1;
    row.col3 = col3;
    rows.push(row);
  }

  console.log('NEW CALL features:')
  console.log('related', related.features);
  console.log('original', original.features);

  for (var i = 0; i < relatedFeatures.length + originalFeatures.length; i++) {
    if (!relatedFeatures[i] && !originalFeatures[i]) break;

    if (originalFeatures[i]) {
      if (!features.includes(originalFeatures[i].feature)) features.push(originalFeatures[i].feature);
      originalObj[originalFeatures[i].feature] = originalFeatures[i].value;
    }
    if (relatedFeatures[i]) {
      if (!features.includes(relatedFeatures[i].feature)) features.push(relatedFeatures[i].feature);
      relatedObj[relatedFeatures[i].feature] = relatedFeatures[i].value;
    }
  }
  console.log('original obj', originalObj);
  console.log('related obj', relatedObj);

  for (var i = 0; i < features.length; i++) {
    var row = {
      id: i,
      col2: features[i]
    };
    console.log('original feature', originalObj[features[i]], 'feature name: ', features[i]);
    console.log('related feature', relatedObj[features[i]], 'feature name: ', features[i]);
    if (originalObj[features[i]]) {
      if (relatedObj[features[i]]) {
        if (originalObj[features[i]] === relatedObj[features[i]]) {
          if (originalObj[features[i]] === true) {
            addRow(row, '✓', '✓');
          } else {
            addRow(row, originalObj[features[i]], relatedObj[features[i]]);
          }
          continue;
        }
        addRow(row,
          originalObj[features[i]] === true ? '✓' : originalObj[features[i]],
          relatedObj[features[i]] === false ? ' ' : relatedObj[features[i]]
        );
        continue;
      }
      addRow(row, originalObj[features[i]] === true ? '✓' : originalObj[features[i]], ' ');
      continue;
    } else {
      addRow(row, ' ', relatedObj[features[i]] === true ? '✓' : relatedObj[features[i]]);
    }
  }

  console.log('rows', rows);
  return(
    <>
      <small>COMPARING</small>
      <table role="table">
        <thead>
          <tr>
            <th>{}</th>
            <th></th>
            <th>{}</th>
          </tr>
        </thead>

        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={3} style={{ textAlign: "center", padding: 12 }}>
                No rows
              </td>
            </tr>
          ) : (
            rows.map((r) => (
              <tr key={r.id ?? `${r.col1}-${r.col2}-${r.col3}`}>
                <td>{r.col1}</td>
                <td>{r.col2}</td>
                <td>{r.col3}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  )
}

function calculateStars(ratings) {
  // Puts the string amounts of each rating
  // in a single place
  var allRatings = [
    ratings['1'],
    ratings['2'],
    ratings['3'],
    ratings['4'],
    ratings['5']
  ]

  // Calculates the average using (total * value) / total
  var total = 0;
  var valueTotal = 0;
  for (var i = 0; i < allRatings.length; i++) {
    total += Number(allRatings[i]) * 1;
    valueTotal += Number(allRatings[i]) * (i + 1);
  }

  return valueTotal / total;
}