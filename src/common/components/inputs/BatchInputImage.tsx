import React, {useState, useRef, useCallback, useEffect} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCloudUploadAlt,
    faTrash,
    faCopy,
    faSpinner,
    faPaste,
    faMousePointer,
    faArrowsAlt,
} from "@fortawesome/free-solid-svg-icons";
import {cn} from "../../../utils/cn.ts";
import {uploadImage} from "../../services/images.service.ts";
import type {ImageUpload} from "../../responses/imageUpload.ts";
import {toast} from "react-toastify";

interface BatchInputImageProps {
    images?: ImageUpload[];
    allowCopyPaste?: boolean;
    onChange?: (images: ImageUpload[]) => void;
    maxImages?: number;
    className?: string;
}

const BatchInputImage = ({
                             images: externalImages,
                             allowCopyPaste = false,
                             onChange,
                             maxImages = 20,
                             className = '',
                         }: BatchInputImageProps) => {
    const [internalImages, setInternalImages] = useState<ImageUpload[]>(externalImages ?? []);

    const [isUploading, setIsUploading] = useState(false);
    const [dragOver, setDragOver] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const updateImages = (newImages: ImageUpload[]) => {
        setInternalImages(newImages);
        onChange?.(newImages);
    };

    const handleUpload = async (file: File) => {
        if (!file.type.startsWith('image/')) {
            toast.error('Please select a valid image file');
            return;
        }

        try {
            const response = await uploadImage(file);
            return response;
        } catch (error) {
            throw error instanceof Error ? error.message : 'Upload failed';
        }
    };

    const handleFiles = async (files: FileList | null) => {
        if (!files) return;

        const filesArray = Array.from(files);
        if (filesArray.length + internalImages.length > maxImages) {
            toast.error(`You can upload a maximum of ${maxImages} images.`);
            return;
        }

        setIsUploading(true);

        try {
            const uploadPromises = filesArray.map(file => handleUpload(file));
            const responses = await Promise.all(uploadPromises);

            const newImages = [...internalImages, ...responses.filter(x => !!x)];

            updateImages(newImages);
            toast.success('Images uploaded successfully');
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Upload failed');
        } finally {
            setIsUploading(false);
        }
    };


    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleFiles(e.target.files);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragOver(false);
        handleFiles(e.dataTransfer.files);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragOver(true);
    };

    const handleDragLeave = () => setDragOver(false);

    const handlePaste = useCallback((event: ClipboardEvent) => {
        if (!allowCopyPaste) {
            return;
        }

        const items = event.clipboardData?.items;
        if (!items) return;

        for (const item of items) {
            if (item.type.startsWith('image/')) {
                const file = item.getAsFile();
                if (file && internalImages.length < maxImages) {
                    event.preventDefault();
                    handleUpload(file);
                }
                break;
            }
        }
    }, [internalImages.length, maxImages]);

    useEffect(() => {
        document.addEventListener('paste', handlePaste);
        return () => document.removeEventListener('paste', handlePaste);
    }, [handlePaste]);

    const removeImage = (index: number) => {
        const newImages = internalImages.filter((_, i) => i !== index);
        console.error("Remove image called")
        updateImages(newImages);
    };

    const copy = (content: string) => {
        navigator.clipboard.writeText(content);
        toast.success('Content copied to clipboard!');
    };

    const triggerFileInput = () => fileInputRef.current?.click();

    const canAddMore = internalImages.length < maxImages;

    return (
        <div className={cn("w-full select-none space-y-4", className)}>
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileInput}
                className="hidden"
            />

            {internalImages.length > 0 && (
                <div className="space-y-3">
                    {internalImages.map((img, index) => (
                        <div
                            key={img.id || img.url}
                            className="flex items-center gap-3 p-3 bg-mono-50 dark:bg-mono-800/50 rounded-lg border border-mono-200 dark:border-mono-700"
                        >
                            <img
                                src={img.thumb.url}
                                alt="Preview"
                                className="w-16 h-16 object-cover rounded-md border border-mono-300 dark:border-mono-600"
                            />
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-mono-900 dark:text-mono-100 truncate">
                                    {img.id || `Image ${index + 1}`}
                                </p>

                                <div className="flex flex-row gap-4">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (img.url)
                                                copy(img.url);
                                        }}
                                        className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 mt-1"
                                    >
                                        <FontAwesomeIcon icon={faCopy} className="text-xs"/>
                                        Copy URL
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => copy(`![${img.id}](${img.url})`)}
                                        className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 mt-1"
                                    >
                                        <FontAwesomeIcon icon={faCopy} className="text-xs"/>
                                        Copy Markdown
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (img.deleteUrl)
                                                copy(img.deleteUrl);
                                        }}
                                        className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 mt-1"
                                    >
                                        <FontAwesomeIcon icon={faTrash} className="text-xs"/>
                                        Copy delete URL
                                    </button>
                                </div>
                            </div>
                            <button
                                onClick={() => removeImage(index)}
                                disabled={isUploading}
                                type="button"
                                className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-full transition"
                                title="Remove"
                            >
                                <FontAwesomeIcon icon={faTrash}/>
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {canAddMore && (
                <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onClick={triggerFileInput}
                    className={cn(
                        "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
                        dragOver
                            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                            : "border-mono-300 dark:border-mono-600 hover:border-mono-400 dark:hover:border-mono-500",
                        isUploading && "opacity-50 cursor-not-allowed"
                    )}
                >
                    {isUploading ? (
                        <div className="flex flex-col items-center space-y-3">
                            <FontAwesomeIcon icon={faSpinner} spin
                                             className="text-3xl text-mono-600 dark:text-mono-400"/>
                            <p className="text-sm text-mono-600 dark:text-mono-400">Uploading...</p>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center space-y-4">
                            <FontAwesomeIcon icon={faCloudUploadAlt}
                                             className="text-4xl text-mono-400 dark:text-mono-500"/>
                            <p className="text-sm font-medium text-mono-700 dark:text-mono-300">
                                Drop images here or click to upload
                            </p>
                            <div className="flex gap-6 text-xs text-mono-500 dark:text-mono-400">
                                <span className="flex items-center gap-1">
                                    <FontAwesomeIcon icon={faMousePointer}/> Click
                                </span>
                                <span className="flex items-center gap-1">
                                    <FontAwesomeIcon icon={faArrowsAlt}/> Drag & drop
                                </span>
                                {allowCopyPaste && <span className="flex items-center gap-1">
                                    <FontAwesomeIcon icon={faPaste}/> Paste
                                </span>}
                            </div>
                            <p className="text-xs text-mono-500">
                                {internalImages.length}/{maxImages} images
                            </p>
                        </div>
                    )}
                </div>
            )}

            {!canAddMore && internalImages.length > 0 && (
                <p className="text-center text-sm text-mono-500 dark:text-mono-400">
                    Maximum {maxImages} images reached
                </p>
            )}
        </div>
    );
};

export default BatchInputImage;