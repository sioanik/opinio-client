
const Announcements = ({ann}) => {
    return (
        <div>
            {
                ann.map((item, idx) => (
                    <div key={idx}>
                        <div className="max-w-2xl overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
                            <div className="p-6">
                                <div>
                                    <span className="text-xs font-medium text-blue-600 uppercase dark:text-blue-400">Announcement</span>
                                    <p className="block mt-2 text-xl font-semibold text-gray-800 transition-colors duration-300 transform dark:text-white hover:text-gray-600" tabIndex="0">{item.post_title}</p>
                                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{item.post_description}</p>
                                </div>

                                <div className="mt-4">
                                    <div className="flex items-center">
                                        <div className="flex items-center">
                                            <img className="object-cover h-10 rounded-full" src={item.author_image} alt="Avatar" />
                                            <a href="#" className="mx-2 font-semibold text-gray-700 dark:text-gray-200" tabIndex="0" role="link">{item.author_name}</a>
                                        </div>
                                        <span className="mx-1 text-xs text-gray-600 dark:text-gray-300">{new Date(item.post_time).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                ))
            }
        </div>
    );
};

export default Announcements;