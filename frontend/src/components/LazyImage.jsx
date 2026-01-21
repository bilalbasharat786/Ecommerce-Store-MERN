import React from "react";

const LazyImage = ({ src, alt = "", w = 80, h = 80, className = "", onClick = () => {} }) => {
  return (
    <img
      src={src}
      alt={alt}
      width={w}
      height={h}
      loading="lazy"
      className={className}
      style={{ objectFit: "cover" }}
    />
  );
};

export default LazyImage;
