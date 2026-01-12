import React, {useState, useRef, useCallback, useEffect} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faArrowsAlt,
    faCloudUploadAlt,
    faEdit,
    faMousePointer,
    faPaste,
    faSpinner,
    faTrash
} from "@fortawesome/free-solid-svg-icons";
import {cn} from "../../../utils/cn.ts";
import {uploadImage} from "../../services/images.service.ts";
import type {ImageUpload} from "../../responses/imageUpload.ts";
import {toast} from "react-toastify";

interface ImageUploaderProps {
    allowCopyPaste?: boolean;
    onUploadComplete?: (url: ImageUpload) => void;
    onUploadFailed?: () => void;
    onReset?: () => void;
    onError?: (error: string) => void;
    className?: string;
}

const InputImage = ({
                        allowCopyPaste = true,
                        onUploadComplete,
                        onUploadFailed,
                        onReset,
                        onError,
                        className = '',
                    }: ImageUploaderProps) => {
    const [isUploading, setIsUploading] = useState(false);
    const [imageUpload, setImageUpload] = useState<ImageUpload | undefined>();
    const [dragOver, setDragOver] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleError = useCallback((error: string) => {
        setErrorMessage(error);
        onError?.(error);
        toast.error(error)
        setIsUploading(false);
    }, [onError]);

    const clearError = () => {
        setErrorMessage(null);
    };

    const handleFile = async (file: File) => {
        clearError();

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
            setImageUpload(undefined);
            handleError(error instanceof Error ? error.message : 'Upload failed. Please try again.');
            onUploadFailed?.();
        } finally {
            setIsUploading(false);
        }
    };

    const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            handleFile(file);
        }
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setDragOver(false);
        const file = event.dataTransfer.files[0];
        if (file) {
            handleFile(file);
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setDragOver(true);
    };

    const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setDragOver(false);
    };

    const handlePaste = useCallback((event: ClipboardEvent) => {
        if (!allowCopyPaste) {
            return;
        }

        const items = event.clipboardData?.items;
        if (!items) return;

        for (const item of items) {
            if (item.type.startsWith('image/')) {
                const file = item.getAsFile();
                if (file) {
                    event.preventDefault();
                    handleFile(file);
                    break;
                }
            }
        }
    }, []);

    useEffect(() => {
        document.addEventListener('paste', handlePaste);
        return () => {
            document.removeEventListener('paste', handlePaste);
        };
    }, [handlePaste]);

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const resetUploader = async () => {
        if (imageUpload) {
            setImageUpload(undefined);
            clearError();
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
            onReset?.();
        }
    };

    return (
        <div className={cn("w-full select-none", className)}>
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
            />

            {imageUpload ? (
                <div className="relative group">
                    <img
                        src={imageUpload.thumb.url}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg border-2 border-dashed border-mono-300 dark:border-mono-600"
                    />
                    <div
                        className={cn(
                            `absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 
                            rounded-lg flex items-center justify-center space-x-2 transition-opacity`,
                        )}>
                        <button
                            onClick={triggerFileInput}
                            disabled={isUploading}
                            className="p-2 bg-white dark:bg-mono-800 rounded-full text-mono-800 dark:text-white hover:bg-mono-100 dark:hover:bg-mono-700"
                            title="Change image"
                        >
                            <FontAwesomeIcon icon={faEdit}/>
                        </button>
                        <button
                            onClick={resetUploader}
                            disabled={isUploading}
                            className="p-2 bg-white dark:bg-mono-800 rounded-full text-mono-800 dark:text-white hover:bg-mono-100 dark:hover:bg-mono-700"
                            title="Remove image"
                        >
                            <FontAwesomeIcon icon={faTrash}/>
                        </button>
                    </div>
                    {isUploading && (
                        <div
                            className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                            <FontAwesomeIcon icon={faSpinner} spin className="text-white text-2xl"/>
                        </div>
                    )}
                </div>
            ) : (
                <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onClick={triggerFileInput}
                    className={cn(
                        "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
                        dragOver
                            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                            : "border-mono-300 dark:border-mono-600 hover:border-mono-400 dark:hover:border-mono-500",
                        isUploading ? "opacity-50 cursor-not-allowed" : "",
                        errorMessage ? "dark:border-red-500 bg-red-700/10" : ""
                    )}
                >
                    {isUploading ? (
                        <div className="flex flex-col items-center justify-center space-y-3">
                            <FontAwesomeIcon icon={faSpinner} className="text-2xl text-mono-600 dark:text-mono-400"
                                             spin/>
                            <p className="text-sm text-mono-600 dark:text-mono-400 hidden xs:block">
                                Uploading...
                            </p>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center space-y-3">
                            <FontAwesomeIcon icon={faCloudUploadAlt}
                                             className="text-3xl text-mono-400 dark:text-mono-500"/>
                            <p className="text-sm font-medium text-mono-700 dark:text-mono-300 hidden xs:block">
                                Drop image here or click to upload
                            </p>
                            <div className="flex flex-wrap justify-center gap-2 xs:gap-4 text-xs text-mono-500 dark:text-mono-400">
                                <span className="flex items-center">
                                    <FontAwesomeIcon icon={faMousePointer} className="mr-1 flex-shrink-0"/>
                                    <span className="hidden xs:inline">Click</span>
                                </span>
                                <span className="flex items-center">
                                    <FontAwesomeIcon icon={faArrowsAlt} className="mr-1 flex-shrink-0"/>
                                    <span className="hidden xs:inline">Drag & drop</span>
                                </span>
                                {allowCopyPaste && <span className="flex items-center">
                                    <FontAwesomeIcon icon={faPaste} className="mr-1 flex-shrink-0"/>
                                    <span className="hidden xs:inline">Paste</span>
                                </span>}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default InputImage;