import { useForm } from "react-hook-form";
import LoadingSpinner from "../../../../components/Shared/LoadingSpinner";
import useAuth from "../../../../hooks/useAuth";
import useRole from "../../../../hooks/useRole";
import { LuBadgeInfo } from "react-icons/lu";
import useAxiosCommon from "../../../../hooks/useAxiosCommon";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

import { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import Chart from "../../../../components/Dashboard/AdminHome/Chart";
import Chart2 from "../../../../components/Dashboard/AdminHome/Chart2";
import SectionTitle from "../../../../components/Comments/SectionTitle";


const AdminHome = () => {
    const { user, loading } = useAuth()
    const [role, isLoading] = useRole()
    const axiosCommon = useAxiosCommon()
    const axiosSecure = useAxiosSecure()


    const {
        register,
        handleSubmit, reset,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        const tag = data.addtag
        // console.log(tag);

        const newTag = {
            tag,
        }

        axiosSecure.post('/add-tags', newTag)
            .then(res => {
                if (res.data.insertedId) {
                    // console.log('tag added to the database')
                    reset();
                    Swal.fire({
                        title: 'Success!',
                        text: 'Tag added successfully',
                        icon: 'success',
                        confirmButtonText: 'Close'
                    })
                }
            })
    }

    const {
        data: users = [],
    } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const { data } = await axiosSecure(`/users`)
            return data
        },
    })


    const {
        data: allPosts = [],
    } = useQuery({
        queryKey: ['all-posts'],
        queryFn: async () => {
            const { data } = await axiosCommon(`/all-posts-count`)
            return data
        },
    })
    const {
        data: allComments = [],
    } = useQuery({
        queryKey: ['all-comments'],
        queryFn: async () => {
            const { data } = await axiosCommon(`/all-comments`)
            return data
        },
    })

    // console.log(allComments);
    return (
        <div className="w-[90%] mx-auto">
            <SectionTitle
                title={'Admin Dashboard'}
            ></SectionTitle>
            <div className="flex gap-2 md:gap-10">
                {/* Profile  */}
                <div className="w-1/2">
                    <div className="w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
                        <img
                            className="object-cover object-center w-full h-56"
                            src={user.photoURL}
                            alt="avatar"
                        />
                        <div className="flex justify-center items-center px-6 py-3 bg-gray-900">
                            <p className="text-white text-xl"><LuBadgeInfo /></p>
                            <h1 className="mx-3 text-lg font-semibold text-white">{role.status}</h1>
                        </div>

                        {
                            !!role.warning &&
                            <div className="border-red-700 p-4 my-2 rounded-xl  border-2 bg-red-500">
                                <h1 className="text-center text-xl text-white font-semibold text-gray-800 dark:text-white">
                                    {role.warning}
                                </h1>
                            </div>
                            // :
                            // <div>
                            //     <p>No strikes found!</p>
                            // </div>

                        }

                        <div className="px-6 py-2">

                            <h1 className="text-xl text-center font-semibold text-gray-800 dark:text-white">
                                {user.displayName} <span>({role.role})</span>
                            </h1>

                            <p className="text-center text-xs py-2 text-gray-700 dark:text-gray-400">
                                ID <span className="break-all"> {user.uid}</span>
                            </p>
                            <p className="py-2 text-center text-xs md:text-base text-gray-700 dark:text-gray-400">
                                {user.email}
                            </p>
                            {/* <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                        <svg
                            aria-label="suitcase icon"
                            className="w-6 h-6 fill-current"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M14 11H10V13H14V11Z" />
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M7 5V4C7 2.89545 7.89539 2 9 2H15C16.1046 2 17 2.89545 17 4V5H20C21.6569 5 23 6.34314 23 8V18C23 19.6569 21.6569 21 20 21H4C2.34314 21 1 19.6569 1 18V8C1 6.34314 2.34314 5 4 5H7ZM9 4H15V5H9V4ZM4 7C3.44775 7 3 7.44769 3 8V14H21V8C21 7.44769 20.5522 7 20 7H4ZM3 18V16H21V18C21 18.5523 20.5522 19 20 19H4C3.44775 19 3 18.5523 3 18Z"
                            />
                        </svg>
                        <h1 className="px-2 text-sm">Meraki UI</h1>
                    </div> */}

                        </div>
                    </div>
                </div>
                {/* add tag section  */}
                <div>
                    <div className="w-full h-full max-w-sm overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
                        <div><p className="bg-info p-1 mb-4 text-center font-bold">Add New Tags</p></div>
                        <form onSubmit={handleSubmit(onSubmit)}>

                            <div className="mt-10">
                                <label className="block mb-2 font-medium text-gray-600 dark:text-gray-200" htmlFor="">Tag</label>
                                <input {...register("addtag", { required: true })} name="addtag" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" placeholder="Write tag" type="text" />
                                {errors.addtag && <span>This field is required</span>}
                            </div>

                            <div className="flex justify-center">
                                <input className="btn  btn-neutral my-10" type="submit" value="Add Tag" />
                            </div>
                        </form>
                    </div>
                    {/* <div>
                    <div><p className="bg-info p-1 mt-3 text-center font-bold">Chart</p></div>
                    <div className="flex items-center justify-center">
                    <Chart users={users} allPosts={allPosts} allComments={allComments}></Chart>
                    </div>
                </div> */}
                </div>
            </div>
            <div className="my-10 flex gap-3">
                <div className="bg-green-300 py-4 flex flex-col items-center justify-center rounded-lg w-1/3">
                    <p className="text-center font-bold text-2xl">Total <br /> Users</p>
                    <p className="text-center text-2xl pt-5">{users.length}</p>
                </div>
                <div className="bg-lime-300 py-4 flex flex-col items-center justify-center rounded-lg w-1/3">
                    <p className="text-center font-bold text-2xl">Total <br /> Posts</p>
                    <p className="text-center text-2xl pt-5">{allPosts.length}</p>
                </div>
                <div className="bg-amber-300 py-4 flex flex-col items-center justify-center rounded-lg w-1/3">
                    <p className="text-center font-bold text-2xl">Total <br /> Comments</p>
                    <p className="text-center text-2xl pt-5">{allComments.length}</p>
                </div>
            </div>
            <div>
                {/* <div><p className="bg-info p-1 mt-3 text-center font-bold">Chart</p></div> */}
                <div className="mt-20 flex items-center justify-center">
                    <div className="border-2 rounded-lg">
                        <p className="text-center">Chart</p>
                        <Chart users={users} allPosts={allPosts} allComments={allComments}></Chart>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;