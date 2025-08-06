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

  useEffect(() => {
    //either using axios or props, get the outfit data
  }, []);

  // if (!outfit.length) {
  //   return (
  //     <div className="outfit .group">
  //       Loading elements...
  //     </div>
  //   )
  // }

  return (
    <div className="related" style={{ position: 'relative', overflow: 'visible'}}>
      <Slider {...settings}>
        <AddToOutfit />
        {outfit.map((id, index) => {
          <Card product_id={id} />
        })}
      </Slider>
    </div>
  );
};

function AddToOutfit() {
  return (<>
    <div>
      <button>
        <p>+</p>
        <p>Add to Outfit</p>
      </button>
    </div>
  </>)
}