import type {TransformationType} from "../../types/transformation.ts";

export interface TransformationDto {
    id: number;
    post_id: number;
    type: TransformationType;
    from_value: string;
    to_value: string;
}