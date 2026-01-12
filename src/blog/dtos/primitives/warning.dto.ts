import type {WarningLevel} from "../../types/warning.ts";

export interface WarningDto {
    id: number;
    post_id: number;
    level: WarningLevel;
    text: string;
}