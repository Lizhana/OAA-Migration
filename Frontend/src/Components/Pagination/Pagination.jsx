import styles from "./Pagination.module.css";

export default function Pagination({
  numberOfItems,
  numberPerPage,
  currentPage,
  setCurrentPage,
}) {
  const prevPage = parseInt(currentPage) - 1,
    nextPage = parseInt(currentPage) + 1,
    firstPage = 1,
    lastPage = Math.ceil(parseInt(numberOfItems) / parseInt(numberPerPage));

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
        <input
          className={`${styles["number-input"]}`}
          type='number'
          name='currentPage'
          value={currentPage}
          min={1}
          max={lastPage}
          onChange={clickHandler}
        />

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
