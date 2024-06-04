import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ReportedComments = () => {

    const { user } = useAuth()

    const axiosSecure = useAxiosSecure()

    const {
        data: comments = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ['posts', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure('/comments')
            // console.log(data);
            return data
        },
    })


    const warnUser = email =>{
        // console.log(user._id);

        axiosSecure.patch(`/users/give-warning/${email}`)
        .then(res =>{
            console.log(res.data)
            if(res.data.modifiedCount > 0){
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `Warning posted to user's profile`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
            else{
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


    const removeWarning = email =>{
        // console.log(user._id);

        axiosSecure.patch(`/users/remove-warning/${email}`)
        .then(res =>{
            console.log(res.data)
            if(res.data.modifiedCount > 0){
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `Warning removed from user's profile`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
            else{
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



    return (
        <div>
            <div>
            <div className='w-[90%] mx-auto'>
                <div className='w-[80%] mx-auto mt-10 py-5 mb-5'>
                    <p className='text-center pb-4 text-2xl font-semibold'>Reported Comments/Activities</p>
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
                                             className="btn btn-error my-5 lg:my-0  ">Warn User!</button>
                                        </th>
                                        <th>
                                            <button 
                                            onClick={() => { removeWarning(item.email) }}
                                             className="btn btn-success my-5 lg:my-0  ">Remove Warning</button>
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

export default ReportedComments;