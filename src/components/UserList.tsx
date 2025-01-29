import React from 'react';
import UserCard from './UserCard';

type User = {
  avatar_url: string;
  login: string;
  html_url: string;
};

type Props = {
  users: User[];
};

const UserList: React.FC<Props> = ({ users }) => {
  if (users.length === 0) {
    return <p>No se encontraron usuarios</p>;
  }

  return (
    <div className="user-list">
      {users.map((user) => (
        <UserCard
          key={user.login}
          avatar_url={user.avatar_url}
          login={user.login}
          html_url={user.html_url}
        />
      ))}
    </div>
  );
};

export default UserList;
