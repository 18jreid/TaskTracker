import { Paper } from '../common/paper';
import { Input } from '../common/input';
import { Button } from '../common/button';
import { useNavigate } from 'react-router';
import { ApiContext } from '../../utils/api_context';
import { useContext, useEffect, useState } from 'react';

export const CreateTask = () => {
  const navigate = useNavigate();
  const api = useContext(ApiContext);

  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [timeEstimation, setTimeEstimation] = useState(0);
  const [user, setUser] = useState(null);

  useEffect(async () => {
    const res = await api.get('/users/me');
    setUser(res.user);
  }, []);

  const printName = async () => {
    let worked = await api.post('/tasks', {
      title: taskName,
      description: taskDescription,
      status: 0,
      timeEstimation: timeEstimation,
      projectId: projectId,
    });

    navigate('/');
  };

  return (
    <div className="flex flex-row justify-center m-4 mt-32">
      <div className="w-96">
        <Paper>
          <div>Task Name</div>
          <Input type="text" onChange={(e) => setTaskName(e.target.value)} />
          <div>Description</div>
          <textarea className="border-2 rounded-md" onChange={(e) => setTaskDescription(e.target.value)} />
          <div>Time Estimation (Hours)</div>
          <Input type="number" onChange={(e) => setTimeEstimation(e.target.value)} />
          <div className="flex flex-row justify-center mt-2">
            <Button type="button" onClick={() => navigate('/')}>
              Cancel
            </Button>
            <div className="pl-2" />
            <Button type="button" onClick={printName}>
              Create Task
            </Button>
          </div>
        </Paper>
      </div>
    </div>
  );
};
