import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Link } from 'react-router-dom';

interface MarkdownRendererProps {
    content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
    const MarkdownComponents = {
        p: ({ children }: { children?: React.ReactNode }) => (
            <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed text-justify text-lg
                  indent-8 reading-font-serif">
                {children}
            </p>
        ),
        h1: ({ children }: { children?: React.ReactNode }) => (
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mt-8 mb-4
                   font-serif border-b-2 border-primary-200 dark:border-primary-800 pb-2">
                {children}
            </h1>
        ),
        h2: ({ children }: { children?: React.ReactNode }) => (
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mt-8 mb-4
                   font-serif border-b border-primary-100 dark:border-primary-900 pb-2">
                {children}
            </h2>
        ),
        h3: ({ children }: { children?: React.ReactNode }) => (
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mt-6 mb-3 font-serif">
                {children}
            </h3>
        ),
        h4: ({ children }: { children?: React.ReactNode }) => (
            <h4 className="text-lg font-bold text-gray-800 dark:text-gray-100 mt-6 mb-3 font-serif">
                {children}
            </h4>
        ),
        blockquote: ({ children }: { children?: React.ReactNode }) => (
            <blockquote className="border-l-4 border-primary-400 dark:border-primary-600
                           bg-primary-50 dark:bg-gray-700 py-4 px-6 my-6 rounded-r-lg
                           italic text-gray-600 dark:text-gray-400 font-sans leading-[1.5]">
                {children}
            </blockquote>
        ),
        ul: ({ children }: { children?: React.ReactNode }) => (
            <ul className="list-disc list-outside ml-6 mb-6 text-gray-700 dark:text-gray-300
                   font-sans space-y-2 leading-[1.5]">
                {children}
            </ul>
        ),
        ol: ({ children }: { children?: React.ReactNode }) => (
            <ol className="list-decimal list-outside ml-6 mb-6 text-gray-700 dark:text-gray-300
                   font-sans space-y-2 leading-[1.5]">
                {children}
            </ol>
        ),
        li: ({ children }: { children?: React.ReactNode }) => (
            <li className="pl-2 leading-[1.5]">{children}</li>
        ),
        strong: ({ children }: { children?: React.ReactNode }) => (
            <strong className="font-bold text-gray-900 dark:text-gray-100">{children}</strong>
        ),
        em: ({ children }: { children?: React.ReactNode }) => (
            <em className="italic text-gray-600 dark:text-gray-400">{children}</em>
        ),
        a: ({ href, children }: { href?: string; children?: React.ReactNode }) => {
            const isInternalLink = href && href.startsWith('/') && !href.startsWith('//');

            if (isInternalLink) {
                return (
                    <Link
                        to={href}
                        className="text-primary-600 dark:text-primary-400 hover:text-primary-700
                     dark:hover:text-primary-300 underline transition-colors duration-200
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
                   dark:hover:text-primary-300 underline transition-colors duration-200
                   font-medium"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {children}
                </a>
            );
        },
        code: ({ inline, children, className }: {
            inline?: boolean;
            children?: React.ReactNode;
            className?: string;
        }) => {
            if (inline) {
                return (
                    <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded
                        text-gray-800 dark:text-gray-200 text-sm font-mono
                        border border-gray-200 dark:border-gray-600">
                        {children}
                    </code>
                );
            }
            return (
                <code className={`${className} block bg-gray-900 text-gray-100 p-4 rounded-lg 
                         overflow-x-auto my-6 font-mono text-sm border border-gray-700`}>
                    {children}
                </code>
            );
        },
        pre: ({ children }: { children?: React.ReactNode }) => (
            <pre className="my-6 rounded-lg overflow-hidden">{children}</pre>
        ),
        hr: () => (
            <hr className="my-8 border-gray-300 dark:border-gray-600" />
        ),
        table: ({ children }: { children?: React.ReactNode }) => (
            <div className="overflow-x-auto my-6 rounded-lg border border-gray-200 dark:border-gray-700">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    {children}
                </table>
            </div>
        ),
        thead: ({ children }: { children?: React.ReactNode }) => (
            <thead className="bg-gray-50 dark:bg-gray-800">
            {children}
            </thead>
        ),
        tbody: ({ children }: { children?: React.ReactNode }) => (
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {children}
            </tbody>
        ),
        th: ({ children }: { children?: React.ReactNode }) => (
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300
                   bg-primary-50 dark:bg-primary-900/30">
                {children}
            </th>
        ),
        td: ({ children }: { children?: React.ReactNode }) => (
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 font-sans leading-[1.5]">
                {children}
            </td>
        ),
        img: ({ src, alt, title }: { src?: string; alt?: string; title?: string }) => (
            <img
                src={src}
                alt={alt}
                title={title}
                className="rounded-lg shadow-md my-4 max-w-full h-auto
                         border border-gray-200 dark:border-gray-700
                         transition-all duration-200 hover:shadow-lg"
            />
        ),
    };

    return (
        <div className="story-content">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={MarkdownComponents}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
};

export default MarkdownRenderer;