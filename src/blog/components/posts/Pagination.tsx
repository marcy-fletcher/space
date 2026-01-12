import React from 'react';
import Button from "../../../common/components/Button.tsx";
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Card from "../../../layout/Card.tsx";
import {cn} from "../../../utils/cn.ts";
import {useSearchStore} from "../../model/searchStore.ts";

const getPageNumbers = (currentPage: number, totalPages: number) => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
        return Array.from({length: totalPages}, (_, i) => i + 1);
    }

    pages.push(1);

    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);

    if (currentPage <= 3) {
        endPage = 4;
    }

    if (currentPage >= totalPages - 2) {
        startPage = totalPages - 3;
    }

    if (startPage > 2) {
        pages.push('...');
    }

    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    if (endPage < totalPages - 1) {
        pages.push('...');
    }

    if (totalPages > 1) {
        pages.push(totalPages);
    }

    return pages;
};

interface DesktopPaginationProps {
    totalPages: number;
    className?: string;
}

const Pagination = ({totalPages, className}: DesktopPaginationProps) => {
    const {params, setParams} = useSearchStore();
    const currentPage = params.page ? parseInt(params.page) : 1;

    const pageNumbers = getPageNumbers(currentPage, totalPages);

    return (
        <Card className={cn("items-center justify-between", className)}>
            <Button className="flex items-center gap-2 text-sm"
                    size="small" variant="link"
                    disabled={currentPage === 1}
                    onClick={() => setParams({...params, page: (currentPage - 1).toString()})}
            >
                <FontAwesomeIcon icon={faChevronLeft}/>
                Previous
            </Button>

            <div className="hidden sm:flex">
                {pageNumbers.length > 1 &&
                    <div className="flex items-center gap-1">
                        {pageNumbers.map((page, index) => (
                            <React.Fragment key={index}>
                                {page === '...' ? (
                                    <span className="px-3 py-2 text-gray-400 dark:text-gray-500 font-medium">...</span>
                                ) : (
                                    <Button
                                        onClick={() => setParams({...params, page: (page).toString()})}
                                        variant={currentPage == page ? "primary" : "link"}
                                        className="px-4 py-3 rounded-xl text-sm">
                                        {page}
                                    </Button>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                }
            </div>

            <div className="sm:hidden text-sm">
                {currentPage} out of {totalPages}
            </div>

            <Button className="flex items-center gap-2 text-sm"
                    size="small" variant="link"
                    onClick={() => setParams({...params, page: (currentPage + 1).toString()})}
                    disabled={currentPage === totalPages}
            >
                Next
                <FontAwesomeIcon icon={faChevronRight}/>
            </Button>
        </Card>
    );
};

export default Pagination;