import RelatedProducts from "./related_and_outfit/RelatedProducts.jsx";
import Outfit from "./related_and_outfit/Outfit.jsx";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000";

export default function RelatedAndOutfit({ productId, sectionId }) {
  return (
    <section id={sectionId} className="container">
      RELATED PRODUCTS
      <RelatedProducts productId={productId}/>
      YOUR OUTFIT
      <Outfit productId={productId}/>
    </section>
  );
}