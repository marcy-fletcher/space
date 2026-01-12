export interface PaginationInfoProps {
    currentPage: number;
    pageSize: number;
    total: number;
    searchTerm?: string;
}

const PaginationInfo = ({currentPage, pageSize, total, searchTerm}: PaginationInfoProps) => {
    const startItem = total > 0 ? (currentPage - 1) * pageSize + 1 : 0;
    const endItem = Math.min(currentPage * pageSize, total);

    return (
        <div className="mb-6 text-sm text-mono-600 dark:text-mono-400">
            Showing {startItem}-{endItem} of {total} items
            {searchTerm && (
                <span className="ml-2 text-primary-500 dark:text-primary-400">
                    (searching for "{searchTerm}")
                </span>
            )}
        </div>
    );
};

export default PaginationInfo;