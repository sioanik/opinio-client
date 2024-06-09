import useAxiosCommon from "../../../hooks/useAxiosCommon";
import SectionTitle from "../../Comments/SectionTitle";
import PostsCard from "./PostsCard";
import { useEffect, useState } from "react";

const Posts = ({ searchValue, currentPage, setCurrentPage }) => {
    // New try ---------------------------------------
    const axiosCommon = useAxiosCommon()
    const [itemsPerPage, setItemsPerPage] = useState(5)
    const [count, setCount] = useState(0)
    const [posts, setPosts] = useState([])
    // const [currentPage, setCurrentPage] = useState(1)
    const [sort, setSort] = useState(false)
    // console.table(posts);


    useEffect(() => {
        const getData = async () => {
            const { data } = await axiosCommon(
                `/all-posts?page=${currentPage}&size=${itemsPerPage}&sort=${sort}&search=${searchValue}`
            )
            setPosts(data)
        }
        getData()
    }, [axiosCommon, currentPage, itemsPerPage, searchValue, sort])

    useEffect(() => {
        const getCount = async () => {
            const { data } = await axiosCommon(
                `/posts-count?search=${searchValue}`
            )
            setCount(data.count)
            // console.log(data.count);
        }
        getCount()
    }, [axiosCommon, searchValue])

    // old code ------------------------------------

    // const {
    //     data: allposts = [],
    //     isLoading,
    //     refetch,
    // } = useQuery({
    //     queryKey: ['allposts'],
    //     queryFn: async () => {
    //         const { data } = await axiosCommon.get('/allpostsdefault')
    //         // console.log(data);
    //         return data
    //     },
    // })



    // const [sortedPosts, setSortedPosts] = useState([])

    // useEffect(() => {
    //     axiosCommon('/allpostssorted')
    //         .then(res => setSortedPosts(res.data))

    // }, [])

    // console.log(sortedPosts);

    // const [toggleButton, setToggleButton] = useState(false)

    const handleToggleButton = () => {
        setSort(!sort)
    }
    // console.log(sort);
    // old code ------------------------------------


    // New try ---------------------------------------

    const numberOfPages = Math.ceil(count / itemsPerPage)
    const pages = [...Array(numberOfPages).keys()].map(element => element + 1)
    // console.log(pages);

    //  handle pagination button
    const handlePaginationButton = value => {
        // console.log(value)
        setCurrentPage(value)
    }
    return (
        <div className="w-[90%] mx-auto">
            <SectionTitle
                title={'Join the Conversation'}
                description={'Dive into a variety of discussions covering diverse topics. Join the conversation, share your thoughts, and explore different perspectives from our community'}
            ></SectionTitle>

            <div className="flex justify-end">
            <button className="btn w-48 btn-neutral" onClick={handleToggleButton}>
                {!sort ? 'Sort by Popularity' : 'Sort by Date Published'}
            </button>
            </div>

            {/* {!searchValue &&
                <button onClick={handleToggleButton}>
                    Sort by Popularity
                </button>
            } */}
            <div className="flex justify-center">


                <div className="">

                    {posts.map((item, idx) =>
                        <div key={idx}>
                            <PostsCard item={item}></PostsCard>
                        </div>
                    )}

                </div>
                {/* <div>

                    {(searchValue ? searchedPosts : !toggleButton ? allposts : sortedPosts).map((item, idx) =>
                        <div key={idx}>
                            <PostsCard item={item}></PostsCard>
                        </div>
                    )
                    }
                </div> */}

            </div>



            {/* Pagination Section */}
            <div className='flex justify-center mt-12'>
                {/* Previous Button */}
                <button
                    disabled={currentPage === 1}
                    onClick={() => handlePaginationButton(currentPage - 1)}
                    className='px-4 py-2 mx-1 text-gray-700 disabled:text-gray-500 capitalize bg-gray-200 rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-blue-500  hover:text-white'
                >
                    <div className='flex items-center -mx-1'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='w-6 h-6 mx-1 rtl:-scale-x-100'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M7 16l-4-4m0 0l4-4m-4 4h18'
                            />
                        </svg>

                        <span className='mx-1'>previous</span>
                    </div>
                </button>
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
                {/* Next Button */}
                <button
                    disabled={currentPage === numberOfPages}
                    onClick={() => handlePaginationButton(currentPage + 1)}
                    className='px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md hover:bg-blue-500 disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed disabled:text-gray-500'
                >
                    <div className='flex items-center -mx-1'>
                        <span className='mx-1'>Next</span>

                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='w-6 h-6 mx-1 rtl:-scale-x-100'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M17 8l4 4m0 0l-4 4m4-4H3'
                            />
                        </svg>
                    </div>
                </button>
            </div>
        </div>
    );
}
export default Posts