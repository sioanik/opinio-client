import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import { FaThumbsUp, FaThumbsDown, FaShare } from "react-icons/fa";
import Swal from "sweetalert2";

import {
    FacebookShareButton,
    FacebookIcon,
    RedditIcon,
    RedditShareButton,
    TwitterShareButton,
    XIcon,

} from "react-share";
import Comments from "../../components/PostDetails/Comments";
import useAuth from "../../hooks/useAuth";




const PostDetails = () => {
    const { user } = useAuth()
    // console.log(user);

    const { id } = useParams()
    // console.log(id);

    const axiosCommon = useAxiosCommon()

    const {
        data: post = {},
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ['post', id],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/post/${id}`)
            // console.log(data);
            return data
        },
    })

    const handleUpVote = async () => {

        if (!user) {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: `You must login first!`,
                showConfirmButton: false,
                timer: 1500
            });
        }
        else (

            await axiosCommon.put(`/upvote/${id}`)
                .then(res => {
                    // console.log(res.data)
                    if (res.data.modifiedCount > 0) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: `Liked!`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                })
        )
    }


    const handleDownVote = async () => {

        if (!user) {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: `You must login first!`,
                showConfirmButton: false,
                timer: 1500
            });
        } else

            (await axiosCommon.put(`/downvote/${id}`)
                .then(res => {
                    // console.log(res.data)
                    if (res.data.modifiedCount > 0) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: `Disliked!`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                }))
    }
    const shareUrl = `${import.meta.env.VITE_API_URL}/post/${id}`;
    // const shareUrl = `http://github.com`;
    const title = `${post.post_title}`


    return (
        <div className=" mx-auto flex justify-center">
            <div className="max-w-2xl min-w-[350px] md:min-w-[500px] lg:md:min-w-[600px] overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
                <div className="p-6">
                    <div>
                        <span className="text-xs font-medium text-blue-600 uppercase dark:text-blue-400">{post.tag}</span>
                        <p className="block mt-2 text-xl font-semibold text-gray-800 transition-colors duration-300 transform dark:text-white hover:text-gray-600" tabIndex="0">{post.post_title}</p>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{post.post_description}</p>
                    </div>

                    <div className="mt-4">
                        <div className="flex items-center">
                            <div className="flex items-center">
                                <img className="w-12 h-12 object-cover h-10 rounded-full" src={post.author_image} alt="Avatar" />
                                <a href="#" className="mx-2 font-semibold text-gray-700 dark:text-gray-200" tabIndex="0" role="link">{post.author_name}</a>
                            </div>
                            <span className="mx-1 text-xs text-gray-600 dark:text-gray-300">{new Date(post.post_time).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                        </div>
                    </div>
                    <div className="border-2 rounded-xl border-slate-300 bg-slate-100 py-4 flex items-center justify-around mt-10">
                        <div className="flex gap-8">
                            <button onClick={handleUpVote} className="btn  btn-success text-white  btn-sm"><FaThumbsUp /></button>
                            <button onClick={handleDownVote} className="btn text-white btn-error btn-sm"><FaThumbsDown /></button>
                        </div>
                        <div>
                            <div className="flex mt-1 gap-8 items-center justify-between">
                                <div className="">
                                    <FacebookShareButton disabled={!user} url={shareUrl} className="">

                                        <FacebookIcon size={24} round />
                                    </FacebookShareButton>
                                </div>
                                <div className="">
                                    <RedditShareButton
                                        url={shareUrl}
                                        title={title}
                                        windowWidth={660}
                                        windowHeight={460}
                                        disabled={!user}
                                        className=""
                                    >
                                        <RedditIcon size={24} round />
                                    </RedditShareButton>


                                </div>
                                <div className="">
                                    <TwitterShareButton
                                        url={shareUrl}
                                        title={title}
                                        className=""
                                        disabled={!user}
                                    >
                                        <XIcon size={24} round />
                                    </TwitterShareButton>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-10">
                        <Comments id={id} postTitle={post.post_title}></Comments>

                    </div>
                </div>
            </div>
        </div>


    );
};

export default PostDetails;