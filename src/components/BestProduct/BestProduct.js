import "./bestproduct.css";
import heartImg from "../../assets/images/ic_heart.png";
import { useEffect, useState } from "react";
import { getProducts } from "../../assets/services/api.mjs";

function getPageSize() {
  const width = window.innerWidth;

  if (width >= 1199) {
    return 4;
  } else if (width >= 743) {
    return 2;
  } else {
    return 1;
  }
}

function BestProduct() {
  const [data, setData] = useState([]);
  const [pageSize, setPageSize] = useState(getPageSize());

  useEffect(() => {
    function handleResize() {
      setPageSize(getPageSize());
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    async function fetchData() {
      const products = await getProducts({ pageSize, page: 1 });
      setData(products);
    }
    fetchData();
  }, [pageSize]);

  return (
    <div className="bestProductContainer">
      <div className="bestProduct">베스트 상품</div>
      <ul className="productLayout">
        {data.map(({ favoriteCount, id, description, images, price }) => {
          return (
            <li key={id} className="productContainer">
              <img src={images} alt={description} className="productImg" />
              <p className="itemDescription">{description}</p>
              <p className="itemPrice">
                {price.toLocaleString("en-US") + "원"}
              </p>
              <div className="favoriteBox">
                <img src={heartImg} alt={heartImg} className="heartImg" />
                <p className="itemFavoriteCount">{favoriteCount}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default BestProduct;
