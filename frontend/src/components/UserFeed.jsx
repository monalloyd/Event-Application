const UserFeed = ({users, onDelete}) => {
    return (
        <>
            {
                users && users.map((user) => (
                    <div key={user.id}>
                        <div>{user.username}, {user.id}, {user.email}</div>
                        <button onClick={() => onDelete(user.id)}>Delete User</button>
                    </div>
                ))
            }
        </>
    );
};

export default UserFeed;