import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { SiChatbot } from "react-icons/si";
import useConversation from "../../zustand/useConversation";
import useGetUsers from "../../hooks/useGetUsers";
import toast from "react-hot-toast";

const SearchInput = () => {
  const { search, setSearch } = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetUsers();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!search) return;
    if (search.length < 3) {
      return toast.error("Search must me atleast 3 characters long")
    }

    const conversation = conversations.find((c) => c.fullname.toLowerCase().includes(search.toLowerCase()));
    if (conversation) {
      setSelectedConversation(conversation);
      setSearch('');
    } else toast.error("No users found");
  }
  return (
    <form onSubmit={handleSubmit} className='flex items-center gap-2'>
      <input type="text" placeholder='Search.....' className='input input-bordered rounded-full bg-white'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type='submit' className='btn btn-circle bg-emerald-500 text-white hover:bg-emerald-500 border-none'>
        <IoSearchSharp className='w-6 h-6 outline-none' />
      </button>
      <button type='submit' className='btn btn-circle bg-emerald-500 text-white hover:bg-emerald-500 border-none'>
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