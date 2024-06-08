import { useEffect, useState } from "react";
import Banner from "../../components/Home/Banner/Banner";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Posts from "../../components/Home/Posts/Posts";
import Tags from "../../components/Home/Tags/Tags";
import Announcements from "../../components/Home/Announcements/Announcements";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import { useQuery } from "@tanstack/react-query";
import useAnnouncements from "../../hooks/useAnnouncements";


const Home = () => {

    const [searchValue, setSearchValue] = useState('')
    const [currentPage, setCurrentPage] = useState(1)

    const [posts, setPosts] = useState([])

    const axiosCommon = useAxiosCommon()

    useEffect(() => {
        axiosCommon(`/tag-posts?search=${searchValue}`)
            .then(res => setPosts(res.data))

    }, [searchValue])

    // console.log(posts);


    const handleSearchValue = (searchValue) =>{
        setSearchValue(searchValue)
    }

    const handleTagClicked = (tagClicked) =>{
        setSearchValue(tagClicked)
    }

   
    // announcements 
    // const axiosCommon = useAxiosCommon()

    // const {
    //     data: ann = [],
    //     isLoading,
    //     refetch,
    // } = useQuery({
    //     queryKey: ['announcements'],
    //     queryFn: async () => {
    //         const { data } = await axiosCommon.get('/announcements')
    //         // console.log(data);
    //         return data
    //     },
    // })

    const [ann] = useAnnouncements()

console.log(ann.length);

    return (
        <div>
            <Banner setCurrentPage={setCurrentPage} searchValue={handleSearchValue}></Banner>
            <Tags setCurrentPage={setCurrentPage} tagClicked={handleTagClicked}></Tags>
            <Posts currentPage={currentPage} setCurrentPage={setCurrentPage} searchValue={searchValue} searchedPosts={posts}></Posts>
            { ann.length > 0 &&
                <Announcements ann={ann}></Announcements>
            }
        </div>
    );
};

export default Home;