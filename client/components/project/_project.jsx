import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ApiContext } from '../../utils/api_context';
import { AuthContext } from '../../utils/auth_context';
import { RolesContext } from '../../utils/roles_context';
import { Button } from '../home/Button';
import { Project } from '../Home/Project';

export const Project = () => {
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
      console.log('THERE ARE NO PROJECTS, YOU NEED TO CREATE ONE');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="bg-gray-500 p-3">
        <div className="grid grid-cols-3">
          <h1>PROJECT NAME</h1>
          <div className="text-right">
          </div>
        </div>
      </div>
    </div>
  );
};
