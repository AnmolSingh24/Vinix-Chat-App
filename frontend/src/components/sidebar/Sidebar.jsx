import Conversations from "./Conversations"
import Groups from './group/Groups';
import LogoutButton from "./LogoutButton"
import SearchInput from "./SearchInput"

const Sidebar = () => {
  return (
    <div className='flex flex-col border-r border-white p-4'>
      <SearchInput />
      <div className='divider px-3'></div>
      <Groups/>
      <Conversations />
      <LogoutButton />
    </div>
  )
}

export default Sidebar;