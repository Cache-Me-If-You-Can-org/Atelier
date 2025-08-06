function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      onClick={onClick}
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        right: "-30px",
        zIndex: 1,
        width: "25px",
        height: "100%",
        background: "black",
        fontSize: "24px",
        color: "black",
      }}
    />
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      onClick={onClick}

      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        left: "-30px",
        zIndex: 1,
        width: "25px",
        height: "100%",
        background: "black",
        fontSize: "24px",
        color: "black",
      }}
    />
  );
}

export default {
  infinite: false,
  speed: 700,
  slidesToShow: 3,
  slidesToScroll: 1,
  variableWidth: false,
  adaptiveHeight: true,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />
};