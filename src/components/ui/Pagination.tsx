interface PaginationProps {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    onPageChange: (page: number) => void;
    onItemsPerPageChange: (itemsPerPage: number) => void; 
  }
  
  const Pagination: React.FC<PaginationProps> = ({
    totalItems,
    itemsPerPage,
    currentPage,
    onPageChange,
    onItemsPerPageChange,
  }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
  
    const getPageNumbers = () => {
      const pageNumbers = [];
  
      let startPage = Math.max(currentPage - 2, 1);
      let endPage = Math.min(currentPage + 2, totalPages);
  
      if (startPage > 1) {
        pageNumbers.push('...');
      }
  
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
  
      if (endPage < totalPages) {
        pageNumbers.push('...');
      }
  
      return pageNumbers;
    };
  
    const handlePrevious = () => {
      if (currentPage > 1) onPageChange(currentPage - 1);
    };
  
    const handleNext = () => {
      if (currentPage < totalPages) onPageChange(currentPage + 1);
    };
  
    const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newItemsPerPage = Number(e.target.value);
      onItemsPerPageChange(newItemsPerPage); // Mengubah itemsPerPage
      onPageChange(1); // Reset halaman ke 1 saat itemsPerPage berubah
    };
  
    const pageNumbers = getPageNumbers();
  
    return (
      <div className="flex justify-center space-x-2">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="btn btn-sm"
        >
          Prev
        </button>
  
        {pageNumbers.map((page, index) => {
          if (page === '...') {
            return (
              <button key={index} disabled className="btn btn-sm">
                ...
              </button>
            );
          }
  
          return (
            <button
              key={page}
              onClick={() => onPageChange(Number(page))}
              className="btn btn-sm "
            >
              {page}
            </button>
          );
        })}
  
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="btn btn-sm "
        >
          Next
        </button>
  
        <select
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          className="select select-bordered w-24 select-sm"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
          <option value={40}>40</option>
          <option value={50}>50</option>
          <option value={60}>60</option>
          <option value={70}>70</option>
          <option value={80}>80</option>
          <option value={90}>90</option>
          <option value={100}>100</option>
        </select>
      </div>
    );
  };
  
  export default Pagination;