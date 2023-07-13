import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ActiveCases.module.css';


export default function ActiveCases () {
    
    return (
        <div className={`${styles.hero} `}>
            <h1>Casos activos</h1>
        </div>
    );
}