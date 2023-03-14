import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import React from "react";

const SkeletonLoader = () => {
  return (
    <div style={{ height: "200px" }}>
      <Skeleton count={30} />
    </div>
  );
};

export default SkeletonLoader;
