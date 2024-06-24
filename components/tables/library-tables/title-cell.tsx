import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

const TitleCell: React.FC<{ novelID: Number, title: String }> = ({ novelID, title }) => {
    const router = useRouter();
    const pathName = usePathname();

    return (
        <p
            className='cursor-pointer text-blue-500 hover:text-red-500'
            onClick={() => router.push(`${pathName}/${novelID}/chapter`)}
        >
            {title}
        </p>
    );
};

export default TitleCell;