import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetailsDogs } from "../actions/index";
import Loading from "./Loading";

import styles from "./styles/Details.module.css";

function Details() {
  const allDetails = useSelector((state) => state.dogsDetails);
  const dispatch = useDispatch();
  const {id} = useParams();

  useEffect(() => {  
    dispatch(getDetailsDogs(id));
  }, [dispatch, id]);

  return (
    <div>
      {allDetails.length > 0 ? ( 
        <div>
          <div className={styles.container}>
            <div className={styles.info}>
              <div className={styles.details}>
                <h3>Life Span: </h3>
                <br></br>
                <p>
                  {allDetails[0].life_span.length > 8
                    ? allDetails[0].life_span.slice(0, 7)
                    : allDetails[0].life_span.slice(0, 2)}
                  &nbsp;years
                </p>
              </div>

              <div className={styles.details}>
                <h3>Height: </h3>
                <br></br>
                <p>
                  {allDetails[0].height_min} - {allDetails[0].height_max} cm
                </p>
              </div>

              <div className={styles.details}>
                <h3>Weight: </h3>
                <br></br>
                <p>
                  {allDetails[0].weight_min} - {allDetails[0].weight_max} kg
                </p>
              </div>

              <div className={styles.temperament}>
                <h3>Temperaments: </h3>
                <p className={styles.data}>
                  {allDetails[0].temperament
                  ? allDetails[0].temperament
                  : allDetails[0].temperaments?.map((elem) => elem.name + " ")
                  }
                </p>
              </div>

              <img
                className={styles.imgBkg}
                src={allDetails[0].image}
                alt="img not found"
              />
            </div>

            <div className={styles.imgAndName}>
              <img
                src={allDetails[0].image}
                alt="img not found"
                className={styles.image}
              />
              <h1 className={styles.name}>{allDetails[0].name}</h1>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <Loading/>
        </div>
      )}
    </div>
  );
};

export default Details;
