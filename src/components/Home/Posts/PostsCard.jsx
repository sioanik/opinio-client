
const PostsCard = ({item}) => {
    // console.log(item);
    return (
        <div className="max-w-2xl px-8 py-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <div className="flex items-center justify-between">
                <span className="text-sm font-light text-gray-600 dark:text-gray-400">{item.post_time}</span>
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
                </p>
            </div>

            <div className="flex items-center justify-between mt-4">
                <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Read more</a>

                <div className="flex items-center">
                    <img className="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block" src={item.author_image} alt="avatar" />
                    <a className="font-bold text-gray-700 dark:text-gray-200 cursor-pointer">{item.author_name}</a>
                </div>
            </div>
        </div>
    );
};

export default PostsCard;