import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Ratings from './Ratings';
import ReviewList from './ReviewList';
import * as lcl from './ratingsAndReviews.module.css';
import * as gbl from '../global.module.css';

export default function RatingsAndReviews({
  sectionId, productName, meta,
}) {
  const [newReview, setNewReview] = useState(false);
  const [filters, setFilters] = useState(new Set());
  const stars = ['5', '4', '3', '2', '1'];

  const cDef = {
    Size: ['A size too small', '1/2 size too small', 'Perfect', '1/2 size too big', 'A size too big'],
    Width: ['Too narrow', 'Slightly narrow', 'Perfect', 'Slightly wide', 'Too wide'],
    Fit: ['Runs tight', 'Runs slightly tight', 'Perfect', 'Runs slightly loose', 'Runs loose'],
    Length: ['Runs short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long'],
    Comfort: ['Uncomfortable', 'Slightly uncomfortable', 'Ok', 'comfortable', 'Perfect'],
    Quality: ['Poor', 'Below Average', 'What I expected', 'Pretty great', 'Perfect'],
  };

  const [errMsg, setErrMsg] = useState(null);

  return (
    <section id={sectionId}>

      <title>Ratings & Reviews</title>
      <div className={lcl.RRcontainer}>
        <h3>RATINGS & REVIEWS</h3>

        {errMsg && <div>{errMsg}</div>}

        <div className={gbl.group}>
          <Ratings
            meta={meta}
            filters={filters}
            setFilters={setFilters}
            cDef={cDef}
            stars={stars}
          />
          <ReviewList
            meta={meta}
            productName={productName}
            setNewReview={setNewReview}
            cDef={cDef}
            filters={filters}
          />
        </div>
      </div>
    </section>
  );
}
