import { useParams } from "react-router-dom";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Swal from "sweetalert2";

import Modal from 'react-modal';
import ReadMoreModal from "../../components/Comments/ReadMoreModal";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root')




const Comments = () => {

    const [feedback, setFeedback] = useState('')
    // const [buttonDisabled, setButtonDisabled] = useState('ture')
    const [disabledButtons, setDisabledButtons] = useState({});

    const handleFeedbackSelect = (idx, e) => {
        const value = e.target.value;
        setSelectedValues(prevSelectedValues => ({
            ...prevSelectedValues,
            [idx]: value,
        }));
        setFeedback(value)
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

    const feedbackObj = { feedback }

    const handleReport = (id, idx) => {
        // console.log(feedback);
        axiosCommon.patch(`/comments/${id}`, feedbackObj)
            .then(res => {

                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Reported to Admin!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
        setDisabledButtons(prevDisabledButtons => ({
            ...prevDisabledButtons,
            [idx]: true,
        }));
        // setButtonDisabled('ture')


    }
    const [modalIsOpen, setIsOpen] = useState(false);


    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

    const [selectedValues, setSelectedValues] = useState({});





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
                                            {/* {item.comment} */}

                                            {
                                                item.comment.length <= 20
                                                    ?
                                                    <div>
                                                        <span>{item.comment}</span>
                                                    </div>
                                                    :
                                                    <div>{item.comment.substring(0, 20)}...
                                                        <button
                                                            onClick={openModal}
                                                            className="text-blue-500 hover:underline ml-1"
                                                        // onClick={handleReadMoreClick}
                                                        >
                                                            Read More
                                                        </button>
                                                        <Modal
                                                            isOpen={modalIsOpen}
                                                            onAfterOpen={afterOpenModal}
                                                            onRequestClose={closeModal}
                                                            style={customStyles}
                                                            contentLabel="Example Modal"
                                                        >
                                                            <ReadMoreModal text={item.comment} ></ReadMoreModal>
                                                            {/* <ModalBody book={book} id={id}></ModalBody> */}
                                                        </Modal>
                                                    </div>
                                            }

                                        </td>

                                        <th>

                                            <div>
                                                <label className="form-control w-full max-w-xs">
                                                    <div className="label">
                                                        <span className="label-text"></span>
                                                    </div>
                                                    <select
                                                        // onChange={handleFeedbackSelect} 
                                                        onChange={(event) => handleFeedbackSelect(idx, event)}

                                                        className="input input-bordered w-full max-w-xs " name="" id="tag">
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
                                                onClick={() => { handleReport(item._id, idx) }}
                                                // disabled={buttonDisabled}
                                                disabled={!selectedValues[idx] || disabledButtons[idx]}
                                                className="btn btn-neutral my-5 lg:my-0">Report</button>
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