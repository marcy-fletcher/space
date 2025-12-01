import React, { useState } from 'react';
import { Post } from '../types/post';

interface CreatePostFormProps {
    onSubmit: (post: Omit<Post, 'id' | 'createdAt' | 'subscription' | 'reactions' | 'comments'>) => void;
    onCancel: () => void;
    isLoading?: boolean;
}

const CreatePostForm: React.FC<CreatePostFormProps> = ({ onSubmit, onCancel, isLoading = false }) => {
    const [formData, setFormData] = useState({
        title: '',
        tags: [] as string[],
        preview: '',
        previewPicture: '',
        fullContent: '',
        transformations: [] as Array<{ type: string; from: string; to: string }>,
        warnings: [] as Array<{ type: string; level: 'mild' | 'moderate' | 'graphic' | 'extreme' }>,
        references: {
            people: [] as Array<{ name: string; url?: string; description: string; picture?: string }>,
            franchise: [] as Array<{ title: string; url?: string; picture?: string }>
        }
    });

    const [currentTag, setCurrentTag] = useState('');
    const [currentTransformation, setCurrentTransformation] = useState({ type: '', from: '', to: '' });
    const [currentWarning, setCurrentWarning] = useState({ type: '', level: 'mild' as 'mild' | 'moderate' | 'graphic' | 'extreme' });

    const [currentPerson, setCurrentPerson] = useState({ name: '', url: '', description: '', picture: '' });
    const [currentFranchise, setCurrentFranchise] = useState({ title: '', url: '', picture: '' });

    const handleAddTag = () => {
        if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
            setFormData(prev => ({
                ...prev,
                tags: [...prev.tags, currentTag.trim()]
            }));
            setCurrentTag('');
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter(tag => tag !== tagToRemove)
        }));
    };

    const handleAddTransformation = () => {
        if (currentTransformation.type.trim() && currentTransformation.from.trim() && currentTransformation.to.trim()) {
            setFormData(prev => ({
                ...prev,
                transformations: [...prev.transformations, { ...currentTransformation }]
            }));
            setCurrentTransformation({ type: '', from: '', to: '' });
        }
    };

    const handleRemoveTransformation = (index: number) => {
        setFormData(prev => ({
            ...prev,
            transformations: prev.transformations.filter((_, i) => i !== index)
        }));
    };

    const handleAddWarning = () => {
        if (currentWarning.type.trim()) {
            setFormData(prev => ({
                ...prev,
                warnings: [...prev.warnings, { ...currentWarning }]
            }));
            setCurrentWarning({ type: '', level: 'mild' });
        }
    };

    const handleRemoveWarning = (index: number) => {
        setFormData(prev => ({
            ...prev,
            warnings: prev.warnings.filter((_, i) => i !== index)
        }));
    };

    const handleAddPerson = () => {
        if (currentPerson.name.trim() && currentPerson.description.trim()) {
            setFormData(prev => ({
                ...prev,
                references: {
                    ...prev.references,
                    people: [...prev.references.people, {
                        name: currentPerson.name.trim(),
                        url: currentPerson.url.trim() || undefined,
                        description: currentPerson.description.trim(),
                        picture: currentPerson.picture.trim() || undefined
                    }]
                }
            }));
            setCurrentPerson({ name: '', url: '', description: '', picture: '' });
        }
    };

    const handleRemovePerson = (index: number) => {
        setFormData(prev => ({
            ...prev,
            references: {
                ...prev.references,
                people: prev.references.people.filter((_, i) => i !== index)
            }
        }));
    };

    const handleAddFranchise = () => {
        if (currentFranchise.title.trim()) {
            setFormData(prev => ({
                ...prev,
                references: {
                    ...prev.references,
                    franchise: [...prev.references.franchise, {
                        title: currentFranchise.title.trim(),
                        url: currentFranchise.url.trim() || undefined,
                        picture: currentFranchise.picture.trim() || undefined
                    }]
                }
            }));
            setCurrentFranchise({ title: '', url: '', picture: '' });
        }
    };

    const handleRemoveFranchise = (index: number) => {
        setFormData(prev => ({
            ...prev,
            references: {
                ...prev.references,
                franchise: prev.references.franchise.filter((_, i) => i !== index)
            }
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <header className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text
                     bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600
                     dark:text-gray-100 mb-4 font-serif tracking-tight">
                    Create New Story
                </h1>
                <p className="text-lg text-pink-600 dark:text-pink-200 font-light font-sans">
                    Share your story with the world
                </p>
                <div className="mt-4 flex justify-center gap-2">
                    <div className="w-12 h-1 bg-gradient-to-r from-transparent via-pink-400 dark:via-pink-500 to-transparent rounded-full"></div>
                    <div className="w-1 h-1 bg-pink-400 dark:bg-pink-500 rounded-full"></div>
                    <div className="w-12 h-1 bg-gradient-to-r from-transparent via-pink-400 dark:via-pink-500 to-transparent rounded-full"></div>
                </div>
            </header>

            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-6">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Enter story title..."
                    />
                </div>

                <div>
                    <label htmlFor="previewPicture" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Preview Picture URL
                    </label>
                    <input
                        type="url"
                        id="previewPicture"
                        value={formData.previewPicture}
                        onChange={(e) => setFormData(prev => ({ ...prev, previewPicture: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:text-white"
                        placeholder="https://example.com/image.jpg"
                    />
                    {formData.previewPicture && (
                        <div className="mt-2">
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Preview:</p>
                            <div className="relative w-32 h-32 border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden">
                                <img
                                    src={formData.previewPicture}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                    }}
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-700">
                                    <span className="text-xs text-gray-500 dark:text-gray-400">Preview</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Tags
                    </label>
                    <div className="flex gap-2 mb-2">
                        <input
                            type="text"
                            value={currentTag}
                            onChange={(e) => setCurrentTag(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:text-white"
                            placeholder="Add a tag..."
                        />
                        <button
                            type="button"
                            onClick={handleAddTag}
                            className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-md transition-colors duration-200"
                        >
                            Add
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {formData.tags.map((tag, index) => (
                            <span
                                key={index}
                                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-200"
                            >
                {tag}
                                <button
                                    type="button"
                                    onClick={() => handleRemoveTag(tag)}
                                    className="ml-2 hover:text-pink-600 dark:hover:text-pink-400"
                                >
                  ×
                </button>
              </span>
                        ))}
                    </div>
                </div>

                <div>
                    <label htmlFor="preview" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Preview
                    </label>
                    <textarea
                        id="preview"
                        value={formData.preview}
                        onChange={(e) => setFormData(prev => ({ ...prev, preview: e.target.value }))}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Brief preview of your story..."
                    />
                </div>

                <div>
                    <label htmlFor="fullContent" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Full Content
                    </label>
                    <textarea
                        id="fullContent"
                        value={formData.fullContent}
                        onChange={(e) => setFormData(prev => ({ ...prev, fullContent: e.target.value }))}
                        rows={8}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:text-white"
                        placeholder="The full story content..."
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Transformations
                    </label>
                    <div className="space-y-3 mb-3">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                            <input
                                type="text"
                                value={currentTransformation.type}
                                onChange={(e) => setCurrentTransformation(prev => ({ ...prev, type: e.target.value }))}
                                placeholder="Type"
                                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:text-white"
                            />
                            <input
                                type="text"
                                value={currentTransformation.from}
                                onChange={(e) => setCurrentTransformation(prev => ({ ...prev, from: e.target.value }))}
                                placeholder="From"
                                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:text-white"
                            />
                            <input
                                type="text"
                                value={currentTransformation.to}
                                onChange={(e) => setCurrentTransformation(prev => ({ ...prev, to: e.target.value }))}
                                placeholder="To"
                                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:text-white"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={handleAddTransformation}
                            className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-md transition-colors duration-200"
                        >
                            Add Transformation
                        </button>
                    </div>
                    <div className="space-y-2">
                        {formData.transformations.map((trans, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                                <span className="text-sm text-gray-700 dark:text-gray-300">
                                  {trans.type}: {trans.from} → {trans.to}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => handleRemoveTransformation(index)}
                                    className="text-red-500 hover:text-red-700 dark:hover:text-red-400"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Content Warnings
                    </label>
                    <div className="space-y-3 mb-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <input
                                type="text"
                                value={currentWarning.type}
                                onChange={(e) => setCurrentWarning(prev => ({ ...prev, type: e.target.value }))}
                                placeholder="Warning type"
                                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:text-white"
                            />
                            <select
                                value={currentWarning.level}
                                onChange={(e) => setCurrentWarning(prev => ({ ...prev, level: e.target.value as any }))}
                                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:text-white"
                            >
                                <option value="mild">Mild</option>
                                <option value="moderate">Moderate</option>
                                <option value="graphic">Graphic</option>
                                <option value="extreme">Extreme</option>
                            </select>
                        </div>
                        <button
                            type="button"
                            onClick={handleAddWarning}
                            className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md transition-colors duration-200"
                        >
                            Add Warning
                        </button>
                    </div>
                    <div className="space-y-2">
                        {formData.warnings.map((warning, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                                <span className="text-sm text-gray-700 dark:text-gray-300">
                                  {warning.type} ({warning.level})
                                </span>
                                <button
                                    type="button"
                                    onClick={() => handleRemoveWarning(index)}
                                    className="text-red-500 hover:text-red-700 dark:hover:text-red-400"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        People References
                    </label>
                    <div className="space-y-3 mb-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <input
                                type="text"
                                value={currentPerson.name}
                                onChange={(e) => setCurrentPerson(prev => ({ ...prev, name: e.target.value }))}
                                placeholder="Name"
                                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:text-white"
                            />
                            <input
                                type="url"
                                value={currentPerson.url}
                                onChange={(e) => setCurrentPerson(prev => ({ ...prev, url: e.target.value }))}
                                placeholder="URL (optional)"
                                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:text-white"
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <input
                                type="text"
                                value={currentPerson.description}
                                onChange={(e) => setCurrentPerson(prev => ({ ...prev, description: e.target.value }))}
                                placeholder="Description"
                                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:text-white"
                            />
                            <input
                                type="url"
                                value={currentPerson.picture}
                                onChange={(e) => setCurrentPerson(prev => ({ ...prev, picture: e.target.value }))}
                                placeholder="Picture URL (optional)"
                                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:text-white"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={handleAddPerson}
                            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors duration-200"
                        >
                            Add Person
                        </button>
                    </div>
                    <div className="space-y-2">
                        {formData.references.people.map((person, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                                <div>
                                    <span className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {person.name}
                                    </span>
                                    <span className="block text-xs text-gray-500 dark:text-gray-400">
                                        {person.description}
                                    </span>
                                    {person.url && (
                                        <span className="block text-xs text-blue-500 dark:text-blue-400 truncate">
                                            {person.url}
                                        </span>
                                    )}
                                </div>
                                <button
                                    type="button"
                                    onClick={() => handleRemovePerson(index)}
                                    className="text-red-500 hover:text-red-700 dark:hover:text-red-400 ml-4"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Franchise References
                    </label>
                    <div className="space-y-3 mb-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <input
                                type="text"
                                value={currentFranchise.title}
                                onChange={(e) => setCurrentFranchise(prev => ({ ...prev, title: e.target.value }))}
                                placeholder="Title"
                                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:text-white"
                            />
                            <input
                                type="url"
                                value={currentFranchise.url}
                                onChange={(e) => setCurrentFranchise(prev => ({ ...prev, url: e.target.value }))}
                                placeholder="URL (optional)"
                                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:text-white"
                            />
                        </div>
                        <input
                            type="url"
                            value={currentFranchise.picture}
                            onChange={(e) => setCurrentFranchise(prev => ({ ...prev, picture: e.target.value }))}
                            placeholder="Picture URL (optional)"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:text-white"
                        />
                        <button
                            type="button"
                            onClick={handleAddFranchise}
                            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors duration-200"
                        >
                            Add Franchise
                        </button>
                    </div>
                    <div className="space-y-2">
                        {formData.references.franchise.map((franchise, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                                <div>
                                    <span className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {franchise.title}
                                    </span>
                                    {franchise.url && (
                                        <span className="block text-xs text-blue-500 dark:text-blue-400 truncate">
                                            {franchise.url}
                                        </span>
                                    )}
                                </div>
                                <button
                                    type="button"
                                    onClick={() => handleRemoveFranchise(index)}
                                    className="text-red-500 hover:text-red-700 dark:hover:text-red-400 ml-4"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end gap-4 pt-6 border-t border-gray-200 dark:border-gray-600">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-md transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Creating...' : 'Create Story'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreatePostForm;