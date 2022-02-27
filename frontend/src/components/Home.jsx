import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, getListTemperaments } from "../actions/index";
import { Link } from "react-router-dom";
import Card from "./Card";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import NavFilter from "./NavFilter";
import Loading from "./Loading";

import styles from "./styles/Home.module.css";


export default function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);

//----------------------------------------------------------------- PAGINADO ---------------------------------------------------------------
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage] = useState(8);
  const numberOfLastDog = currentPage * dogsPerPage;
  const numberOfFirstDog = numberOfLastDog - dogsPerPage;
  const currentDogs = allDogs.slice(numberOfFirstDog, numberOfLastDog); 

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const pagOne = () => setCurrentPage(1);
 
  useEffect(() => {
    dispatch(getDogs());
    dispatch(getListTemperaments());
  }, [dispatch]);
//-----------------------------------------------------------------------------------------------------------------------------------------
  return (
    <div>
      <div className={styles.searchBar}>
        <SearchBar/>
      </div>

      <div className={styles.navFilter} onChange={pagOne}>
        <NavFilter
        />
      </div>

      <div>
        <div className={styles.containerDogs}>
          {currentDogs.length > 0 ? (
            currentDogs.map((dog) => {
              return (
                <Link
                  key={dog.id}
                  to={`/dogs/${dog.id}`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                <Card
                  key={dog.id}
                  name={dog.name}
                  temperament={dog.temperament}
                  temperaments={dog.temperaments}
                  image={dog.image}
                  weight_min={dog.weight_min}
                  weight_max={dog.weight_max}
                />
                </Link>
              );
            })
          ) : (
            <div className={styles.loading}>
              <Loading
              />
            </div>
          )}
        </div>

        <div className={styles.pagination}>
          <Pagination
            dogsPerPage = {dogsPerPage}
            allDogs={allDogs.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>

        <div className={styles.footer}></div>
      </div>
    </div>
  );
};