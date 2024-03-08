import { IoSearchSharp } from "react-icons/io5";
import { SiChatbot } from "react-icons/si";

const SearchInput = () => {
  return (
    <form className='flex items-center gap-2'>
      <input type="text" placeholder='Search.....' className='input input-bordered rounded-full bg-white' />
      <button type='submit' className='btn btn-circle bg-green-400 text-white hover:bg-emerald-500 border-none'>
        <IoSearchSharp className='w-6 h-6 outline-none' />
      </button>
      <button type='submit' className='btn btn-circle bg-green-400 text-white hover:bg-emerald-500 border-none'>
        <SiChatbot className='w-6 h-6 outline-none' />
      </button>
    </form>
  )
}

export default SearchInput




//STARTER CODE FOR THE SEARCH INPUT

// import { IoSearchSharp } from "react-icons/io5";

// const SearchInput = () => {
//   return (
//     <form className='flex items-center gap-2'>
//         <input type="text" placeholder='Search.....' className='input input-bordered rounded-full bg-white' />
//         <button type='submit' className='btn btn-circle bg-green-400 text-white hover:bg-emerald-500 border-none'>
//         <IoSearchSharp className='w-6 h-6 outline-none' />
//         </button>
//     </form>
//   )
// }

// export default SearchInput