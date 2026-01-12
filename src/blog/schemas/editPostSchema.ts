import { z } from 'zod';
import {ExplicitnessKeys} from "../types/metadata.ts";
import {ReferenceTypeKeys} from "../types/reference.ts";
import {TransformationTypeKeys} from "../types/transformation.ts";
import {WarningLevelKeys} from "../types/warning.ts";
import {RoleKeys} from "../../auth/types/roles.ts";

export const editTagSchema = z.object({
    value: z.string().min(3, { message: "Tag must be at least 3 characters long" }),
});

export const editReferenceSchema = z.object({
    url: z.string().optional(),
    name: z.string().min(3, { message: "Reference name must be at least 3 characters long" }),
    picture_url: z.string().optional(),
    description: z.string().optional(),
    type: z.enum(ReferenceTypeKeys, { message: "Invalid reference type" })
});

export const editTransformationSchema = z.object({
    from_value: z.string().min(1, { message: 'Transformation "From" value is required' }),
    to_value: z.string().min(1, { message: 'Transformation "To" value is required' }),
    type: z.enum(TransformationTypeKeys, { message: "Invalid transformation type" })
});

export const editWarningSchema = z.object({
    text: z.string().min(1, { message: 'Warning text is required' }),
    level: z.enum(WarningLevelKeys, { message: "Invalid warning level" })
});

export const editRelatedSchema = z.object({
    id: z.string().min(1, { message: "Related post ID is required" })
});

export const editRequiredRoles = z.object({
    role_key: z.enum(RoleKeys)
});

export const editPostSchema = z.object({
    slug: z.string().optional(),
    title: z.string().min(1, { message: "Title cannot be empty" }),
    summary: z.string().min(1, { message: "Summary cannot be empty" }),
    tags: z.array(editTagSchema, { message: "Tags are required and must have at least 3 characters" }),
    picture_url: z.string().min(1, { message: "A preview picture is required" }),
    content: z.string().min(1, { message: "Content cannot be empty" }),
    transformations: z.array(editTransformationSchema, { message: "At least one transformation is required" }),
    post_references: z.array(editReferenceSchema, { message: "At least one reference is required" }),
    warnings: z.array(editWarningSchema, { message: "At least one warning is required" }),
    explicitness: z.enum(ExplicitnessKeys, { message: "Invalid explicitness level" }),
    related_posts: z.array(editRelatedSchema, { message: "At least one related post is required" }),
    required_roles: z.array(editRequiredRoles)
});
