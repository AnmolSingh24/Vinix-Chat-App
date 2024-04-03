import useGetGroups from '../../../hooks/useGetGroups';
import Group from './Group';

const Groups = () => {
    const { loading, groups } = useGetGroups();
    return (
        <div className='py-2 flex flex-col overflow-auto'>
            {loading ? <span className='loading loading-spinner mx-auto text-white'></span> : groups.map((group, idx) => (
                <Group
                    key={group._id}
                    group={group}
                    lastIdx={idx === groups.length - 1}
                />
            ))}
        </div>
    )
}

export default Groups;