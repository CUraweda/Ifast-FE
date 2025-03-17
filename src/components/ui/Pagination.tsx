import React from "react";

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

  // Berapa banyak halaman "saudara" di kiri dan kanan currentPage yang akan ditampilkan
  const siblingCount = 2;

  const getPageNumbers = () => {
    // Jika tidak ada item atau hanya 1 halaman, langsung return [1]
    if (totalPages <= 1) {
      return [1];
    }

    const pages: (number | string)[] = [];

    // 1. Tambahkan selalu halaman pertama
    pages.push(1);

    // 2. Tentukan awal dan akhir "window" sekitar currentPage
    const start = Math.max(currentPage - siblingCount, 2); // Mulai dari 2 karena 1 sudah ditampilkan di atas
    const end = Math.min(currentPage + siblingCount, totalPages - 1); // -1 karena totalPages akan ditampilkan di akhir

    // 3. Jika start > 2, artinya ada gap antara 1 dan start, tampilkan "..."
    if (start > 2) {
      pages.push("...");
    }

    // 4. Masukkan range halaman dari start sampai end
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // 5. Jika end < totalPages - 1, artinya ada gap sebelum halaman terakhir
    if (end < totalPages - 1) {
      pages.push("...");
    }

    // 6. Tambahkan halaman terakhir
    pages.push(totalPages);

    return pages;
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newItemsPerPage = Number(e.target.value);
    onItemsPerPageChange(newItemsPerPage);
    onPageChange(1); // Reset ke halaman 1 ketika itemsPerPage berubah
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
        if (page === "...") {
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
            className={`btn btn-sm ${currentPage === page ? "btn-accent" : ""}`}
          >
            {page}
          </button>
        );
      })}

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="btn btn-sm"
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
