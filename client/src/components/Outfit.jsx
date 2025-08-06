import { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card.jsx";
import Slider from "react-slick";
import settings from "./Carousel.jsx";
//import 'slick-carousel/slick/slick.css';
//import 'slick-carousel/slick/slick-theme.css';

export default function Outfit() {

  var outfit = [
    40349,
    40349,
    40351,
    40352,
    40344,
    40346
  ];

  return (
    <div className="related">
      <Slider {...settings}>
        <AddToOutfit />
        {outfit.map((id, index) => (
          <Card key={index} product_id={id} />
        ))}
      </Slider>
    </div>
  );
};

function AddToOutfit() {
  return (<>
    <div className="product-card add-outfit" style={{ minHeight: 150 }}>
      <p>+</p>
      <p>Add to Outfit</p>
    </div>
  </>)
}