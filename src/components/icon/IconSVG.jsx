import styles from "./icon.module.css";

import iconPath from "/symbol-defs.svg";

export const IconSVG = ({ iconName, ...prpos }) => {
  return (
    <svg className={styles.icon_svg} {...prpos}>
      <use xlinkHref={iconPath + `#icon-${iconName}`}></use>
    </svg>
  );
};
