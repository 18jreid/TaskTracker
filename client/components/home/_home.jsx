import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ApiContext } from '../../utils/api_context';
import { AuthContext } from '../../utils/auth_context';
import { RolesContext } from '../../utils/roles_context';
import { Button } from './Button';
import { Project } from './Project';

export const Home = () => {
  const [, setAuthToken] = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [hasProjects, setHasProjects] = useState(true);
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
    if (hasProjects) {
      const allProjects = await api.get('/projects/user');

      let totalProjects = [];
      if (allProjects.length != 0) {
        for (let x = 0; x < allProjects.length; x++) {
          const test = await api.get('/projects:id=' + allProjects[x].projectId);
          totalProjects.push(test);
        }
      }

      setProjects(totalProjects);
      setHasProjects(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const loadProjects = getProjects();
  return (
    <div>
      <div className="bg-gray-500 p-3">
        <div className="grid grid-cols-3">
          <Button type="button" onClick={() => navigate('/')} isactive="true">
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
            {roles.includes('admin') && (
              <Button type="button" onClick={() => navigate('/admin')}>
                Admin
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4">
        {projects.map((project) => (
          <Project
            type="button"
            key={project.id}
            title={project.title}
            description={project.description}
            onClick={() => navigate('/project', (id = project.id))}
          />
        ))}
        <Project type="button" onClick={() => navigate('/create_project')} title="+" create="true" />
      </div>
    </div>
  );
};
