// Custom arrow for the carousel
function Arrow(props) {
  const { className, style, onClick } = props;
  var classes = className + ' carousel-arrow';
  return (
    <div
      className={classes}
      onClick={onClick}
      style={{...style}}
    />
  );
}

// Settings for the carousel
export default {
  infinite: false,
  speed: 700,
  slidesToShow: 4,
  slidesToScroll: 1,
  nextArrow: <Arrow />,
  prevArrow: <Arrow />
};