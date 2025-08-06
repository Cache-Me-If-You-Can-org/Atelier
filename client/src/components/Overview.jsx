import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Overview() {
  const [product, setProduct] = useState(null);
  const id = ''
  useEffect(() => {
    // axios.get(`/product/${id}`)
    axios.get('/products')
         .then(payload => setProduct(payload.data[0]))
  }, [])
  return (
    <div>
      Overview
      {JSON.stringify(product)}
    </div>
  )
}

export default Overview;