import { Paper } from '../common/paper';
import { Input } from '../common/input';
import { Button } from '../common/button';
import { useNavigate } from 'react-router';
import { ApiContext } from '../../utils/api_context';
import { useContext, useEffect, useState } from 'react';

export const CreateProject = () => {
  const navigate = useNavigate();
  const api = useContext(ApiContext);

  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [user, setUser] = useState(null);

  useEffect(async () => {
    const res = await api.get('/users/me');
    setUser(res.user);
  }, []);

  const printName = async () => {
    let worked = await api.post('/projects', {
      title: projectName,
      description: projectDescription,
      status: 0,
    });

    navigate('/');
  };

  return (
    <div className="flex flex-row justify-center m-4 mt-32">
      <div className="w-96">
        <Paper>
          <div>Project Name</div>
          <Input type="text" onChange={(e) => setProjectName(e.target.value)} />
          <div>Description</div>
          <textarea className="border-2 rounded-md" onChange={(e) => setProjectDescription(e.target.value)} />
          <div className="flex flex-row justify-center mt-2">
            <Button type="button" onClick={() => navigate('/')}>
              Cancel
            </Button>
            <div className="pl-2" />
            <Button type="button" onClick={printName}>
              Create Project
            </Button>
          </div>
        </Paper>
      </div>
    </div>
  );
};
