import React from "react";
import * as styles from "./starRating.module.css";
import { Star, StarHalf } from "@phosphor-icons/react";

function StarRating({ starRating, starSize }) {

  const imgSize = starSize || 32;

  let fullStars = Math.floor(starRating);

  const decimal = starRating - fullStars;

  let partialStar = 0;

  if (decimal >= 0.25 && decimal < 0.5) partialStar = 25;
  else if (decimal >= 0.5 && decimal < 0.75) partialStar = 50;
  else if (decimal >= 0.75) partialStar = 75;

  const starArray = new Array(fullStars).fill(100);

  if (partialStar > 0) starArray.push(partialStar);

  while (starArray.length < 5) {
    starArray.push(0);
  }

  return (
    <div className={styles.starRating}>
      {starArray.map((el, i) => {
        if (el === 100) {
          return (
            <span key={i}>
              <img width={imgSize} src="./assets/star-full.svg" />
            </span>
          );
        } else if (el === 75) {
          return (
            <span key={i}>
              <img width={imgSize} src="./assets/star-three-quarter.svg" />
            </span>
          );
        } else if (el === 50) {
          return (
            <span key={i}>
              <img width={imgSize} src="./assets/star-half.svg" />
            </span>
          );
        } else if (el === 25) {
          return (
            <span key={i}>
              <img width={imgSize} src="./assets/star-quarter.svg" />
              1/4: {el}
            </span>
          );
        } else {
          return (
            <span key={i}>
              <img width={imgSize} src="./assets/star-empty.svg" />
            </span>
          );
        }
      })}
    </div>
  );
}

export default StarRating;
