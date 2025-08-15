import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Gallery from './components/Gallery';
import Footer from './components/Footer';
import Info from './components/Info';
import * as g from '../global.module.css';

function Overview({ product, ratings }) {
  // const [product, setProduct] = useState(null);
  const [styles, setStyles] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    axios.get(`/products/${product.id}/styles`)
      .then((res) => { setStyles(res.data.results); return res.data.results; })
      // .then((res) => console.log('styles: ', res))
      .catch((err) => console.error('failed to get styles by id', err));
  }, [product.id]);

  if (styles === null || product === null) {
    return (<div>loading...</div>);
  }

  return (
    <section id='overview'>
      <div className={[g.stack, g.fullWidth, g.gapLg].join(' ')}>
        <div className={[g.containerLg, g.fullWidth].join(' ')}>
          <div className={[g.group, g.fullWidth].join(' ')}>
            <Gallery
              product={product}
              styles={styles}
              selectedStyle={selectedStyle}
              setIsFullScreen={setIsFullScreen}
              isFullScreen={isFullScreen}
            />
            <Info
              product={product}
              styles={styles}
              selectedStyle={selectedStyle}
              isFullScreen={isFullScreen}
              setSelectedStyle={setSelectedStyle}
              ratings={ratings}
            />
          </div>
        </div>
        <div className={g.containerMd}>
          <Footer product={product} />
        </div>
      </div>
    </section>
  );
}

export default Overview;
