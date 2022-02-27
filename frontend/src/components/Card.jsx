import React from 'react';

import styles from './styles/Card.module.css';


function Card({name, temperament, temperaments, image, weight_min}) {
  if (!temperaments) {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <img src={image} alt="img not found" className={styles.imgcard} />
          <h3>{name}</h3>
          <p>temperaments: {temperament}</p>
          <p>{weight_min} kg </p>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <img src={image} alt="img not found" className={styles.imgcard} />
          <h3>{name}</h3>
          <p>{temperaments?.map((temp) => temp.name).join(", ")}</p>
          <p>{weight_min} kg</p>
        </div>
      </div>
    );
  };
};

export default Card;