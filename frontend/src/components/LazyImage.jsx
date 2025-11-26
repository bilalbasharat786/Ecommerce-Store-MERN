~~~{"id":"94201","variant":"standard","subject":""}
import React from "react";

const LazyImage = ({
  src,
  alt = "",
  w = 80,
  h = 80,
  className = "",
  lazy = true,
  onClick = () => {}
}) => {
  return (
    <img
      src={src}
      alt={alt}
      width={w}
      height={h}
      loading={lazy ? "lazy" : "eager"}
      className={className}
      style={{
        objectFit: "cover",
        width: `${w}px`,
        height: `${h}px`,
        aspectRatio: `${w} / ${h}` // Reserve layout space
      }}
    />
  );
};

export default LazyImage;

