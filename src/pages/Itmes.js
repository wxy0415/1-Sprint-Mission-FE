import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "../assets/styles/style.css";
import SellUsedProduct from "../components/SellUsedProduct/SellUsedProduct";
import Pagination from "../components/Pagination/Pagination";
import { useState } from "react";
import Nav from "../components/Nav/Nav";

const Items = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [orderBy, setOrderBy] = useState("recent");
  const [totalCount, setTotalCount] = useState(0);
  const [pageSize] = useState(10);

  return (
    <>
      <Header />
      <Nav
        setSearchQuery={setSearchQuery}
        setCurrentPage={setCurrentPage}
        className="itemsNav"
      />
      <SellUsedProduct
        currentPage={currentPage}
        orderBy={orderBy}
        searchQuery={searchQuery}
        setTotalCount={setTotalCount}
        pageSize={pageSize}
      />
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalCount={totalCount}
        className="itemsPagination"
        pageSize={pageSize}
      />
      <Footer className="itemsFooter" />
    </>
  );
};

export default Items;
