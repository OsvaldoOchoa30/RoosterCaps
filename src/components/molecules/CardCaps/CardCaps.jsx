import React, { useEffect } from "react";
import styles from "./CardCaps.module.css";
import { data } from "autoprefixer";

function CardCaps({ nombreCap, Precio, Imagen, link, id,hrfs}) {
 
  return (
    <a href={hrfs} className={styles.cardLink}>
    <div className={styles.card}>
      <img src={Imagen} alt={nombreCap} className={styles.cardImage} />
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{nombreCap}</h3>
        {Precio ? <p className={styles.cardPrice}>${Precio}</p> : null}
        {link ? (
          <a href={`${link}/${id}`} className={styles.cardLink}>
            Ver más
          </a>
        ) : null}
      </div>
    </div>
    </a>
  );
}

export default CardCaps;
