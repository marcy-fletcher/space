export interface Image {
    filename?: string;
    name?: string;
    mime?: string;
    extension?: string;
    url: string;
}

export interface ImageUpload {
    id?: string;
    url?: string;

    deleteUrl?: string;

    image?: Image;
    thumb: Image;
    medium?: Image;
}