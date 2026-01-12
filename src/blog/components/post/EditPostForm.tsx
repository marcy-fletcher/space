import CompactInputField from "../../../common/components/inputs/CompactInputField.tsx";
import InputArea from "../../../common/components/inputs/InputArea.tsx";
import CompactInputSelect from "../../../common/components/inputs/CompactInputSelect.tsx";
import InputLabel from "../../../common/components/inputs/InputLabel.tsx";
import CompactFoldout from "../../../common/components/CompactFoldout.tsx";
import Divider from "../../../common/components/Divider.tsx";
import InputTags from "../../../common/components/inputs/InputTags.tsx";
import BatchInputImage from "../../../common/components/inputs/BatchInputImage.tsx";
import Header from "../../../common/components/Header.tsx";
import Button from "../../../common/components/Button.tsx";
import {ReferenceTypeKeys} from "../../types/reference.ts";
import {capitalizeWords} from "../../../utils/capitalizeWords.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import Card from "../../../layout/Card.tsx";
import {WarningLevelKeys} from "../../types/warning.ts";
import {useQuery} from "@tanstack/react-query";
import {getPostsIdWithTitle} from "../../services/posts.service.ts";
import {useFieldArray, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {editPostSchema} from "../../schemas/editPostSchema.ts";
import type {CreatePostDto} from "../../dtos/forms/createPostDto.ts";
import type {StringId} from "../../types/id.ts";
import {ExplicitnessKeys} from "../../types/metadata.ts";
import CompactInputImage from "../../../common/components/inputs/CompactInputImage.tsx";
import InputError from "../../../common/components/inputs/InputError.tsx";
import {TransformationTypeKeys} from "../../types/transformation.ts";
import {useEffect} from "react";
import {RoleKeys} from "../../../auth/types/roles.ts";

type EditPostType = Omit<CreatePostDto, 'related_posts'> & {
    related_posts: StringId[]
}

interface EditPostFormProps {
    state?: EditPostType;
    onSubmit?: (data: EditPostType) => Promise<void>;
}

const EditPostForm = ({state, onSubmit}: EditPostFormProps) => {

    const {
        handleSubmit,
        formState: {errors, isValid},
        control,
        register,
        trigger,
        setValue
    } = useForm<EditPostType>({
        resolver: zodResolver(editPostSchema),
        defaultValues: state ?? {
            slug: '',
            title: '',
            summary: '',
            picture_url: '',
            content: '',
            tags: [],
            transformations: [],
            explicitness: 'safe',
            post_references: []
        },
        mode: "onBlur"
    });

    useEffect(() => {
        function setPicture() {
            if (state?.picture_url) {
                setValue('picture_url', state.picture_url);
            }
        }

        setPicture();
    }, [setValue, state?.picture_url]);

    const {data: postsIdentities, isPending: arePostsPending} = useQuery({
        queryKey: ['posts-id-with-title'],
        queryFn: getPostsIdWithTitle
    })

    const {fields: tags, append: appendTag, remove: removeTag} = useFieldArray({
        name: "tags",
        control,
    });

    const {fields: transformations, append: addTransform, remove: removeTransform} = useFieldArray({
        name: "transformations",
        control,
    });

    const {fields: references, append: addReference, remove: removeReference} = useFieldArray({
        name: "post_references",
        control,
    });

    const {fields: warnings, append: addWarning, remove: removeWarning} = useFieldArray({
        name: "warnings",
        control,
    });

    const {fields: relatedPosts, append: addRelatedPost, remove: removeRelatedPost} = useFieldArray({
        name: "related_posts",
        control,
    });

    const {fields: requiredRoles, append: addRequiredRole, remove: removeRequiredRole} = useFieldArray({
        name: "required_roles",
        control,
    });

    const onAddTag = (tag: string) => {
        appendTag({value: tag});
        trigger("tags");
    };

    const onRemoveTag = (index: number) => {
        removeTag(index);
        trigger("tags");
    };

    const {ref:summaryRef, ...summaryRest} = register('summary');
    const {ref:contentRef, ...contentRest} = register('content');

    if (arePostsPending) {
        return <>Loading...</>
    }

    return (
        <form
            className="flex flex-col gap-4"
            noValidate
            onSubmit={handleSubmit(async (data) => await onSubmit?.(data))}
        >
            <Header>
                Main content
            </Header>

            <CompactInputField required id="title" label="Title" type="text" register={register} error={errors.title}/>
            <InputArea required id="summary" label="Summary" type="text" {...summaryRest} ref={summaryRef} register={register}
                       error={errors.summary}/>

            <CompactFoldout title="Required Subscriptions">
                <div className="flex flex-col gap-2">
                    {requiredRoles.map((role, index) => (
                        <Card variant="squared" key={role.id}
                              className="flex flex-col md:flex-row gap-4 p-2 dark:bg-mono-900/30">

                            <CompactInputSelect
                                id={`required_roles.${index}.role_key`} register={register}
                                options={
                                    RoleKeys.map(key => ({
                                        label: capitalizeWords(key),
                                        value: key
                                    }))}
                                placeholder="Type"
                                className="grow"
                            />

                            <Button size="small" shape="square" type="button" variant="link"
                                    className="max-h-13"
                                    onClick={() => removeRequiredRole(index)}>
                                <FontAwesomeIcon icon={faTrash}/>
                            </Button>
                        </Card>
                    ))}
                </div>
                <Button className="max-w-60 mt-3" type="button"
                        size="small" shape="square"
                        variant="outline" onClick={() => addRequiredRole({role_key: 'acolyte'})}>
                    Add warning
                </Button>

            </CompactFoldout>

            <CompactInputSelect
                id={`explicitness`} register={register}
                label="Explicitness"
                options={
                    ExplicitnessKeys.map(key => ({
                        label: capitalizeWords(key),
                        value: key
                    }))}
                placeholder="Type"
            />

            <InputLabel isRequired={true}>
                Preview picture
            </InputLabel>

            <CompactInputImage
                initialImageUrl={state?.picture_url}
                onUploadComplete={(upload) => {
                    setValue("picture_url", upload.thumb.url)
                    trigger("picture_url")
                }}
                onUploadFailed={() => {
                    setValue("picture_url", "")
                    trigger("picture_url")
                }}
                onReset={() => {
                    setValue("picture_url", "")
                    trigger("picture_url")
                }}
            />

            {errors.picture_url?.message &&
                <InputError errorMessage={errors.picture_url?.message}/>}

            <InputArea required id="content" label="Content" ref={contentRef} {...contentRest} error={errors.content}/>

            <CompactFoldout title="Images Uploader">
                <BatchInputImage/>
            </CompactFoldout>

            <Divider/>

            <Header>
                Optional content
            </Header>

            <InputTags
                label="Tags"
                tags={tags.map((field, index) => ({
                    value: field.value,
                    error: errors.tags?.[index]?.value?.message,
                }))}
                onAddTag={onAddTag}
                onRemoveTag={onRemoveTag}
                error={errors.tags?.message}
            />

            <Divider/>

            <CompactFoldout title="Transformations">
                <div className="flex flex-col gap-2">
                    {transformations.map((transformation, index) => (
                        <Card key={transformation.id}
                              className="flex flex-col md:flex-row gap-4 p-2 dark:bg-mono-900/30">

                            <CompactInputField
                                id={`transformations.${index}.from_value`}
                                placeholder="From"
                                register={register}
                                error={errors.transformations?.[index]?.from_value}
                            />
                            <CompactInputField
                                id={`transformations.${index}.to_value`}
                                placeholder="To"
                                register={register}
                                error={errors.transformations?.[index]?.to_value}
                            />

                            <CompactInputSelect
                                id={`transformations.${index}.type`} register={register}
                                options={
                                    TransformationTypeKeys.map(key => ({
                                        label: capitalizeWords(key),
                                        value: key
                                    }))}
                                placeholder="Type"
                                className="grow"
                            />

                            <Button size="small" shape="square" type="button" variant="link"
                                    className="max-h-13"
                                    onClick={() => removeTransform(index)}>
                                <FontAwesomeIcon icon={faTrash}/>
                            </Button>
                        </Card>
                    ))}
                </div>

                <Button className="max-w-60 mt-3" type="button"
                        size="small" shape="square"
                        variant="outline"
                        onClick={() => addTransform({from_value: '', to_value: '', type: 'gender'})}>
                    Add transformation
                </Button>

            </CompactFoldout>

            <CompactFoldout title="References">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {references.map((reference, index) => (
                        <Card key={reference.id}
                              className="flex flex-col gap-4 p-4 dark:bg-mono-900/30">

                            <CompactInputField
                                id={`post_references.${index}.name`}
                                placeholder="Name"
                                register={register}
                                error={errors.post_references?.[index]?.name}
                            />

                            <CompactInputSelect
                                id={`post_references.${index}.type`} register={register}
                                options={
                                    ReferenceTypeKeys.map(key => ({
                                        label: capitalizeWords(key),
                                        value: key
                                    }))}
                                placeholder="Type"
                            />

                            <Divider/>

                            <CompactInputField
                                id={`post_references.${index}.url`}
                                placeholder="URL"
                                register={register}
                                error={errors.post_references?.[index]?.url}
                            />

                            <CompactInputField
                                id={`post_references.${index}.picture_url`}
                                placeholder="Picture URL"
                                register={register}
                                error={errors.post_references?.[index]?.picture_url}
                            />

                            <CompactInputField
                                id={`post_references.${index}.description`}
                                placeholder="Description"
                                register={register}
                                error={errors.post_references?.[index]?.description}
                            />

                            <Button size="small" shape="square" type="button" variant="link"
                                    className="max-h-13"
                                    onClick={() => removeReference(index)}>
                                <FontAwesomeIcon icon={faTrash}/>
                            </Button>
                        </Card>
                    ))}

                </div>
                <Button className="max-w-40 mt-3" size="small" shape="square" type="button"
                        variant="outline" onClick={() => addReference({
                    name: '',
                    url: '',
                    description: '',
                    picture_url: '',
                    type: 'person'
                })}
                >
                    Add reference
                </Button>
            </CompactFoldout>

            <CompactFoldout title="Warnings">
                <div className="flex flex-col gap-2">
                    {warnings.map((warning, index) => (
                        <Card variant="squared" key={warning.id}
                              className="flex flex-col md:flex-row gap-4 p-2 dark:bg-mono-900/30">

                            <CompactInputField
                                id={`warnings.${index}.text`}
                                placeholder="Text"
                                register={register}
                                error={errors.warnings?.[index]?.text}
                            />

                            <CompactInputSelect
                                id={`warnings.${index}.level`} register={register}
                                options={
                                    WarningLevelKeys.map(key => ({
                                        label: capitalizeWords(key),
                                        value: key
                                    }))}
                                placeholder="Type"
                                className="grow"
                            />

                            <Button size="small" shape="square" type="button" variant="link"
                                    className="max-h-13"
                                    onClick={() => removeWarning(index)}>
                                <FontAwesomeIcon icon={faTrash}/>
                            </Button>
                        </Card>
                    ))}
                </div>
                <Button className="max-w-60 mt-3" type="button"
                        size="small" shape="square"
                        variant="outline" onClick={() => addWarning({
                    text: '',
                    level: 'mild'
                })}>
                    Add warning
                </Button>

            </CompactFoldout>

            {postsIdentities && postsIdentities.length > 0 &&
                <CompactFoldout title="Related posts">
                    <div className="flex flex-col gap-2">
                        {relatedPosts.map((post, index) => (
                            <Card variant="squared" key={post.id}
                                  className="flex flex-col md:flex-row gap-4 p-2 dark:bg-mono-900/30">

                                <CompactInputSelect
                                    id={`related_posts.${index}.id`} register={register}
                                    options={
                                        postsIdentities.map(x => (
                                            {
                                                value: x.id.toString(),
                                                label: x.title
                                            }
                                        ))
                                    }
                                    placeholder="Type"
                                    className="grow"
                                />

                                <Button size="small" shape="square" type="button" variant="link"
                                        className="max-h-13"
                                        onClick={() => removeRelatedPost(index)}>
                                    <FontAwesomeIcon icon={faTrash}/>
                                </Button>
                            </Card>
                        ))}

                    </div>

                    <Button className="max-w-60 mt-3" type="button"
                            variant="outline"
                            size="small" shape="square"
                            onClick={() => addRelatedPost({id: postsIdentities[0].id.toString()})}>
                        Add related post
                    </Button>

                </CompactFoldout>}

            <div className="flex grow justify-center items-center">
                <Button disabled={!isValid} variant="submit" type="submit" className="max-w-md grow">Submit</Button>
            </div>
        </form>
    );
};

export default EditPostForm;