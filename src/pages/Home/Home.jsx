import { useEffect, useState } from "react";
import Banner from "../../components/Home/Banner/Banner";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Posts from "../../components/Home/Posts/Posts";
import Tags from "../../components/Home/Tags/Tags";


const Home = () => {

    const [searchValue, setSearchValue] = useState('')

    const [posts, setPosts] = useState([])

    const axiosSecure = useAxiosSecure()

    useEffect(() => {
        axiosSecure(`/tag-posts?search=${searchValue}`)
            .then(res => setPosts(res.data))

    }, [searchValue])

    // console.log(posts);


    const handleSearchValue = (searchValue) =>{
        setSearchValue(searchValue)
    }

    const handleTagClicked = (tagClicked) =>{
        setSearchValue(tagClicked)
    }
// console.log(searchValue);


    return (
        <div>
            <Banner searchValue={handleSearchValue}></Banner>
            <Tags tagClicked={handleTagClicked}></Tags>
            <Posts searchValue={searchValue} searchedPosts={posts}></Posts>
        </div>
    );
};

export default Home;