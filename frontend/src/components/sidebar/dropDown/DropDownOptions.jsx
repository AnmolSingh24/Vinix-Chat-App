import React, { useState } from 'react'
import { HiDotsVertical } from "react-icons/hi";
import AIChatBot from "../AIChatBot"
import SelectUsers from '../group/SelectUsers';

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
                    <div className="absolute -left-28 bg-white z-10 mt-2 h-20 shadow-md rounded">
                        {/* Create group */}
                        <SelectUsers />
                        {/* AI ChatBot */}
                        <AIChatBot />
                    </div>
                )}

            </div>
        </>
    )
}

export default DropDownOptions