import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ApiContext } from '../../utils/api_context';
import { AuthContext } from '../../utils/auth_context';
import { RolesContext } from '../../utils/roles_context';
import { Button } from '../home/Button';

export const Project = () => {
  const [, setAuthToken] = useContext(AuthContext);
  const api = useContext(ApiContext);
  const roles = useContext(RolesContext);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [project, setProject] = useState(1);
  useEffect(async () => {
    const res = await api.get('/users/me');
    setUser(res.user);
    setLoading(false);
  }, []);

  const logout = async () => {
    const res = await api.del('/sessions');
    if (res.success) {
      setAuthToken(null);

      navigate('/signin');
    }
  };

  const getProject = async () => {
    const projects = await api.get('/projects');
    for (x = 0; x < projects.length; x++) {
      if (projects[x].id == id) {
        setProject(projects[x]);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const test = getProject();
  return (
    <div>
      <div className="bg-gray-500 p-3">
        <div className="grid grid-cols-3">
          <Button type="button" onClick={() => navigate('/')} isactive="false">
            My Projects
          </Button>
          <Button type="button" isactive="false" onClick={() => navigate('/tasks')}>
            My Tasks
          </Button>
          <div className="text-right">
            <h1 className="text-3xl inline-flex mr-2 pt-4 text-white">Welcome {user.firstName}!</h1>
            <Button type="button" onClick={logout}>
              Logout
            </Button>
          </div>
        </div>
      </div>
      <div className="bg-gray-600 p-3 grid grid-cols-1 text-center text-3xl text-white">{project.title}</div>
    </div>
  );
};
