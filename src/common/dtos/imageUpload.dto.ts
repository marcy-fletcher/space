import type {Image} from "../responses/imageUpload.ts";

export interface ImageUploadDto {
    data: {
        id: string;
        title: string;
        url_viewer: string;
        url: string;
        display_url: string;
        width: string;
        height: string;
        size: string;
        time: string;
        expiration: string;
        image: Image;
        thumb: Image;
        medium: Image;
        delete_url: string;
    };
    success: boolean;
    status: number;
}
