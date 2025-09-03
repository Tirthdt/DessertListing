import { useEffect, useState } from "react";
import { data } from "../data";
import Card from "./Card";
import Cart from "./Cart";

const DessertListing = () => {
  const [isMobile, setIsMobile] = useState(() => {
    return window.innerWidth < 500;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 500);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  console.log(isMobile);

  return (
    <div className="flex">
      <div className="desserts-listing">
        <h1 style={{ color: "var(--rose-900)", marginBottom: "20px" }}>
          Desserts
        </h1>
        <div className="product-container">
          {data.map((d) => {
            return (
              <Card
                key={d.name}
                image={d.image[isMobile ? "mobile" : "desktop"]}
                name={d.name}
                category={d.category}
                price={d.price}
              />
            );
          })}
        </div>
      </div>
      <Cart />
    </div>
  );
};

export default DessertListing;
