import Conversations from "./Conversations"
import LogoutButton from "./LogoutButton"
import SearchInput from "./SearchInput"

const Sidebar = () => {
  return (
    <div className='flex flex-col border-r border-white p-4'>
      <SearchInput />
      <div className='divider px-3 h-0 border border-gray-300'></div>
      <Conversations />
      <LogoutButton />
    </div>
  )
}

export default Sidebar;