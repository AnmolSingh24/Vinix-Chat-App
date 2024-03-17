import Conversations from "./Conversations"
import LogoutButton from "./LogoutButton"
import SearchInput from "./SearchInput"

const Sidebar = () => {
  return (
    <div className='flex flex-col border-r border-white p-4'>
      {/* <img className='w-10 h- 10 rounded-full' src="\src\assets\images\vinix-logo.png" alt="chat-app-logo"/> */}
      <SearchInput />
      <div className='divider px-3'></div>
      <Conversations />
      <LogoutButton />
    </div>
  )
}

export default Sidebar;