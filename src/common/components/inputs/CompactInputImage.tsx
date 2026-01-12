import React, {useState, useRef, useCallback, useEffect} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCloudUploadAlt,
    faEdit,
    faTrash,
    faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import {cn} from "../../../utils/cn.ts";
import {uploadImage} from "../../services/images.service.ts";
import type {ImageUpload} from "../../responses/imageUpload.ts";
import {toast} from "react-toastify";

interface CompactInputImageProps {
    allowCopyPaste?: boolean;
    onUploadComplete?: (url: ImageUpload) => void;
    onUploadFailed?: () => void;
    onReset?: () => void;
    onError?: (error: string) => void;
    className?: string;
    initialImageUrl?: string; // New prop to pass the initial image URL
}

const CompactInputImage = ({
                               allowCopyPaste = true,
                               onUploadComplete,
                               onUploadFailed,
                               onReset,
                               onError,
                               className = '',
                               initialImageUrl, // Destructure the initial image URL
                           }: CompactInputImageProps) => {
    const [isUploading, setIsUploading] = useState(false);
    const [imageUpload, setImageUpload] = useState<ImageUpload | undefined>(undefined);
    const [dragOver, setDragOver] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleError = useCallback((error: string) => {
        onError?.(error);
        toast.error(error);
        setIsUploading(false);
    }, [onError]);

    const handleFile = async (file: File) => {
        if (!file.type.startsWith('image/')) {
            handleError('Please select a valid image file');
            return;
        }

        setIsUploading(true);
        try {
            const response = await uploadImage(file);
            setImageUpload(response);
            onUploadComplete?.(response);
        } catch (error) {
            handleError(error instanceof Error ? error.message : 'Upload failed');
            onUploadFailed?.();
        } finally {
            setIsUploading(false);
        }
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleFile(file);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files[0];
        if (file) handleFile(file);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragOver(false);
    };

    const handlePaste = useCallback((e: ClipboardEvent) => {
        if (!allowCopyPaste) return;
        const items = e.clipboardData?.items;
        if (!items) return;

        for (const item of items) {
            if (item.type.startsWith('image/')) {
                const file = item.getAsFile();
                if (file) {
                    e.preventDefault();
                    handleFile(file);
                    break;
                }
            }
        }
    }, [allowCopyPaste]);

    useEffect(() => {
        document.addEventListener('paste', handlePaste);
        return () => document.removeEventListener('paste', handlePaste);
    }, [handlePaste]);

    useEffect(() => {
        if (initialImageUrl) {
            setImageUpload({thumb: {mime: '', name: '', extension: '', filename: '', url: initialImageUrl}});
        }
    }, [initialImageUrl]); // Update the image state when initialImageUrl prop changes

    const triggerFileInput = () => fileInputRef.current?.click();

    const resetUploader = () => {
        setImageUpload(undefined);
        if (fileInputRef.current) fileInputRef.current.value = '';
        onReset?.();
    };

    return (
        <div className={cn("w-fit select-none", className)}>
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
            />

            {imageUpload ? (
                <div className="relative inline-block group">
                    <img
                        src={imageUpload.thumb.url}
                        alt="Uploaded"
                        className="w-32 h-32 object-cover rounded-lg border-2 border-mono-300 dark:border-mono-600"
                    />
                    <div
                        className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 rounded-lg flex items-center justify-center gap-3 transition-opacity">
                        <button
                            onClick={triggerFileInput}
                            disabled={isUploading}
                            className="p-2.5 bg-white/90 dark:bg-mono-800/90 rounded-full hover:bg-white dark:hover:bg-mono-700"
                            title="Change image"
                        >
                            <FontAwesomeIcon icon={faEdit} className="text-sm"/>
                        </button>
                        <button
                            onClick={resetUploader}
                            disabled={isUploading}
                            className="p-2.5 bg-white/90 dark:bg-mono-800/90 rounded-full hover:bg-white dark:hover:bg-mono-700"
                            title="Remove image"
                        >
                            <FontAwesomeIcon icon={faTrash} className="text-sm"/>
                        </button>
                    </div>
                    {isUploading && (
                        <div className="absolute inset-0 bg-black/60 rounded-lg flex items-center justify-center">
                            <FontAwesomeIcon icon={faSpinner} spin className="text-white text-xl"/>
                        </div>
                    )}
                </div>
            ) : (
                <div
                    onClick={triggerFileInput}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    className={cn(
                        "w-32 h-32 rounded-lg border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all gap-2",
                        dragOver
                            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30"
                            : "border-mono-400 dark:border-mono-600 hover:border-mono-500 dark:hover:border-mono-500",
                        isUploading && "opacity-60 cursor-not-allowed"
                    )}
                >
                    {isUploading ? (
                        <FontAwesomeIcon icon={faSpinner} spin className="text-3xl text-mono-500"/>
                    ) : (
                        <>
                            <FontAwesomeIcon
                                icon={faCloudUploadAlt}
                                className="text-3xl text-mono-500 dark:text-mono-400"
                            />
                            <span className="text-xs text-mono-600 dark:text-mono-400 text-center px-2 leading-tight">
                                {allowCopyPaste
                                    ? "Click, drag & drop,\nor paste image"
                                    : "Click or drag & drop\nimage here"}
                            </span>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default CompactInputImage;
