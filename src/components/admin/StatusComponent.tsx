import React from 'react';

type StatusType = 'Active' | 'Blocked';

interface StatusComponentProps {
    status: StatusType;
}

export const StatusComponent: React.FC<StatusComponentProps> = ({ status }) => {
    let styleVar = "px-3 py-1 rounded-lg capitalize w-fit text-sm font-semibold ";

    if (status === "Active") {
        styleVar += "bg-green-100 text-green-600";
    } else if (status === "Blocked") {
        styleVar += "bg-red-100 text-red-400";
    }

    return (
        <span className={styleVar}>
            {status}
        </span>
    );
};
