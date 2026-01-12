interface PageHeaderProps {
    title: string;
    subtitle?: string;
}

const PageHeader = ({title, subtitle}: PageHeaderProps) => {
    return (
        <header className="text-center mb-8">
            <h1 className="text-5xl font-bold dark:text-mono-100 mb-4 font-serif">
                {title}
            </h1>
            {subtitle && <p className="text-base text-mono-600 dark:text-mono-200 font-light font-sans">
                {subtitle}
            </p>}
        </header>
    );
};

export default PageHeader;