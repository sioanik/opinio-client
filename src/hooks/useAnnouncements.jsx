import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "./useAxiosCommon";

const useAnnouncements = () => {

    const axiosCommon = useAxiosCommon()

    const {
        data: ann = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ['announcements'],
        queryFn: async () => {
            const { data } = await axiosCommon.get('/announcements')
            // console.log(data);
            return data
        },
    })
    return [ann];
};

export default useAnnouncements;