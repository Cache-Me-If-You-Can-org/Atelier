import React, {useState, useEffect} from "react";
import axios from "axios";
import _ from "lodash";

import { Rating } from 'react-simple-star-rating'

export default function Ratings( { productId, metaData, totalReviews, rating, stars, ranges} ) {

  const [pctRecommend, setPctRecommend] = useState(0);
  const [maxStars, setMaxStars] = useState(20);
  const [filters, setFilters] = useState(new Set());

  useEffect(() => {
  }, [])

  useEffect(() => {
    if (!_.isEmpty(metaData)) {

      let tmp =  metaData.recommended;
      setPctRecommend((tmp.true*1 / (tmp.false*1 + tmp.true*1)) * 100 | 0);

      if (!_.isEmpty(stars)) {
        setMaxStars(stars.reduce((memo, star) => {
          if (metaData?.ratings[star] ) {
            memo += 1*metaData.ratings[star];
          }
          return memo;
        }, 0));
      }
    }
  }, [metaData,  filters])

  function handleOnClickRating(e) {
    alert(e.currentTarget);
  };

  function handleOnClickClearFilters(e) {
    setFilters(new Set());
  };

  function handleOnClickStar(e) {
    let tmp = new Set(filters);
    if (tmp.has(e.currentTarget.id)) {
      tmp.delete(e.currentTarget.id);
    } else {
      tmp.add(e.currentTarget.id)
    }
    setFilters(tmp);
    console.log(tmp);
  };

  return (
    <aside className="ratings">
         <div className="group">
        <div className="rating">{rating}</div>
        <div className="star-rating center">
          <Rating initialValue={rating}  readonly={true} allowFraction={true} allowHover={false}   disableFillHOver={true}/>
        </div>
      </div>
      <div className="stack ">
        <div className="center">
          <div>Rating Breakdown</div>
        </div>

        { filters.size > 0 ? (
          <div className="group center filters">
            <span>{[...filters].sort().join(', ')}
            </span>
            <span className="clear" onClick={(e)=> handleOnClickClearFilters(e)}>clear filters</span>
          </div>

          )
        :
          null
        }
        <div className="stars">

          { !_.isEmpty(metaData) ?
              stars.map((star) => {
                return ( <div key={star} className="group filter" id={`${star} Stars`} onClick={(e) => handleOnClickStar(e)}>
                  <label htmlFor={`${star}Star`} name={`${star}Star`} className="label" >{`${star} Stars`}</label>
                  <progress className="progress center" id={`${star}Star`} max={maxStars} value={ metaData.ratings[star] ? metaData.ratings[star] : 0  } />
                </div> )
              })
            :
              null
          }
       </div>
        <div>
          <p>{pctRecommend}% of reviews recommend this product</p>

        </div>

        <div className="range" >

          { !_.isEmpty(metaData) ?
              ranges.map((range) => {
                return metaData.characteristics[range.name] ?
                (

                  <div key={metaData.characteristics[range.name].id} className="space-vertical">
                    <div>{range.name}</div>
                    <input type="range" min="0" max="50" defaultValue={metaData.characteristics[range.name].value*10} className="slider" id={range.name}></input>
                    <div className="group bar legend">
                      <div>{range["1"]}</div>
                      <div>{range["5"]}</div>
                    </div>

                  </div> )
                :
                  null
              })
            :
              null
          }

        </div>
      </div>
    </aside>
  )
}