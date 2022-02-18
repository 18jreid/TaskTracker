import { useState, useContext, useEffect } from 'react';
import { ApiContext } from '../../utils/api_context';

export const Admin = () => {
  const [users, setUsers] = useState([]);
  const api = useContext(ApiContext);

  useEffect(async () => {
    const newProject = await api.post(url='/projects', body={"title": "test title", 
    "description": "test description", "status": 0})
    const projectsMessage  = await api.get('/projects');
    const newTask = await api.post(url='/tasks', body={"title": "test title", 
    "description": "test description", "status": 0, "timeEstimation": 10, "projectId": 1});
    const tasksMessage = await api.get('/tasks');
    console.log("created project: ");
    console.log(newProject);
    console.log("created task: ");
    console.log(newTask);
    console.log("projectsMessage results: ");
    console.log(projectsMessage);
    console.log("taskMessage results: ");
    console.log(tasksMessage);
    const { users } = await api.get('/users');
    setUsers(users);
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
