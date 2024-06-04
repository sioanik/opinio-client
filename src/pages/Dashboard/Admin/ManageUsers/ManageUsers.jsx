import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../../components/Shared/LoadingSpinner";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageUsers = () => {

    const axiosSecure = useAxiosSecure()
    const {
        data: users = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const { data } = await axiosSecure(`/users`)
            return data
        },
    })

    const handleMakeAdmin = user =>{
        console.log(user._id);

        axiosSecure.patch(`/users/admin/${user._id}`)
        .then(res =>{
            console.log(res.data)
            if(res.data.modifiedCount > 0){
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

    console.log(users)
    if (isLoading) return <LoadingSpinner></LoadingSpinner>

    return (
        <div>
            <div>
                <div className="">
                    {/* table upper part  */}

                    <div className="overflow-x-auto">
                        <table className="table md:table-xs">
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
                                                    <button onClick={()=>{handleMakeAdmin(user)}} className="btn btn-neutral my-5 lg:my-0  ">Make Admin</button>}
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
        </div>
    );
};

export default ManageUsers;