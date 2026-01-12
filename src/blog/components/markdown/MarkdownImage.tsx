interface MarkdownImageProps {
    src?: string
    alt?: string
    title?: string
}

const MarkdownImage = ({src, alt, title}: MarkdownImageProps) => {
    const isVideo = src && /\.(mp4|webm|ogg|mov|avi)$/i.test(src);

    if (isVideo) {
        return (
            <div className="flex justify-center my-4">
                <video
                    src={src}
                    title={title}
                    controls
                    muted
                    className="rounded-lg shadow-md max-w-full h-auto
                             border border-mono-200 dark:border-mono-700
                             hover:shadow-lg"
                >
                    Your browser does not support the video tag.
                </video>
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            title={title}
            className="rounded-lg shadow-md my-4 max-w-full h-auto
                     border border-mono-200 dark:border-mono-700
                     hover:shadow-lg text-transparent"
        />
    );
};

export default MarkdownImage;