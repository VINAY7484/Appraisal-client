import axios from "axios";
import { useState } from "react";
import baseURL from "../../utils/BaseURL";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";
import { useAuth } from "../../context/AuthContext";

const AddItemDetails = () => {
    const [isLoading, setIsLoading] = useState(false)
    const { user, isAuthenticated } = useAuth();
    console.log(user)

    const [result, setResult] = useState()
    const [itemDetails, setItemDetails] = useState({
        partName: '',
        partNo: '',
        minimumRequired: '',
        quantityType: '',
    })
    const handleChange = (e) => {
        e.preventDefault();
        setItemDetails((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true)
        try {
            const response = await axios.post(`${baseURL}/items/add`, itemDetails, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    ...user,
                }
            })

            if (response.data.success == true) {
                toast.success(response.data.message)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setIsLoading(false)
        }


    };

    if (isLoading) return <Spinner />
    return (
        <div className='rounded-3xl shadow '>
            <h1 className="text-center font-serif text-3xl font-bold">Add Item Details</h1>
            <form onSubmit={handleSubmit}>

                <div className='grid grid-cols-4 gap-4  p-4  m-4'>
                    {/* <div className='grid grid-cols-4 gap-4 border shadow p-4  my-4 rounded-3xl'> */}
                    <div>
                        <label className='block'>Part Name:</label>
                        <input
                            className='input_field'
                            type="text"
                            name='partName'
                            // value={partName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className='block'>Part No:</label>
                        <input
                            className='input_field'
                            type="text"
                            name="partNo"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className='block'>Quantity Type:</label>
                        <select
                            name="quantityType"
                            id="itemStatus"
                            className="input_field"
                            // value={item.quantityType}
                            onChange={handleChange}
                            // onChange={(e) => handleChange(e, index, 'quantityType')}
                            required
                        >
                            <option value="">Type</option>
                            <option value="Kgs.">Kg</option>
                            <option value="Pcs.">Number</option>
                            <option value="Mtr.">Length</option>
                            <option value="Ltr.">Liter</option>
                        </select>

                    </div>
                    <div>
                        <label className='block'>Minimum Required:</label>
                        <input
                            className='input_field'
                            type="number"
                            name="minimumRequired"
                            // value={partName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-span-5">
                        <button className="button w-full" type="submit">Add Details</button>
                    </div>
                </div>

            </form>
        </div>
    )
}

export default AddItemDetails
