import React from 'react';
import {Link} from "react-router-dom";

interface MarkdownLinkProps { href?: string; children?: React.ReactNode };

const MarkdownLink = ({href, children}: MarkdownLinkProps) => {

    const internal = href && href.startsWith('/') && !href.startsWith('//');

    if (internal) {
        return (
            <Link
                to={href}
                className="text-primary-600 dark:text-primary-400 hover:text-primary-700
                     dark:hover:text-primary-300 underline
                     font-medium"
            >
                {children}
            </Link>
        );
    }

    return (
        <a
            href={href}
            className="text-primary-600 dark:text-primary-400 hover:text-primary-700
                   dark:hover:text-primary-300 underline
                   font-medium"
            target="_blank"
            rel="noopener noreferrer"
        >
            {children}
        </a>
    );
};

export default MarkdownLink;