import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

const MyPosts = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [count, setCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)

    const {
        data: posts = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ['posts', user?.email, axiosSecure, currentPage, itemsPerPage],
        queryFn: async () => {
            const { data } = await axiosSecure(`/posts/${user?.email}?page=${currentPage}&size=${itemsPerPage}`)
            // console.log(data);
            return data
        },
    })


    useEffect(() => {
        const getCount = async () => {
            const { data } = await axiosSecure(`/my-posts-count?email=${user?.email}`)
            setCount(data.count)
            // console.log(data.count);
        }
        getCount()
    }, [axiosSecure])




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


    const numberOfPages = Math.ceil(count / itemsPerPage)
    const pages = [...Array(numberOfPages).keys()].map(element => element + 1)

    const handlePaginationButton = value => {
        // console.log(value)
        setCurrentPage(value)
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
                    <table className="table table-xs md:table-lg">
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
                                            <Link to={`/dashboard/comments/${item._id}`}>
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
            {/* pagination  */}
            <div className='flex justify-center mt-12'>

                {/* Numbers */}
                {pages.map(btnNum => (
                    <button
                        onClick={() => handlePaginationButton(btnNum)}
                        key={btnNum}
                        className={`hidden ${currentPage === btnNum ? 'bg-blue-500 text-white' : ''
                            } px-4 py-2 mx-1 transition-colors duration-300 transform  rounded-md sm:inline hover:bg-blue-500  hover:text-white`}
                    >
                        {btnNum}
                    </button>
                ))}
            </div>
            <div className="w-full text-gray-500 flex justify-end items-center dark:text-gray-400">
                {count > 0 ? (
                    <span className="mr-2 font-medium text-gray-700 dark:text-gray-100">
                        {currentPage * 10 - 9} - {Math.min(currentPage * 10, count)}
                    </span>
                ) : (
                    <span className="mr-2 font-medium text-gray-700 dark:text-gray-100">
                        0
                    </span>
                )}
                of {count} records
            </div>

        </div>
    );
};

export default MyPosts;