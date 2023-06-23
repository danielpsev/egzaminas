import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import style from "./Filters.module.css";
import axios from "../../axios";

const Filters = (props) => {
  const { setFilters } = props;
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);

  const handleFilterValChange = (e) => {
    setCategoryName(e.target.value);
  };

  useEffect(() => {
    handleFiltersChange();
  }, [categoryName]);


  const getCategories = async () => {
    try {
      const res = await axios.get("/procedures/categories");
      setCategories(res.data.data.categories);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const categories_render = categories.map((el) => {
    return (
      <option value={el} key={uuidv4()}>
        {el}
      </option>
    );
  });

  const handleFiltersChange = async (reset) => {
    const filters = !reset
      ? `category=${categoryName}`
      : "";
    setFilters(filters);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleFiltersChange();
  };
  return (
    <div className={style.FiltersContainer}>
      <form onSubmit={onSubmit}>
        <select
          className={style.FilterDropdown}
          onChange={handleFilterValChange}
          value={categoryName}
        >
          <option value="">Rūšiuoti pagal</option>
          {categories_render}
        </select>
      </form>
    </div>
  );
};

export default Filters;
