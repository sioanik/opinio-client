import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";
import SectionTitle from "../../../../components/Comments/SectionTitle";
const MakeAnnouncement = () => {
    const { user } = useAuth()
    // console.log(user.photoURL);

    const author_name = user.displayName
    const author_email = user.email
    const author_image = user.photoURL
    const post_time = new Date()

    const handleAddPost = (e) => {
        e.preventDefault()

        const form = e.target
        const post_title = form.post_title.value
        const post_description = form.post_description.value


        const newPost = { author_name, author_email, author_image, post_title, post_description, post_time }
        // console.log(newPost);


        fetch(`${import.meta.env.VITE_API_URL}/announcements`, {
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
                    Swal.fire({
                        title: 'Success!',
                        text: 'Announcement added successfully',
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




    return (
        <div className="">
            <SectionTitle
                    title={'Make Announcements'}
                ></SectionTitle>
            <div>
                <div>
                    <div className=''>
                    </div>
                    <div className="mt-10 px-10 mx-auto">
                        <form onSubmit={handleAddPost}>
                            <div className="flex gap-10 justify-center items-center my-6">

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
                                   
                                </div>

                            </div>
                            <div className="flex flex-col justify-center gap-6">
                                <div>
                                    <label className="form-control w-full max-w-xs">
                                        <div className="label">
                                            <span className="label-text">Title</span>
                                        </div>
                                        <input type="text" name="post_title" placeholder="Enter Announcement Title" className="input input-bordered w-full" />

                                    </label>

                                </div>
                                <div className="flex justify-center">
                                <label className="form-control w-full max-w-md">
                                    <div className="label">
                                        <span className="label-text">Description</span>
                                    </div>
                                    {/* <input type="text" name="description" placeholder="Enter Short Description" className="input input-bordered w-full max-w-md" /> */}
                                    <textarea type="text" name="post_description" placeholder="Enter Announcement Description" className="input input-bordered w-full max-w-md"></textarea>

                                </label>
                            </div>
                                
                            </div>
                            




                            <div className="flex justify-center">
                                <input className="btn  btn-neutral mt-8" type="submit" value="Add Announcement" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MakeAnnouncement;