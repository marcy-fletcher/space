import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight, faSearch, faTimes} from "@fortawesome/free-solid-svg-icons";
import {useSearchStore} from "../../model/searchStore.ts";
import React, {useEffect, useState} from "react";

const SearchInput = () => {
    const {params, setParams} = useSearchStore();
    const [inputValue, setInputValue] = useState(params.term ?? '');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleSearchSubmit = () => {
        if (inputValue && inputValue.trim()) {
            setParams({...params, term: inputValue});
        } else {
            setParams({...params, term: undefined});
        }
    };

    useEffect(() => {
        async function onTermUpdate() {
            setInputValue(params.term ?? '');
        }

        onTermUpdate();
    }, [params.term]);

    return (
        <div className="mb-12">
            <div className="relative max-w-2xl mx-auto">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <FontAwesomeIcon icon={faSearch} className="text-mono-400 dark:text-mono-500"/>
                </div>

                <input
                    type="text"
                    placeholder="Search by title or #tag..."
                    value={inputValue}
                    onChange={handleInputChange}
                    className={
                        `w-full pl-12 pr-24 py-4 bg-mono-50 dark:bg-mono-800 border border-mono-200 dark:border-mono-700 rounded-xl
                        focus:outline-none focus:border-primary-500 dark:focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20
                        text-mono-900 dark:text-mono-100 placeholder-mono-400 dark:placeholder-mono-500
                        shadow-sm font-sans text-base`
                    }
                />

                {inputValue && (
                    <button
                        onClick={() => {
                            setInputValue('');
                            setParams({...params, term: undefined});
                        }}
                        className="absolute right-20 top-1/2 transform -translate-y-1/2 p-2 text-mono-400 hover:text-mono-600
                                 dark:text-mono-500 dark:hover:text-mono-300"
                        aria-label="Clear search"
                    >
                        <FontAwesomeIcon icon={faTimes} className="w-4 h-4"/>
                    </button>
                )}

                <button
                    onClick={handleSearchSubmit}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2
                    px-6 py-2 rounded-lg font-medium bg-primary-500 hover:bg-primary-600
                    text-mono-50 shadow-md hover:shadow-lg cursor-pointer"
                    aria-label="Search"
                >
                    <FontAwesomeIcon
                        icon={faArrowRight}
                        className="w-4 h-4"
                    />
                </button>
            </div>
        </div>
    );
};

export default SearchInput;
