import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ActiveCases.module.css';


export default function ActiveCases () {
    
    return (
        <div className={`${styles.activeCases} `}>
            <h1>Active Cases</h1>
        </div>
    );
};