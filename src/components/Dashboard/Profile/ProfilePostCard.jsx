
const ProfilePostCard = ({item}) => {
    return (
        <div className="">
            <div className="my-6 w-full px-8 py-4 bg-slate-100 rounded-lg shadow-md dark:bg-gray-800">
                <div className="flex flex-row-reverse items-center justify-between">
                    <span className="text-sm font-light text-gray-600 dark:text-gray-400">{new Date(item.post_time).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    <p className="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-300 transform bg-gray-600 rounded hover:bg-gray-500">
                        #{item.tag}
                    </p>
                </div>

                <div className="mt-2">
                    <a href="#" className="text-xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline">
                        {item.post_title}
                    </a>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">
                        {item.post_description}
                        {/* .substring(0, 60)}... */}

                    </p>
                </div>

                <div className="flex flex-row-reverse items-center justify-between mt-4">
                    {/* <Link to={`/post/${item._id}`}><button className="btn btn-info">View Post</button></Link> */}
                    {/* <div className=" flex justify-around items-center gap-5">
                        <p>{item.upvote + item.upvote} Votes</p>
                        <p>{commentsCount.length} Comments</p>
                    </div> */}

                    <div className="flex items-center">
                        <img className="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block" src={item.author_image} alt="avatar" />
                        <a className="font-bold text-gray-700 dark:text-gray-200 cursor-pointer">{item.author_name}</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePostCard;