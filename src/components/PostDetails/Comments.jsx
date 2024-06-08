import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import useAxiosCommon from "../../hooks/useAxiosCommon";

const Comments = ({id, postTitle}) => {

    const axiosCommon = useAxiosCommon();
    const { user } = useAuth()

    const {
        register,
        handleSubmit, reset,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {

       
        // console.log(commentInfo);
        

        if (!user) {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: `You must login first!`,
                showConfirmButton: false,
                timer: 1500
            })
        }
        else

        {
            const commentInfo = {
                post_id: id,
                post_title: postTitle,
                email: user?.email,
                comment: data.comment,
            }
           await axiosCommon.post('/postComments', commentInfo)
            .then(res => {
                if (res.data.insertedId) {
                    console.log('comment added to the database')
                    reset();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Comment posted!`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                    // navigate('/');
                }
            })
            .catch(error=>{
                console.log(error);
            })
        }

    }


    // const handleCommentSubmit = (e) =>{
    //     e.preventDefault()
    //     if (!user) {
    //         Swal.fire({
    //             position: "top-end",
    //             icon: "error",
    //             title: `You must login first!`,
    //             showConfirmButton: false,
    //             timer: 1500
    //         });
    //     } 
    //     else

    //         (
    //         )
    // }

    return (
        <div>
            <div className="mt-6 ml-10 ">
                <label htmlFor="Description" className=" block text-sm text-gray-500 dark:text-gray-300"></label>

                <form
                    // onSubmit={handleCommentSubmit}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <textarea
                        {...register("comment", { required: true })}
                        placeholder="Write your Comment"
                        className="block mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-4 h-32 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300">

                    </textarea>
                    {errors.comment && <span>Can't post an empty comment!</span>}
                    <div className="mt-4 flex justify-end">
                        <button className="btn btn-neutral">Post Comment</button>
                    </div>
                </form>
            </div>

        </div>
    );
};

export default Comments;