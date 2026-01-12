import React, {lazy, Suspense, useEffect, useState} from "react";

import MarkdownLink from "./MarkdownLink.tsx";
import MarkdownCode from "./MarkdownCode.tsx";
import MarkdownImage from "./MarkdownImage.tsx";
import MarkdownLoader from "../post/loaders/MarkdownLoader.tsx";

const ReactMarkdown = lazy(() => import("react-markdown"));

const MarkdownComponents = {
    p: ({ children }: { children?: React.ReactNode }) => (
        <div className="mb-4 text-mono-700 dark:text-mono-300 leading-relaxed text-justify text-lg indent-8 reading-font-serif">
            {children}
        </div>
    ),
    h1: ({ children }: { children?: React.ReactNode }) => (
        <h1 className="text-3xl font-bold text-mono-800 dark:text-mono-100 mt-8 mb-4 font-serif border-b-2 border-primary-200 dark:border-primary-800 pb-2">
            {children}
        </h1>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
        <h2 className="text-2xl font-bold text-mono-800 dark:text-mono-100 mt-8 mb-4 font-serif border-b border-primary-100 dark:border-primary-900 pb-2">
            {children}
        </h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
        <h3 className="text-xl font-bold text-mono-800 dark:text-mono-100 mt-6 mb-3 font-serif">
            {children}
        </h3>
    ),
    h4: ({ children }: { children?: React.ReactNode }) => (
        <h4 className="text-lg font-bold text-mono-800 dark:text-mono-100 mt-6 mb-3 font-serif">
            {children}
        </h4>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
        <blockquote className="border-l-4 border-primary-400 dark:border-primary-600 bg-primary-50 dark:bg-mono-700 py-4 px-6 my-6 rounded-r-lg italic text-mono-600 dark:text-mono-400 font-sans leading-normal">
            {children}
        </blockquote>
    ),
    ul: ({ children }: { children?: React.ReactNode }) => (
        <ul className="list-disc list-outside ml-6 mb-6 text-mono-700 dark:text-mono-300 font-sans space-y-2 leading-normal">
            {children}
        </ul>
    ),
    ol: ({ children }: { children?: React.ReactNode }) => (
        <ol className="list-decimal list-outside ml-6 mb-6 text-mono-700 dark:text-mono-300 font-sans space-y-2 leading-normal">
            {children}
        </ol>
    ),
    li: ({ children }: { children?: React.ReactNode }) => (
        <li className="pl-2 leading-normal">{children}</li>
    ),
    strong: ({ children }: { children?: React.ReactNode }) => (
        <strong className="font-bold text-mono-900 dark:text-mono-100">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
        <em className="italic text-mono-600 dark:text-mono-400">{children}</em>
    ),
    a: MarkdownLink,
    code: MarkdownCode,
    pre: ({ children }: { children?: React.ReactNode }) => (
        <pre className="my-6 rounded-lg overflow-hidden">{children}</pre>
    ),
    hr: () => (
        <hr className="my-8 border-mono-300 dark:border-mono-600" />
    ),
    table: ({ children }: { children?: React.ReactNode }) => (
        <div className="overflow-x-auto my-6 rounded-lg border border-mono-200 dark:border-mono-700">
            <table className="min-w-full divide-y divide-mono-200 dark:divide-mono-700">
                {children}
            </table>
        </div>
    ),
    thead: ({ children }: { children?: React.ReactNode }) => (
        <thead className="bg-mono-50 dark:bg-mono-800">{children}</thead>
    ),
    tbody: ({ children }: { children?: React.ReactNode }) => (
        <tbody className="divide-y divide-mono-200 dark:divide-mono-700">
        {children}
        </tbody>
    ),
    th: ({ children }: { children?: React.ReactNode }) => (
        <th className="px-4 py-3 text-left text-sm font-semibold text-mono-700 dark:text-mono-300 bg-primary-50 dark:bg-primary-900/30">
            {children}
        </th>
    ),
    td: ({ children }: { children?: React.ReactNode }) => (
        <td className="px-4 py-3 text-sm text-mono-700 dark:text-mono-300 font-sans leading-normal">
            {children}
        </td>
    ),
    img: MarkdownImage,
};

interface MarkdownProps {
    content: string;
    className?: string;
}

const Markdown = ({ content, className }: MarkdownProps) => {
    const [remarkGfm, setRemarkGfm] = useState<unknown>(null);

    useEffect(() => {
        let mounted = true;
        import("remark-gfm").then((module) => {
            if (mounted) {
                setRemarkGfm(() => module.default);
            }
        });

        return () => {
            mounted = false;
        };
    }, []);

    return (
        <div className={className}>
            <Suspense fallback={<MarkdownLoader/>}>
                <ReactMarkdown
                    remarkPlugins={remarkGfm ? [remarkGfm] : []}
                    components={MarkdownComponents}
                >
                    {content}
                </ReactMarkdown>
            </Suspense>
        </div>
    );
};

export default Markdown;