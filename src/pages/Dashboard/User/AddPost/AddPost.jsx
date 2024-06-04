import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";

const AddPost = () => {

    const { user } = useAuth()
    // console.log(user.photoURL);

    const author_name = user.displayName
    const author_email = user.email
    const author_image = user.photoURL
    const upvote = 0
    const downvote = 0

    const handleAddPost = (e) => {
        e.preventDefault()

        const form = e.target
        const post_title = form.post_title.value
        const post_description = form.post_description.value

        const tag_Field = document.getElementById('tag')
        const tag = tag_Field.value

        const newPost = { author_name, author_email, author_image, post_title, post_description, tag, upvote, downvote }
        console.log(newPost);


        fetch(`${import.meta.env.VITE_API_URL}/posts`, {
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
                        text: 'Post added successfully',
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
        <div>
            <div>
                <div className='w-[90%] mx-auto'>
                    <div className='w-[80%] mx-auto mt-10 py-5 mb-5'>
                        <p className='text-center pb-4 text-2xl font-semibold'>Add Post</p>
                        {/* <p className='text-center'>Expand your literary universe by adding a new book to your library's collection</p> */}
                    </div>
                </div>
                <div className="mt-10 px-10 mx-auto">
                    <form onSubmit={handleAddPost}>
                        <div className="flex gap-10 justify-center mt-4">

                            <div className="avatar flex justify-center items-center">
                                <div className="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <img src={user.photoURL} />
                                </div>
                            </div>
                            <div>
                                <div>
                                    <label className="form-control w-full max-w-xs">
                                        <div className="label">
                                            <span className="label-text">User Name</span>
                                        </div>
                                        <input type="text" name="name" placeholder="Author Name" defaultValue={user.displayName} className="input input-bordered w-full max-w-xs" disabled />

                                    </label>
                                </div>
                                <div>
                                    <label className="form-control w-full max-w-xs">
                                        <div className="label">
                                            <span className="label-text">User Email</span>
                                        </div>
                                        <input type="email" name="useremail" placeholder="User Email" defaultValue={user.email} className="input input-bordered w-full max-w-xs" disabled />

                                    </label>
                                </div>
                            </div>

                        </div>
                        <div className="flex justify-center gap-6">
                            <div>
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">Post Title</span>
                                    </div>
                                    <input type="text" name="post_title" placeholder="Enter Post Title" className="input input-bordered w-full max-w-xs" />

                                </label>

                            </div>
                            <div>
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">Tag Name</span>
                                    </div>
                                    <select className="input input-bordered w-full max-w-xs" name="" id="tag">
                                        <option value="">Select</option>

                                        <option value="destination">Destination</option>

                                        <option value="experience">Experience</option>

                                        <option value="budget">Budget</option>

                                        <option value="hotel">Hotel</option>

                                        <option value="transport">Transport</option>

                                    </select>

                                </label>
                            </div>

                        </div>
                        <div className="flex justify-center">
                            <label className="form-control w-full max-w-md">
                                <div className="label">
                                    <span className="label-text">Post Description</span>
                                </div>
                                {/* <input type="text" name="description" placeholder="Enter Short Description" className="input input-bordered w-full max-w-md" /> */}
                                <textarea type="text" name="post_description" placeholder="Enter Post Description" className="input input-bordered w-full max-w-md"></textarea>

                            </label>
                        </div>




                        <div className="flex justify-center">
                            <input className="btn  btn-neutral mt-8" type="submit" value="Add Book" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddPost;