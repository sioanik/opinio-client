import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../../hooks/useAxiosCommon";
import SectionTitle from "../../Comments/SectionTitle";

const Tags = ({ tagClicked, setCurrentPage }) => {

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

    const handleTagClicked = (tag) => {
        tagClicked(tag)
        setCurrentPage(1)
    }

    // console.log(tagClicked);

    return (
        <div className="w-[80%] mx-auto">
            <SectionTitle
                title={'Explore Topics'}
                description={'Navigate through a diverse range of discussions by tags, covering various interests and subjects.'}
            ></SectionTitle>
            <div className="">
            {/* <div className="flex gap-6 items-center justify-center"> */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
                {
                    tags.map((item, idx) => (
                        <button onClick={() => { handleTagClicked(item.tag) }} key={idx} className="btn m-2 btn-info">{item.tag.charAt(0).toUpperCase() + item.tag.slice(1)}</button>
                    ))
                }
                </div>
            </div>
        </div>
    );
};

export default Tags;