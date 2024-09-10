import "./sellusedproduct.css";
import heartImg from "../../assets/images/ic_heart.png";
import { useEffect, useState } from "react";
import { getDatabase } from "../../assets/services/api.mjs";
import defaultImg from "../../assets/images/img_default.png";

function SellUsedProduct({
  currentPage,
  searchQuery,
  setTotalCount,
  pageSize,
}) {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await getDatabase({
        pageSize: pageSize,
        order: "recent",
        page: currentPage,
        searchQuery,
      });
      setData(response.products);
      const totalCount = response.totalCount;
      setTotalCount(totalCount);
    }
    fetchData();
  }, [currentPage, searchQuery, setTotalCount, pageSize]);

  return (
    <ul className="sellProductLayout">
      {data.map(({ favoriteCount, id, description, price, name }) => {
        return (
          <li key={id} className="sellProductContainer">
            <img
              src={defaultImg}
              alt={description}
              className="sellProductImg"
            />
            <p className="sellItemName">{name}</p>
            <p className="sellItemPrice">
              {price.toLocaleString("en-US") + "원"}
            </p>
            <div className="sellFavoriteBox">
              <img src={heartImg} alt="heart icon" className="heartImg" />
              <p className="sellItemFavoriteCount">{favoriteCount}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default SellUsedProduct;
