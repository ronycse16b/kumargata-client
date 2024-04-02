import React from 'react';

export default function SmallLoader({ title }) {
    return (
        <>
            <div className="h-[80vh] flex items-center justify-center  ">
                <h1 className="text-red-600 animate-pulse  font-bold uppercase ">{title}</h1>
            </div>

        </>
    );
}
