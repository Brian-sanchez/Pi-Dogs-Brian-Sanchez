import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogs, getNameDogs, refreshPag } from "../actions/index";

import Swal from 'sweetalert2';

import styles from "./styles/SearchBar.module.css";


function SearchBar() {
  const dispatch = useDispatch();

  const [name, setName] = useState("");

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(getDogs());
    dispatch(refreshPag());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.length === 0) {
      return Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please enter a name',
      });
    }

    else if (name.match(/[|\\/~^:.,;?!&%$@*+_-]/)) {
      return Swal.fire({
        icon: 'error',
        title: 'Error',
        text: "Don't write special characters"
      });
    }

    else if (name > 0) {
      return Swal.fire({
        icon: 'error',
        title: 'Error',
        text: "Don't write numbers"
      });
    }

    else {
      dispatch(getNameDogs(name));
      setName("");
    };
  };

  return (
    <div className={styles.container}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          placeholder="Name ..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button
          type="submit"
          onClick={(e) => handleSubmit(e)}
          className={styles.search}
        >
          <p>Search</p>
        </button>
      </form>

      <div>
        <button onClick={(e) => handleClick(e)} className={styles.refresh}>
          Refresh
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
