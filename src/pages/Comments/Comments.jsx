import { useParams } from "react-router-dom";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";


const Comments = () => {

    const [feedback, setFeedback] = useState('')
    const [buttonDisabled, setButtonDisabled] = useState('ture')

    const handleFeedbackSelect = (e) =>{
        const value = e.target.value
        setFeedback(value)
        if(value){
            setButtonDisabled(false)
        }
    }

    const handleReport = () => {
        setButtonDisabled('ture')
    }


    const { id } = useParams()

    const axiosCommon = useAxiosCommon()

    const {
        data: comments = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ['comments', id],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/comments/${id}`)
            console.log(data);
            return data
        },
    })


    return (
        <div>
            <div className='w-[90%] mx-auto'>
                <div className='w-[80%] mx-auto mt-10 py-5 mb-5'>
                    <p className='text-center pb-4 text-2xl font-semibold'>Comments</p>
                    {/* <p className='text-center'>Expand your literary universe by adding a new book to your library's collection</p> */}
                </div>
            </div>
            <div className="">
                {/* table upper part  */}

                <div className="overflow-x-auto">
                    <table className="table md:table-xs">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Commenter Email</th>
                                <th>Comment</th>
                                <th>Feedback</th>
                                <th></th>
                            </tr>
                        </thead>

                        {
                            comments.map((item, idx) =>
                                //    table body 

                                <tbody key={idx}>
                                    {/* row 1 */}
                                    <tr>

                                        <td className="">
                                            {item.email}
                                        </td>
                                        <td>
                                            {item.comment}
                                        </td>

                                        <th>

                                            <div>
                                                <label className="form-control w-full max-w-xs">
                                                    <div className="label">
                                                        <span className="label-text"></span>
                                                    </div>
                                                    <select onChange={handleFeedbackSelect} className="input input-bordered w-full max-w-xs " name="" id="tag">
                                                        <option value="">Select</option>

                                                        <option value="spam">Spam </option>

                                                        <option value="violence">Violence</option>

                                                        <option value="hate-speech">Hate Speech</option>

                                                    </select>

                                                </label>
                                            </div>

                                        </th>
                                        <th>
                                            <button
        
                                                onClick={handleReport} 
                                                disabled={buttonDisabled}
                                                className="btn btn-neutral my-5 lg:my-0  ">Report</button>
                                        </th>
                                    </tr>
                                </tbody>


                            )
                        }
                        {/* table lower part  */}

                    </table>
                </div>

            </div>

        </div>
    );
};

export default Comments;