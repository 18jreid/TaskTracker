import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ApiContext } from '../../utils/api_context';
import { AuthContext } from '../../utils/auth_context';
import { RolesContext } from '../../utils/roles_context';
import { Button } from '../home/Button';
import { Project } from '../home/Project';

export const Tasks = () => {
  const [, setAuthToken] = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [hasTasks, setHasTasks] = useState(true);
  const api = useContext(ApiContext);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  useEffect(async () => {
    const res = await api.get('/users/me');
    setUser(res.user);
    setLoading(false);
  }, []);

  const logout = async () => {
    const res = await api.del('/sessions');
    if (res.success) {
      setAuthToken(null);
    }

    navigate('/signin');
  };

  const getTasks = async () => {
    if (hasTasks) {
      if (tasks.length == 0) {
        const tasks = await api.get('/tasks');
        setTasks(tasks);
        setHasTasks(false);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const loadTasks = getTasks();
  return (
    <div>
      <div className="bg-gray-500 p-3">
        <div className="grid grid-cols-3">
          <Button type="button" onClick={() => navigate('/')} isactive="false">
            My Projects
          </Button>
          <Button type="button" isactive="true" onClick={() => navigate('/tasks')}>
            My Tasks
          </Button>
          <div className="text-right">
            <h1 className="text-2xl inline-flex mr-2">Welcome {user.firstName}</h1>
            <Button type="button" onClick={logout}>
              Logout
            </Button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4">
        {tasks.map((task) => (
          <Project type="button" key={task.taskID}>
            {task.title} {task.description} {task.userId}
          </Project>
        ))}
      </div>
    </div>
  );
};
