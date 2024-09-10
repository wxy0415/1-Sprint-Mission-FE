import "./sellproduct.css";
import heartImg from "../../assets/images/ic_heart.png";
import { useEffect, useState } from "react";
import { getProducts, getTotalCount } from "../../assets/services/api.mjs";

function getPageSize() {
  const width = window.innerWidth;

  if (width >= 1199) {
    return 10;
  } else if (width >= 743) {
    return 6;
  } else {
    return 4;
  }
}

function SellProduct({ currentPage, orderBy, searchQuery, setTotalCount }) {
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
      const products = await getProducts({
        pageSize,
        page: currentPage,
        orderBy,
        searchQuery,
      });
      setData(products);
      const count = await getTotalCount(searchQuery);
      setTotalCount(count);
    }
    fetchData();
  }, [currentPage, orderBy, searchQuery, setTotalCount, pageSize]);

  return (
    <ul className="sellProductLayout">
      {data.map(({ favoriteCount, id, description, images, price, name }) => {
        return (
          <li key={id} className="sellProductContainer">
            <img src={images} alt={description} className="sellProductImg" />
            <p className="sellItemName">{name}</p>
            <p className="sellItemPrice">
              {price.toLocaleString("en-US") + "원"}
            </p>
            <div className="sellFavoriteBox">
              <img src={heartImg} alt={heartImg} className="heartImg" />
              <p className="sellItemFavoriteCount">{favoriteCount}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default SellProduct;
