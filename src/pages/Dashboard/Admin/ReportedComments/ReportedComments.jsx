import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import SectionTitle from "../../../../components/Comments/SectionTitle";
import { useEffect, useState } from "react";
import useAxiosCommon from "../../../../hooks/useAxiosCommon";

const ReportedComments = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const axiosCommon = useAxiosCommon()


    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [count, setCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    // console.log(itemsPerPage, count, currentPage);

    const {
        data: comments = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ['comments', user?.email, axiosSecure, currentPage, itemsPerPage],
        queryFn: async () => {
            const { data } = await axiosSecure(`/comments?page=${currentPage}&size=${itemsPerPage}`)
            console.log(data);
            return data
        },
    })

    useEffect(() => {
        const getCount = async () => {
            const { data } = await axiosCommon(`/comments-count`)
            setCount(data.count)
            // console.log(data.count);
        }
        getCount()
    }, [axiosCommon])




    const warnUser = email => {
        // console.log(user._id);

        axiosSecure.patch(`/users/give-warning/${email}`)
            .then(res => {
                // console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Warning posted to user's profile`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                else {
                    Swal.fire({
                        position: "top-end",
                        icon: "error",
                        title: `Already warned the user!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }


    const removeWarning = email => {
        // console.log(user._id);

        axiosSecure.patch(`/users/remove-warning/${email}`)
            .then(res => {
                // console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Warning removed from user's profile`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                else {
                    Swal.fire({
                        position: "top-end",
                        icon: "error",
                        title: `No warning found`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }

            })
    }



    const numberOfPages = Math.ceil(count / itemsPerPage)
    const pages = [...Array(numberOfPages).keys()].map(element => element + 1)

    const handlePaginationButton = value => {
        // console.log(value)
        setCurrentPage(value)
    }

    return (
        <div className='w-[90%] mx-auto'>
            <div>
                <div className='w-[90%] mx-auto'>
                    <SectionTitle
                        title={'Reported Comments/Activities'}
                    ></SectionTitle>
                </div>
                <div className="">
                    {/* table upper part  */}

                    <div className="overflow-x-auto">
                        <table className="table table-xs md:table-xs">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>Post Title</th>
                                    <th>Comment</th>
                                    <th>Users Email</th>
                                    <th>Feedback</th>
                                    <th></th>
                                </tr>
                            </thead>

                            {
                                comments.map((item, idx) =>
                                    //    table body 

                                    <tbody key={idx}>
                                        {/* row 1 */}
                                        <tr>

                                            <td>
                                                {item.post_title}
                                            </td>
                                            <td>
                                                {item.comment.substring(0, 20)}...
                                            </td>
                                            <td>
                                                {item.email}
                                            </td>
                                            <td className="text-red-500 font-semibold">
                                                {item.feedback}
                                            </td>


                                            {/* <th>
                                            <Link to={`/comments/${item._id}`}>
                                                <button className="btn btn-neutral my-5 lg:my-0  ">Comment</button>
                                            </Link>
                                        </th> */}
                                            <th>
                                                <button
                                                    onClick={() => { warnUser(item.email) }}
                                                    className="btn btn-sm md:btn-lg btn-error my-5 lg:my-0  ">Warn User!</button>
                                            </th>
                                            <th>
                                                <button
                                                    onClick={() => { removeWarning(item.email) }}
                                                    className="btn btn-sm md:btn-lg btn-success my-5 lg:my-0  ">Remove Warning</button>
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

export default ReportedComments;