import React, { useState, useRef, useCallback, useEffect } from 'react';
import {supabase} from "../services/supabase.ts";

interface ImageUploaderProps {
    bucketName: string;
    onUploadComplete?: (url: string) => void;
    onError?: (error: string) => void;
    className?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
                                                         bucketName,
                                                         onUploadComplete,
                                                         onError,
                                                         className = '',
                                                     }) => {
    const [isUploading, setIsUploading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [dragOver, setDragOver] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleError = useCallback((error: string) => {
        console.error('ImageUploader Error:', error);
        onError?.(error);
    }, [onError]);

    const uploadToSupabase = async (file: File): Promise<string> => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;

        const { data, error } = await supabase
            .storage
            .from(bucketName)
            .upload(fileName, file);

        if (error) {
            throw new Error(error.message);
        }

        const { data: { publicUrl } } = supabase
            .storage
            .from(bucketName)
            .getPublicUrl(data.path);

        return publicUrl;
    };

    const handleFile = async (file: File) => {
        if (!file.type.startsWith('image/')) {
            handleError('Please select an image file');
            return;
        }

        setIsUploading(true);
        setPreviewUrl(URL.createObjectURL(file));

        try {
            const imageUrl = await uploadToSupabase(file);
            onUploadComplete?.(imageUrl);
        } catch (error) {
            handleError(error instanceof Error ? error.message : 'Upload failed');
            setPreviewUrl(null);
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

    const resetUploader = () => {
        setPreviewUrl(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className={`w-full max-w-sm ${className}`}>
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
            />

            {previewUrl ? (
                <div className="relative group">
                    <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center space-x-2">
                        <button
                            onClick={triggerFileInput}
                            disabled={isUploading}
                            className="p-2 bg-white dark:bg-gray-800 rounded-full text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            title="Change image"
                        >
                            <i className="fas fa-edit"></i>
                        </button>
                        <button
                            onClick={resetUploader}
                            disabled={isUploading}
                            className="p-2 bg-white dark:bg-gray-800 rounded-full text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            title="Remove image"
                        >
                            <i className="fas fa-trash"></i>
                        </button>
                    </div>
                    {isUploading && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                            <i className="fas fa-spinner fa-spin text-white text-2xl"></i>
                        </div>
                    )}
                </div>
            ) : (
                <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onClick={triggerFileInput}
                    className={`
            border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all
            ${dragOver
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                    }
            ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}
          `}
                >
                    {isUploading ? (
                        <div className="flex flex-col items-center justify-center space-y-3">
                            <i className="fas fa-spinner fa-spin text-2xl text-gray-600 dark:text-gray-400"></i>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Uploading...</p>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center space-y-3">
                            <i className="fas fa-cloud-upload-alt text-3xl text-gray-400 dark:text-gray-500"></i>
                            <div>
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Drop image here or click to upload
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    Supports paste from clipboard
                                </p>
                            </div>
                            <div className="flex space-x-4 text-xs text-gray-500 dark:text-gray-400">
                <span className="flex items-center">
                  <i className="fas fa-mouse-pointer mr-1"></i>
                  Click
                </span>
                                <span className="flex items-center">
                  <i className="fas fa-arrows-alt mr-1"></i>
                  Drag & drop
                </span>
                                <span className="flex items-center">
                  <i className="fas fa-paste mr-1"></i>
                  Paste
                </span>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ImageUploader;