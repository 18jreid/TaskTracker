import { useState, useContext, useEffect } from 'react';
import { ApiContext } from '../../utils/api_context';

export const Admin = () => {
  const [users, setUsers] = useState([]);
  const api = useContext(ApiContext);

  useEffect(async () => {
    const { users } = await api.get('/users');
    const { tasksMessage } = await api.get('/tasks');
    const { projectsMessage } = await api.get('/projects');
    setUsers(users);
    console.log("results: ", tasksMessage, projectsMessage);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-3xl">Users</h2>
      {users.map((user) => (
        <div key={user.id}>
          {user.firstName} {user.lastName}
        </div>
      ))}
    </div>
  );
};
