import { useEffect, useState } from "react";
import Banner from "../../components/Home/Banner/Banner";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Posts from "../../components/Home/Posts/Posts";


const Home = () => {

    const [searchValue, setSearchValue] = useState('')

    const [posts, setPosts] = useState([])

    const axiosSecure = useAxiosSecure()

    useEffect(() => {
        axiosSecure(`/tags?search=${searchValue}`)
            .then(res => setPosts(res.data))

    }, [searchValue])

    // console.log(posts);


    const receiveStateValue = (searchValue) =>{
        setSearchValue(searchValue)
    }

console.log(searchValue);


    return (
        <div>
            <Banner searchStateValue={receiveStateValue}></Banner>
            <Posts searchValue={searchValue} searchedPosts={posts}></Posts>
        </div>
    );
};

export default Home;