import React, { useState } from 'react'
import { HiDotsVertical } from "react-icons/hi";
import AISearch from "../AISearch"
import CreateGroup from '../group/CreateGroup';

const DropDownOptions = () => {
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);

    const handleDropDown = () => {
        setIsDropDownOpen(!isDropDownOpen);
    };

    return (
        <>
            <div className="relative">
                <button className="bg-emerald-500 text-white hover:bg-emerald-600 border-none p-3.5 rounded-full cursor-pointer" onClick={handleDropDown}>
                    <HiDotsVertical className='w-5 h-5 text-white' />
                </button>

                {isDropDownOpen && (
                    <div className="absolute top-full -left-28 bg-white z-10 mt-2 w-150 h-50 shadow-md">
                        {/* Create group */}
                        <CreateGroup />
                        {/* AI Search */}
                        <AISearch />
                    </div>
                )}

            </div>
        </>
    )
}

export default DropDownOptions