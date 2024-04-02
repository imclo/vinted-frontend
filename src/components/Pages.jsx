const Pages = ({
  page,
  maxPages,
  handleFirstPage,
  handleLastPage,
  handleNextPage,
  handlePrevPage,
}) => {
  return (
    <section className="pagination">
      <button
        onClick={() => {
          handleFirstPage();
        }}
        disabled={page === 1}
      >
        {"<<"}
      </button>
      <button
        onClick={() => {
          handlePrevPage();
        }}
        disabled={page <= 1}
      >
        {"<"}
      </button>
      {page !== 1 && (
        <button
          onClick={() => {
            handlePrevPage();
          }}
        >
          {page - 1}
        </button>
      )}
      <span className="pagination__current-page">{page}</span>
      {page !== maxPages && (
        <button onClick={() => handleNextPage()}>{page + 1}</button>
      )}

      <button
        onClick={() => {
          handleNextPage();
        }}
        disabled={page === maxPages}
      >
        {">"}
      </button>
      <button
        onClick={() => {
          handleLastPage();
        }}
        disabled={page === maxPages}
      >
        {">>"}
      </button>
    </section>
  );
};

export default Pages;
