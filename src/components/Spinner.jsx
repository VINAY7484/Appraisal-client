

import React from 'react';

export default function Spinner({ size = "16", border = "4", color = "blue-500" }) {
    return (
        <div
            className="flex justify-center items-center bg-transparent h-[70vh]"
            role="status"
            aria-label="Loading">
            <div
                className={`inline-block h-${size} w-${size} animate-spin rounded-full border-${border} border-solid border-${color} border-r-transparent align-middle motion-reduce:animate-spin_4.5s_linear_infinite`}
            ></div>
        </div>

    );
}
