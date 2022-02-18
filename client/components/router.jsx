import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './home/_home';
import { AuthContext } from '../utils/auth_context';
import { SignIn } from './sign_in/_sign_in';
import { SignUp } from './sign_up/_sign_up';
import { Admin } from './admin/_admin';
import { Project } from './project/_project';
import { CreateProject } from './CreateProject/_createProject';

export const Router = () => {
  const [authToken] = useContext(AuthContext);

  return (
    <Routes>
      <Route
        path="/"
        element={authToken ? <Home /> : <Navigate replace to="signin" />} // no token means not logged in
      />
      <Route path="admin" element={<Admin />} />
      <Route path="signin" element={<SignIn />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="project" element={<Project />} />
      <Route path="create_project" element={<CreateProject />} />
    </Routes>
  );
};
