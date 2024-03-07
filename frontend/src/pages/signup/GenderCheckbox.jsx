const GenderCheckbox = ({onCheckboxChange, selectedGender}) => {
    return (
        <div className='flex'>
            <div className='form-control'>
                <label className={`label gap-2 cursor-pointer ${selectedGender === "male" ? "selected" : ""}`}>
                    <input type="checkbox" className='checkbox border-white' checked={selectedGender === "male"} onChange={() => onCheckboxChange("male")} />
                    <span className='label-text text-white bg-transparent'>Male</span>
                </label>
            </div>

            <div className='form-control'>
                <label className={`label gap-2 cursor-pointer ${selectedGender === "female" ? "selected" : ""}`}>
                    <input type="checkbox" className='checkbox border-white' checked={selectedGender === "female"} onChange={() => onCheckboxChange("female")} />
                    <span className='label-text text-white'>Female</span>
                </label>
            </div>
        </div>
    )
}

export default GenderCheckbox



// STARTER FOR THE GENDER CHECKBOX COMPONENT

// const GenderCheckbox = () => {
//     return (
//         <div className='flex'>
//             <div className='form-control'>
//                 <label className='label gap-2 cursor-pointer'>
//                     <input type="checkbox" className='checkbox border-white' />
//                     <span className='label-text text-white bg-transparent'>Male</span>
//                 </label>
//             </div>

//             <div className='form-control'>
//                 <label className='label gap-2 cursor-pointer'>
//                     <input type="checkbox" className='checkbox border-white' />
//                     <span className='label-text text-white'>Female</span>
//                 </label>
//             </div>
//         </div>
//     )
// }

// export default GenderCheckbox