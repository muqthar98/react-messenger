import styles from "./overlay.module.css";

export const Overlay = ({ children }) => {
  return <div className={styles.overlay}>{children}</div>;
};
