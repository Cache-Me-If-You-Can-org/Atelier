import { useState } from "react";
import * as styles from "./relatedOutfit.module.css";

export default function Modal({ isOpen, setIsOpen, Module }) {
  return (
    <>
      {isOpen && (
        <div
          id="activeModal"
          className={styles.modal}
          onClick={(e) => {
            if (e.target.id === "activeModal") setIsOpen(false);
          }}
        >
          <div className={styles["modal-content"]}>
            <span className={styles.close} onClick={() => setIsOpen(false)}>
              &times;
            </span>
            <Module/>
          </div>
        </div>
      )}
    </>
  );
}