import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ApiContext } from '../../utils/api_context';
import { AuthContext } from '../../utils/auth_context';
import { RolesContext } from '../../utils/roles_context';
import { Button } from './Button';
import { ProjectWidget } from './Project';

export const Home = () => {
  const [, setAuthToken] = useContext(AuthContext);
  const api = useContext(ApiContext);
  const roles = useContext(RolesContext);

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
  };

  const getProjects = async () => {
    const projects = await api.get('/projects');
    if (projects.success) {
      console.log('Success!');
      console.log(projects);
    } else {
      alert('THERE ARE NO PROJECTS, YOU NEED TO CREATE ONE');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="bg-gray-500 p-3">
        <div className="grid grid-cols-3">
          <Button type="button" onClick={() => navigate('/')}>
            My Projects
          </Button>
          <Button type="button">My Tasks</Button>
          <div className="text-right">
            <h1 className="text-2xl inline-flex mr-2">Welcome {user.firstName}</h1>
            <Button type="button" onClick={logout}>
              Logout
            </Button>
            {roles.includes('admin') && (
              <Button type="button" onClick={() => navigate('/admin')}>
                Admin
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4">
        <ProjectWidget type="button" onClick={() => navigate('/project')}>
          Project 1
        </ProjectWidget>
        <ProjectWidget type="button" onClick={() => navigate('/project')}>
          Project 2
        </ProjectWidget>
        <ProjectWidget type="button" onClick={() => navigate('/project')}>
          Project 3
        </ProjectWidget>
        <ProjectWidget type="button" onClick={getProjects}>
          Create New Project
        </ProjectWidget>
      </div>
    </div>
  );
};
