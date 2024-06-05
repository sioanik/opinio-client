import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../../hooks/useAxiosCommon";
import PostsCard from "./PostsCard";

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
            const { data } = await axiosCommon.get('/allposts')
            // console.log(data);
            return data
        },
    })

    return (
        <div>
            <div>
                {
                    searchValue ?
                        <div>
                            {
                                searchedPosts.map((item, idx) =>
                                    <div key={idx}>
                                        <PostsCard item={item}></PostsCard>
                                    </div>
                                )
                            }
                        </div>
                        :
                        <div>
                            {
                                allposts.map((item, idx) =>
                                    <div key={idx}>
                                        <PostsCard item={item}></PostsCard>
                                    </div>
                                )
                            }
                        </div>
                }
            </div>
        </div>
    );
};

export default Posts;