import React from "react";
import { useRouter } from "next/router";

const CaseStudyPagination = ({ currentPage, totalPages }) => {
  const router = useRouter();

  const renderPaginationItems = () => {
    const paginationItems = [];

    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, startPage + 3);

    for (let i = startPage; i <= endPage; i++) {
      const isActive = i === currentPage;
      paginationItems.push(
        <a key={i} href={`/blog/case-study/page/${i}`}>
          <li className={`pagination-item${isActive ? " active" : ""}`}>{i}</li>
        </a>
      );
    }
    return paginationItems;
  };

  React.useEffect(() => {
    if (currentPage === 1 && router.asPath.includes("/page/1")) {
      router.replace("/blog/case-study/");
    }
  }, [currentPage, router]);

  return (
    <div className="pagination">
      {currentPage > 1 && (
        <a href={`/blog/case-study/page/${currentPage - 1}`}>
          <li className="pagination-item">Previous</li>
        </a>
      )}

      {renderPaginationItems()}

      {currentPage < totalPages && (
        <a href={`/blog/case-study/page/${currentPage + 1}`}>
          <li className="pagination-item">Next</li>
        </a>
      )}
    </div>
  );
};

export default CaseStudyPagination;
