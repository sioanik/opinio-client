import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../../components/Shared/LoadingSpinner";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import SectionTitle from "../../../../components/Comments/SectionTitle";
import { useEffect, useState } from "react";
import useAxiosCommon from "../../../../hooks/useAxiosCommon";

const ManageUsers = () => {

    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [count, setCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    // console.log(itemsPerPage, count, currentPage);
    const axiosCommon = useAxiosCommon()
    const axiosSecure = useAxiosSecure()
    const {
        data: users = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ['users', axiosSecure, currentPage, itemsPerPage],
        queryFn: async () => {
            const { data } = await axiosSecure(`/users?page=${currentPage}&size=${itemsPerPage}`)
            return data
        },
    })

    useEffect(() => {
        const getCount = async () => {
            const { data } = await axiosCommon(`/users-count`)
            setCount(data.count)
            // console.log(data.count);
        }
        getCount()
    }, [axiosCommon])


    const handleMakeAdmin = user => {
        // console.log(user._id);

        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                // console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is an Admin Now!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    // console.log(users)
    if (isLoading) return <LoadingSpinner></LoadingSpinner>

    const numberOfPages = Math.ceil(count / itemsPerPage)
    const pages = [...Array(numberOfPages).keys()].map(element => element + 1)

    const handlePaginationButton = value => {
        // console.log(value)
        setCurrentPage(value)
    }

    return (
        <div>
            <div>
                <SectionTitle
                    title={'Manage Users'}
                ></SectionTitle>
                <div className="">
                    {/* table upper part  */}

                    <div className="overflow-x-auto">
                        <table className="table table-xs md:table-lg">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Membership</th>
                                    <th></th>
                                </tr>
                            </thead>

                            {
                                users.map((user, idx) =>
                                    //    table body 

                                    <tbody key={idx}>
                                        {/* row 1 */}
                                        <tr>

                                            <td>
                                                {user?.name}
                                            </td>
                                            <td>{user?.email}</td>
                                            <td>{user?.status}</td>

                                            <th>
                                                {user.role === 'Admin' ? 'Admin' :
                                                    <button onClick={() => { handleMakeAdmin(user) }} className="btn btn-neutral my-5 lg:my-0  ">Make Admin</button>}
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
                <span className=" mr-2 font-medium text-gray-700 dark:text-gray-100">{currentPage * 10 - 9} - {Math.min(currentPage * 10, count)}</span> of {count} records
            </div>
        </div>
    );
};

export default ManageUsers;