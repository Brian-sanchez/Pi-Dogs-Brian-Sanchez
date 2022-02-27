import React from 'react';
import loading from '../images/loading.gif';

import styles from './styles/Loading.module.css';


export default function Loading() {
    return (
        <div className={styles.bkg}>
            <img src={loading} alt="loading gif" className={styles.loadingGif}/>

            <div className={styles.loading}>
                <h2>Loading...</h2>
            </div>
        </div>
    );
};
