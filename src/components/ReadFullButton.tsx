interface ReadFullButtonProps {
    handleReadMore: () => void;
}

const ReadFullButton = (props: ReadFullButtonProps) => {
    return (
        <button
            onClick={props.handleReadMore}
            className="mt-auto w-full bg-gradient-to-r from-primary-500 to-primary-600
                                 dark:from-primary-600 dark:to-primary-700
                                 hover:from-primary-600 hover:to-primary-700
                                 dark:hover:from-primary-700 dark:hover:to-primary-800
                                 text-white font-semibold py-3 px-6 rounded-xl
                                 transition-all duration-300 shadow-md hover:shadow-xl
                                 transform hover:-translate-y-1 font-sans
                                 group/button">
                    <span className="flex items-center justify-center gap-2">
                        Read Full Story
                        <svg
                            className="w-5 h-5 group-hover/button:translate-x-1 transition-transform duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                        </svg>
                    </span>
        </button>
    );
};

export default ReadFullButton;