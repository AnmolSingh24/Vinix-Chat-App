import useGetConversations from '../../hooks/useGetConversations';
import Conversation from './Conversation';
import useGetGroups from '../../hooks/useGetGroups';
import Group from './group/Group';
import useListenGroup from '../../hooks/useListenGroup';
import { useEffect } from 'react';

const Conversations = () => {
  const { loading, conversations } = useGetConversations();
  const { loadingGroups, groups, setGroups } = useGetGroups();
  const { newGroup } = useListenGroup();

  useEffect(() => {
    setGroups([...groups, newGroup]);
  }, [newGroup])

  return (
    <div className='py-2 flex flex-col overflow-auto'>
      {loadingGroups ? <span className='loading loading-spinner mx-auto text-white'></span> : groups.map((group, idx) => (
        <Group
          key={idx}
          group={group}
          lastIdx={idx === groups.length - 1}
        />
      ))}

      {loading ? <span className='loading loading-spinner mx-auto text-white'></span> : conversations.map((conversation, idx) => (
        <Conversation
          key={idx}
          conversation={conversation}
          lastIdx={idx === conversations.length - 1}
        />
      ))}
    </div>
  )
}

export default Conversations;