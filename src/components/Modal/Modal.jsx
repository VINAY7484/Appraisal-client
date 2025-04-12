import React from 'react';

const Modal = ({
    isOpen,
    title = "Approval Confirmation",
    message = "Are you sure you want to proceed?",
    onApprove,
    id,
    field,
    onNotApprove,
    onClose,
    children,
    approveText = "Approve",
    cancelText = "Cancel",
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center w-auto bg-black bg-opacity-50 font-serif">
            <div className="bg-white  rounded-2xl shadow-2xl w-full max-w-[70%] max-h-[90vh] overflow-y-auto p-6">
                <div className='flex  justify-end '>
                    {/* <h2 className="text-xl font-semibold text-gray-800 ">{title}</h2> */}
                    <button className='  related block order-last top-0 right-0 text-red-600' onClick={onClose}>X</button>
                </div>
                {children && <div className="mt-4">{children}</div>}

            </div>
        </div>
    );
};

export default Modal;
