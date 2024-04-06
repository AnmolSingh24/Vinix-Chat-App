import { useConversation, useGroup } from "../../../zustand/useConversation";

const Group = ({ group, lastIdx }) => {

    const { selectedGroup } = useGroup();
    const { setSelectedConversation } = useConversation();
    const isSelected = selectedGroup?._id === group?._id;

    return (
        <>
            <div
                className={`flex gap-2 items-center hover:bg-emerald-600 rounded p-2 py-1 cursor-pointer 
                ${isSelected ? "bg-emerald-600" : ""}`}
                onClick={() => setSelectedConversation(group)}>

                <div>
                    <div className='w-12 rounded-full'>
                        <img src={group?.profilePicture} alt="user img" />
                    </div>
                </div>

                <div className='flex flex-col flex-1'>
                    <div className='flex gap-3 justify-between'>
                        <p className='font-bold text-gray-200'>{group?.groupName}</p>
                    </div>
                </div>
            </div>

            {!lastIdx && <div className='divider my-0 py-0 h-1' />}
        </>
    )
}

export default Group;