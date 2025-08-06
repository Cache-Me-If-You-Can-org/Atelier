function Arrow(props) {
  const { className, style, onClick } = props;
  console.log('class name', className);
  var classes = className + ' carousel-arrow';
  return (
    <div
      className={classes}
      onClick={onClick}
      style={{...style}}
    />
  );
}

export default {
  infinite: false,
  speed: 700,
  slidesToShow: 3,
  slidesToScroll: 1,
  variableWidth: false,
  nextArrow: <Arrow />,
  prevArrow: <Arrow />
};