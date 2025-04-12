
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import baseURL from "../utils/BaseURL";
import Spinner from "../components/Spinner";

const QuestionForm = ({ id, field, onClose }) => {
    const initialFormData = {
        question: ""
    };

    const [formData, setFormData] = useState([initialFormData]);
    const [loading, setLoading] = useState(false);

    const handleChange = (index, field, value) => {
        setFormData((prev) =>
            prev.map((item, i) =>
                i === index ? { ...item, [field]: value } : item
            )
        );
    };

    const addRow = () => {
        setFormData([...formData, initialFormData]);
    };

    const fetchAppraisalQuestion = async () => {
        if (field === "add") return;

        setLoading(true);
        try {
            const response = await axios.get(`${baseURL}/appraisal-question/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (response.data.success === true) {
                setFormData(response.data.data[0].questions);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(
                error.response
                    ? error.response.data.message
                    : error.message
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAppraisalQuestion();
    }, [id, field]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(
                `${baseURL}/appraisal-question/${id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            if (response.data.success === true) {
                toast.success(response.data.message);
                onClose();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(
                error.response
                    ? error.response.data.message
                    : error.message
            );
        } finally {

            setLoading(false);
        }
    };

    if (loading) return <Spinner />;
    console.log(formData, "formData")
    return (
        <div>
            <h1 className="text-center text-2xl font-bold">
                Appraisal Question
            </h1>
            <form onSubmit={handleSubmit}>
                <table className="w-full rounded-2xl overflow-x-hidden mt-8">
                    <thead>
                        <tr className="bg-gray-100 p-2 h-10">
                            <th className="text-center px-2 border w-[10vw]">Sr. No</th>
                            <th className="text-center px-2 border">Question</th>
                            <th className="text-center px-2 border w-[10vw]"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            formData?.map((data, index) => (
                                <tr key={index}>
                                    <td className="border text-center">{index + 1}</td>
                                    <td className="border">
                                        <input
                                            className="w-full outline-none p-2"
                                            type="text"
                                            value={data.question}
                                            onChange={(e) =>
                                                handleChange(index, "question", e.target.value)
                                            }
                                            required
                                            readOnly={field === "view"}
                                        />
                                    </td>
                                    <td className="border text-center">
                                        {field !== "view" && formData.length === index + 1 ?

                                            <button
                                                type="button"
                                                className="button  rounded-3xl px-6 text-sm"
                                                onClick={addRow}
                                                disabled={field === "view"}
                                            >
                                                Add Row
                                            </button>
                                            :
                                            <button
                                                type="button"
                                                className="button rounded-3xl px-6 text-sm"
                                                onClick={() =>
                                                    setFormData((prev) =>
                                                        prev.filter((_, i) => i !== index)
                                                    )
                                                }
                                                disabled={field === "view"}
                                            >
                                                Remove
                                            </button>

                                        }
                                    </td>
                                </tr>
                            )
                            )}
                    </tbody>
                </table>

                {field !== "view" && (
                    <div className="grid grid-cols-4 gap-4 mt-8">
                        <button
                            type="submit"
                            className="button col-end-5"
                            disabled={loading}
                        >
                            {loading
                                ? "Saving..."
                                : "Submit"}
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
};

export default QuestionForm;
