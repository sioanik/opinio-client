import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../../hooks/useAxiosCommon";

const Tags = ({tagClicked}) => {

    const axiosCommon = useAxiosCommon()

    const {
        data: tags = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ['tags'],
        queryFn: async () => {
            const { data } = await axiosCommon.get('/tags')
            // console.log(data);
            return data
        },
    })

    const handleTagClicked = (tag) =>{
        tagClicked(tag)
    }
    
    // console.log(tagClicked);

    return (
        <div>
            {
                tags.map((item, idx)=>(
                    <button onClick={()=>{handleTagClicked(item.tag)}} key={idx} className="btn btn-outline">{item.tag}</button>
                ))
            }
        </div>
    );
};

export default Tags;