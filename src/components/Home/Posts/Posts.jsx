import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../../hooks/useAxiosCommon";
import PostsCard from "./PostsCard";
import { useEffect, useState } from "react";

const Posts = ({ searchValue, searchedPosts }) => {
    // console.log(!!searchValue);

    const axiosCommon = useAxiosCommon()

    const {
        data: allposts = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            const { data } = await axiosCommon.get('/allpostsdefault')
            // console.log(data);
            return data
        },
    })



    const [sortedPosts, setSortedPosts] = useState([])

    useEffect(() => {
        axiosCommon('/allpostssorted')
            .then(res => setSortedPosts(res.data))

    }, [])

    // console.log(sortedPosts);


    const [toggleButton, setToggleButton] = useState(false)

    const handleToggleButton = () => {
        setToggleButton(!toggleButton)
    }
    console.log(toggleButton);

    return (
        <div>
            {!searchValue &&
                <button onClick={handleToggleButton}>
                Sort by Popularity
            </button>
            }
            <div>


                <div>

                    {(searchValue ? searchedPosts : !toggleButton ? allposts : sortedPosts).map((item, idx) =>
                        <div key={idx}>
                            <PostsCard item={item}></PostsCard>
                        </div>
                    )
                    }
                </div>

            </div>
        </div>
    );
}
export default Posts