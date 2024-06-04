import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const MyPosts = () => {

    const { user } = useAuth()

    const axiosSecure = useAxiosSecure()

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


    const handleDeletPost = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete the post!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/posts/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Post has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }


    return (
        <div>
            <div className='w-[90%] mx-auto'>
                <div className='w-[80%] mx-auto mt-10 py-5 mb-5'>
                    <p className='text-center pb-4 text-2xl font-semibold'>My Posts</p>
                    {/* <p className='text-center'>Expand your literary universe by adding a new book to your library's collection</p> */}
                </div>
            </div>
            <div className="">
                {/* table upper part  */}

                <div className="overflow-x-auto">
                    <table className="table md:table-xs">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Post Title</th>
                                <th>Total Votes</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>

                        {
                            posts.map((item, idx) =>
                                //    table body 

                                <tbody key={idx}>
                                    {/* row 1 */}
                                    <tr>

                                        <td>
                                            {item.post_title}
                                        </td>
                                        <td>
                                            {item.upvote + item.downvote}
                                        </td>

                                        <th>
                                            <Link to={`/update-book/${item._id}`}>
                                                <button className="btn btn-neutral my-5 lg:my-0  ">Comment</button>
                                            </Link>
                                        </th>
                                        <th>
                                            <button onClick={() => { handleDeletPost(item._id) }} className="btn btn-neutral my-5 lg:my-0  ">Delete</button>
                                        </th>
                                    </tr>
                                </tbody>


                            )
                        }
                        {/* table lower part  */}

                    </table>
                </div>

            </div>

        </div>
    );
};

export default MyPosts;