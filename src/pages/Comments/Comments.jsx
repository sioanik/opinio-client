import { useParams } from "react-router-dom";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import Modal from 'react-modal';
import ReadMoreModal from "../../components/Comments/ReadMoreModal";
import SectionTitle from "../../components/Comments/SectionTitle";
import useAxiosSecure from "../../hooks/useAxiosSecure";

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
    const [disabledButtons, setDisabledButtons] = useState({});

    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [count, setCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    // console.log(itemsPerPage, count, currentPage);

    // const [buttonDisabled, setButtonDisabled] = useState('ture')

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
    const axiosSecure = useAxiosSecure()

    const {
        data: comments = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ['comments', id],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/comments/${id}?page=${currentPage}&size=${itemsPerPage}`)
            // console.log(data);
            return data
        },
    })

    useEffect(() => {
        const getCount = async () => {
            const { data } = await axiosCommon(`/post-comments-count?id=${id}`)
            setCount(data.count)
            // console.log(data.count);
        }
        getCount()
    }, [axiosCommon])

    const feedbackObj = { feedback }

    const handleReport = (id, idx) => {
        // console.log(feedback);
        axiosCommon.patch(`/comments/${id}`, feedbackObj)
            .then(res => {

                // console.log(res.data)
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


    const numberOfPages = Math.ceil(count / itemsPerPage)
    const pages = [...Array(numberOfPages).keys()].map(element => element + 1)

    const handlePaginationButton = value => {
        // console.log(value)
        setCurrentPage(value)
    }


    return (
        <div className="w-[90%] mx-auto">
            <div className='w-[90%] mx-auto'>
                <SectionTitle
                    title={'Comments'}
                ></SectionTitle>
            </div>
            <div className="">
                {/* table upper part  */}

                <div className="overflow-x-auto">
                    <table className="table table-xs md:table-md">
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

                                        <td className="text-xs md:text-base">
                                            {item.email}
                                        </td>
                                        <td className="text-base">
                                            {/* {item.comment} */}

                                            {
                                                item.comment.length <= 20
                                                    ?
                                                    <div>
                                                        <span>{item.comment}</span>
                                                    </div>
                                                    :
                                                    <div>
                                                        <div className="flex">
                                                            <p className="text-xs md:text-base">{item.comment.substring(0, 20)}...</p>
                                                            <button
                                                                onClick={openModal}
                                                                className="text-blue-500 text-xs md:text-base hover:underline ml-1"
                                                            // onClick={handleReadMoreClick}
                                                            >
                                                                Read More
                                                            </button>
                                                        </div>
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
                                                <label className="form-control w-full h-12 -mt-4 max-w-xs">
                                                    <div className="label">
                                                        <span className="label-text"></span>
                                                    </div>
                                                    <select
                                                        // onChange={handleFeedbackSelect} 
                                                        onChange={(event) => handleFeedbackSelect(idx, event)}

                                                        className="input input-bordered w-auto max-w-xs text-xs md:text-base" name="" id="tag">
                                                        <option className="max-w-xs text-xs" value="">Select</option>

                                                        <option className="max-w-xs text-xs" value="spam">Spam </option>

                                                        <option className="max-w-xs text-xs" value="violence">Violence</option>

                                                        <option className="max-w-xs text-xs" value="hate-speech">Hate Speech</option>

                                                    </select>

                                                </label>
                                            </div>

                                        </th>
                                        <th>
                                            <button
                                                onClick={() => { handleReport(item._id, idx) }}
                                                // disabled={buttonDisabled}
                                                disabled={!selectedValues[idx] || disabledButtons[idx]}
                                                className="btn btn-sm btn-neutral  lg:my-0">Report</button>
                                        </th>
                                    </tr>
                                </tbody>


                            )
                        }
                        {/* table lower part  */}

                    </table>
                </div>

            </div>
            {/* pagination  */}
            <div className='flex justify-center mt-12'>

                {/* Numbers */}
                {pages.map(btnNum => (
                    <button
                        onClick={() => handlePaginationButton(btnNum)}
                        key={btnNum}
                        className={`hidden ${currentPage === btnNum ? 'bg-blue-500 text-white' : ''
                            } px-4 py-2 mx-1 transition-colors duration-300 transform  rounded-md sm:inline hover:bg-blue-500  hover:text-white`}
                    >
                        {btnNum}
                    </button>
                ))}
            </div>
            <div className="w-full text-gray-500 flex justify-end items-center dark:text-gray-400">
                {count > 0 ? (
                    <span className="mr-2 font-medium text-gray-700 dark:text-gray-100">
                        {currentPage * 10 - 9} - {Math.min(currentPage * 10, count)}
                    </span>
                ) : (
                    <span className="mr-2 font-medium text-gray-700 dark:text-gray-100">
                        0
                    </span>
                )}
                of {count} records
            </div>

        </div>
    );
};

export default Comments;