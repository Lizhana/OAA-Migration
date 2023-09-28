import styles from "./Pagination.module.css";

export default function Pagination({
  numberOfItems,
  numberPerPage,
  currentPage,
  setCurrentPage,
}) {
  const prevPage = parseInt(currentPage) - 1;
  const  nextPage = parseInt(currentPage) + 1;
  const  firstPage = 1;
  const lastPage = Math.ceil(parseInt(numberOfItems) / parseInt(numberPerPage));

  const clickHandler = (event) => {
    event.preventDefault();
    if (parseInt(event.target.value) > lastPage) {
      return setCurrentPage(lastPage);
    } else if (parseInt(event.target.value) < firstPage) {
      return setCurrentPage(firstPage);
    }
    setCurrentPage(parseInt(event.target.value));
  };
  return (
    <div className={`${styles["paged"]}`}>
      {parseInt(currentPage) > firstPage && (
        <button
          className={`${styles["button"]} ${styles["button-prev"]}`}
          onClick={clickHandler}
          value={prevPage}
        >
          {"<"}
        </button>
      )}
      <div className={`${styles["text-container"]}`}>
        <p className={`${styles["text"]}`}>{currentPage}</p>
        <p className={styles["text"]}>de</p>
        <p className={`${styles["text"]}`}>{lastPage}</p>
      </div>
      {parseInt(currentPage) < lastPage && (
        <button
          className={`${styles["button"]} ${styles["button-next"]}`}
          onClick={clickHandler}
          value={nextPage}
        >
          {">"}
        </button>
      )}
    </div>
  );
}
