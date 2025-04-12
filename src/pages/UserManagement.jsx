import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import baseURL from '../utils/BaseURL'
import Modal from '../components/Modal/Modal'
import QuestionForm from './QuestionForm'

const UserManagement = () => {
    const [result, setResult] = useState()
    const [isOpen, setIsOpen] = useState(false)
    const [selectedId, setSelectedId] = useState()
    const [selectedField, setSelectedField] = useState()
    const [userType, setUserType] = useState()
    const [loading, setLoading] = useState(false)


    const openModalWithId = (id, field,) => {
        setSelectedId(id);
        setSelectedField(field);
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false)
    }

    useEffect(() => {
        setLoading(true)
        axios.get(`${baseURL}/users/getAll`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            .then(res => {
                if (res.data.success === true) {
                    setResult(res.data);

                } else {
                    toast.error(res.data.message);
                }
                setLoading(false)
            })
            .catch(error => {
                setLoading(false)
                console.log(error)
                toast.error(error.response ? error.response.data.message : error.message);
            })
    }, [isOpen])

    if (loading) return <Spinner />
    return (
        <>
            <div className='w-full  shadow   z-0 border overflow-x-scroll  '>
                <h1 className='text-center mt-4  text-2xl font-bold  font-serif mb-4'> User List</h1>
                <div className=' m-4 p-4 border shadow-lg rounded-3xl'>
                    <table className=' w-full'>
                        <thead className='h-10 w-[100%] rounded '>
                            <tr className='shadow-sm  rounded   bg-blue-500 text-white'>
                                <th className='px-4 text-nowrap border w-30'>Sr. No.</th>
                                <th className='px-4 text-nowrap border'>Name</th>
                                <th className='px-4 text-nowrap border'>Email</th>
                                <th className='px-4 text-nowrap border'>Role</th>
                                <th className='px-4 text-nowrap border'>Appraisal Question</th>
                                {/* <th className='px-4 text-nowrap border'>Delete</th> */}
                            </tr>

                        </thead>
                        <tbody className='h-10'>
                            {result?.user?.map((data, index) => (
                                <tr key={index} className=' shadow-sm  rounded border text-center' >
                                    <td className='px-4 text-nowrap    m-8 '>{index + 1}</td>
                                    <td className='px-4 text-nowrap '>{data.fullname}</td>
                                    <td className='px-4 text-nowrap '>{data.email}</td>
                                    <td className='px-4 text-nowrap '>{data.userType}</td>
                                    <td className='px-4 p-4 text-nowrap '>

                                        {
                                            data.isAppraisalQuestion ?
                                                <span
                                                    className='button rounded-3xl px-8'
                                                    onClick={() => openModalWithId(data._id, "view")}
                                                >
                                                    View
                                                </span>
                                                :
                                                <span
                                                    className='button rounded-3xl px-8'
                                                    onClick={() => openModalWithId(data._id, "add")}
                                                >
                                                    Add
                                                </span>}

                                    </td>

                                </tr>
                            ))
                            }

                        </tbody>
                    </table >
                </div >
                <Modal

                    isOpen={isOpen}
                    title="Approval Confirmation"
                    onClose={handleClose}

                >

                </Modal>


                <Modal
                    isOpen={isOpen}
                    onClose={handleClose}
                >
                    <QuestionForm

                        id={selectedId}
                        field={selectedField}
                        onClose={handleClose}
                    />
                </Modal>
            </div>
        </>
    )
}

export default UserManagement
