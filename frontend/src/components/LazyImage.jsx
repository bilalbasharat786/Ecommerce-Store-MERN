import React from "react";

const LazyImage = ({
  src,
  alt = "",
  w = 80,
  h = 80,
  className = "",
  priority = false, // 🔥 NEW
  onClick = () => {},
}) => {
  return (
    <img
      src={src}
      alt={alt}
      width={w}
      height={h}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchpriority={priority ? "high" : "low"}
      className={className}
      style={{
        objectFit: "cover",
        backgroundColor: "#f3f4f6", // skeleton effect
      }}
      onClick={onClick}
    />
  );
};

export default LazyImage;

