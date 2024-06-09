import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../../../hooks/useAxiosCommon";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useRole from "../../../../hooks/useRole";
import { Link, useNavigate } from "react-router-dom";
import SectionTitle from "../../../../components/Comments/SectionTitle";

const AddPost = () => {

    const [role] = useRole()
    // console.log(role.status);

    const { user } = useAuth()
    const axiosCommon = useAxiosCommon()

    const axiosSecure = useAxiosSecure()

    const {
        data: tags = [],
    } = useQuery({
        queryKey: ['tags'],
        queryFn: async () => {
            const { data } = await axiosCommon.get('/tags')
            // console.log(data);
            return data
        },
    })

    const {
        data: posts = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ['posts', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure(`/posts/${user?.email}`)
            // console.log(data);
            return data
        },
    })





    // console.log(user.photoURL);

    const author_name = user.displayName
    const author_email = user.email
    const author_image = user.photoURL
    const upvote = 0
    const downvote = 0
    const post_time = new Date();

    const [selectedTag, setSelectedTag] = useState('');

    const handleSelectedTag = (e) => {
        const selectedIndex = e.target.value;
        setSelectedTag(selectedIndex);

        // setTag(e.target.value);
    };

    const tag = selectedTag

    // console.log(selectedTag);

    const handleAddPost = (e) => {
        e.preventDefault()

        const form = e.target
        const post_title = form.post_title.value
        const post_description = form.post_description.value

        // const tag_Field = document.getElementById('tag')
        // const tag = tag_Field.value

        const newPost = { author_name, author_email, author_image, post_title, post_description, tag, upvote, downvote, post_time }
        // console.table(newPost);


        fetch(`${import.meta.env.VITE_API_URL}/posts`, {
            credentials: 'include',
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newPost),
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data.insertedId) {
                    refetch()
                    Swal.fire({
                        title: 'Success!',
                        text: 'Post added successfully',
                        icon: 'success',
                        confirmButtonText: 'Close'
                    })
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Something went wrong!',
                        icon: 'error',
                        confirmButtonText: 'Close'
                    })
                }
            })
    }


    // console.log(tags);
    const fee = 100

    return (
        <div className="">

            <div className="">
                {role.status === 'Bronze' && posts.length >= 5 ?

                    (<div className="flex flex-col items-center justify-center">
                        <SectionTitle
                            title={'Subscribe!'}
                        ></SectionTitle>
                        <Link to={`/dashboard/payment/${fee}`}>
                            {/* <Link to={'/dashboard/cart/'}> */}
                            <button className="my-auto btn btn-neutral">Become a Member</button>
                        </Link>
                    </div>)
                    :

                    <div className="">
                        <SectionTitle
                            title={'Add Post'}
                        ></SectionTitle>
                        <div className="px-10 mx-auto">
                            <form onSubmit={handleAddPost}>
                                <div className="flex gap-10 justify-center mt-4">

                                    <div className="avatar flex justify-center items-center">
                                        <div className="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                            <img src={user.photoURL} />
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            <label className="form-control w-full max-w-xs">
                                                <div className="label">
                                                    <span className="label-text">Author Name</span>
                                                </div>
                                                <input type="text" name="name" placeholder="Author Name" defaultValue={user.displayName} className="input input-bordered w-full max-w-xs" disabled />

                                            </label>
                                        </div>
                                        <div>
                                            <label className="form-control w-full max-w-xs">
                                                <div className="label">
                                                    <span className="label-text">Author Email</span>
                                                </div>
                                                <input type="email" name="useremail" placeholder="User Email" defaultValue={user.email} className="input input-bordered w-full max-w-xs" disabled />

                                            </label>
                                        </div>
                                    </div>

                                </div>
                                <div className="flex justify-center gap-6">
                                    <div>
                                        <label className="form-control w-full max-w-xs">
                                            <div className="label">
                                                <span className="label-text">Post Title</span>
                                            </div>
                                            <input type="text" name="post_title" placeholder="Enter Post Title" className="input input-bordered w-full max-w-xs" />

                                        </label>

                                    </div>
                                    <div>
                                        <label className="form-control w-full max-w-xs">
                                            <div className="label">
                                                <span className="label-text">Tag Name</span>
                                            </div>
                                            <select
                                                value={selectedTag}
                                                id="tag"
                                                onChange={handleSelectedTag}
                                                className="input input-bordered w-full max-w-xs" name="">

                                                {
                                                    tags.map((item, idx) => (
                                                        (<option key={idx} value={item.tag}> {item.tag.charAt(0).toUpperCase() + item.tag.slice(1)}</option>)
                                                    ))
                                                }


                                            </select>

                                        </label>
                                    </div>

                                </div>
                                <div className="flex justify-center">
                                    <label className="form-control w-full max-w-md">
                                        <div className="label">
                                            <span className="label-text">Post Description</span>
                                        </div>
                                        {/* <input type="text" name="description" placeholder="Enter Short Description" className="input input-bordered w-full max-w-md" /> */}
                                        <textarea type="text" name="post_description" placeholder="Enter Post Description" className="input input-bordered w-full max-w-md"></textarea>

                                    </label>
                                </div>




                                <div className="flex justify-center">
                                    <input className="btn  btn-neutral mt-8" type="submit" value="Add Post" />
                                </div>
                            </form>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default AddPost;