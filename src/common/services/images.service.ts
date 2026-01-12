import type {ImageUpload} from "../responses/imageUpload.ts";
import type {ImageUploadDto} from "../dtos/imageUpload.dto.ts";

export async function uploadImage(file: File): Promise<ImageUpload> {

    const formData = new FormData();
    formData.append('key', import.meta.env.VITE_IMGBB_API_KEY!);
    formData.append('image', file);
    formData.append('name', crypto.randomUUID())

    const response = await fetch('https://api.imgbb.com/1/upload', {
        method: 'POST',
        body: formData,
    });

    const dto: ImageUploadDto = await response.json();

    if (!dto.success) {
        throw new Error(`Failed to upload image, status ${response.status}`);
    }

    console.info("Image successfully uploaded", dto);

    return {
        ...dto.data,
        deleteUrl: dto.data.delete_url
    };
}