import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "./Index";
// import appwriteService from "../../appwrite/config";
import service from "../appwrite/conf";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });
        const cancel=()=>{
            navigate('/')
        }
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        console.log('post',post);
        console.log(userData);
        if (post) {
            const file = data.image[0] ? await service.uploadFile(data.image[0]) : null;

            if (file) {
                service.deleteFile(post.featureimage);
            }

            const dbPost = await service.updatePost(post.$id, {
                ...data,
                featureimage: file ? file.$id : undefined,
            });

            if (dbPost) {
                // navigate(`/post/${dbPost.$id}`);
                navigate('/all-posts')
            }
        } else {
            console.log('hnjcj',userData);
            const file = await service.uploadFile(data.image[0]);
                console.log(data);
            if (file) {
                const fileId = file.$id;
                data.featureimage = fileId;
                const dbPost = await service.createPost({ title:data.title, slug:data.slug,content:data.content,featureimage:data.featureimage,status:data.status,userid:userData.$id });

                // if (dbPost) {
                    navigate('/all-posts')
                    // navigate(`/post/${dbPost.$id}`);
                // }
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        
        <form onSubmit={handleSubmit(submit)} className="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl rounded-xl bg-zinc-100">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none "
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")}  />
            </div>
            <div className="">
            <svg class="mr-5 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-8 mt-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                /></svg>
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={service.getFilePreview(post.featureimage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <div className="buttons flex justify-center">
                    
                <button className="px-4 py-2 rounded btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-black ml-2 bg-white hover:bg-zinc-300 hover:rounded-lg">Cancel</button>
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500 hover:bg-indigo-900 hover:rounded-lg">
                    {post ? "Update" : "Submit"}
                </Button>
                </div>
            </div>
        </form>
    );
}