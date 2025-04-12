import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-[90vh] bg-gray-100 text-center">
            <h1 className="text-6xl font-bold text-red-500">404</h1>
            <p className="text-xl text-gray-600 mt-2">Oops! Page not found</p>
            <div className="mt-6 space-x-4">
                <button
                    onClick={() => navigate(-1)}
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700"
                >
                    Go Back
                </button>
                <button
                    onClick={() => navigate("/")}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
                >
                    Home
                </button>
            </div>
        </div>
    );
};

export default PageNotFound;
