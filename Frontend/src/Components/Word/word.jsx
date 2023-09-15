import React from "react";
import styles from "./word.module.css";

export default function Word() {
    return (
        <section className={styles.showcase}>
            <video src="../../../assets/TreeWord.mp4" autoPlay loop muted className={styles.video}></video>
        </section>
    );
}