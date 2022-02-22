import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ApiContext } from '../../utils/api_context';
import { AuthContext } from '../../utils/auth_context';
import { RolesContext } from '../../utils/roles_context';
import { Button } from '../home/Button';
import { TaskWidget } from './TaskWidget';

export const Project = () => {
  const [, setAuthToken] = useContext(AuthContext);
  const api = useContext(ApiContext);
  const roles = useContext(RolesContext);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [project, setProject] = useState(1);
  const [loadingProject, setLoadingProject] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [notStarted, setNotStarted] = useState([]);
  const [inProgress, setInProgres] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [users, setUsers] = useState([]);
  const [people, setPeople] = useState([]);
  const [canDelete, setCanDelete] = useState(false);

  useEffect(async () => {
    const res = await api.get('/users/me');
    setUser(res.user);
    setLoading(false);

    const allUsers = await api.get('/users');
    setUsers(allUsers.users);
  }, []);

  const logout = async () => {
    const res = await api.del('/sessions');
    if (res.success) {
      setAuthToken(null);

      navigate('/signin');
    }
  };

  const getProject = async () => {
    if (loadingProject) {
      const projects = await api.get('/projects:id=' + id);
      setProject(projects);
      setLoadingProject(false);
      const allTasks = await api.post('/tasks/project', {
        title: project.title,
        status: 0,
        timeEstimation: 1,
        description: project.description,
        projectId: project.id,
      });

      setTasks(allTasks);
      sortTasks(allTasks);
      const allUsers = await api.get('/users');

      if (project.createdByUserId == user.id) {
        setPeople(allUsers.users);
        setCanDelete(true);
      } else {
        setPeople([user]);
      }
    }
  };

  function sortTasks(allTasks) {
    let notStarted = [];
    let inProgress = [];
    let completed = [];
    for (let x = 0; x < allTasks.length; x++) {
      if (allTasks[x].status == 0) {
        notStarted.push(allTasks[x]);
      }
      if (allTasks[x].status == 1) {
        inProgress.push(allTasks[x]);
      }
      if (allTasks[x].status == 2) {
        completed.push(allTasks[x]);
      }
    }

    setNotStarted(notStarted);
    setInProgres(inProgress);
    setCompleted(completed);
  }

  async function setTask(task, value) {
    if (value == 0) {
      const apiCall = await api.post('/tasks/notStarted', { id: task.taskID });
    }
    if (value == 1) {
      const apiCall = await api.post('/tasks/inProgress', { id: task.taskID });
    }
    if (value == 2) {
      const apiCall = await api.post('/tasks/completed', { id: task.taskID });
    }
    task.status = value;
    sortTasks(tasks);
  }

  async function setAssigned(task, email) {
    let myUser = null;
    for (let x = 0; x < users.length; x++) {
      if (users[x].email == email) {
        myUser = users[x];
      }
    }
    task.userId = myUser;
    const callApi = await api.post('/tasks/assign', { taskId: task.taskID, userId: myUser.id });
  }

  function findUserById(id) {
    let name = '';
    for (let x = 0; x < users.length; x++) {
      if (users[x].id == id) {
        name = users[x].firstName + ' ' + users[x].lastName;
      }
    }

    return name;
  }

  const deleteProject = async () => {
    const callApi = await api.del('/projects' + project.id);

    navigate('/');
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
      <div className="bg-gray-600 p-3 grid grid-cols-2 text-center text-3xl">
        <div className="pt-6 text-white">{project.title}</div>
        <div>
          {canDelete && (
            <button
              className="shadow-md m-4 text-center bg-gray-300 rounded-md text-2xl p-3"
              onClick={() => navigate('/add_user', (projectId = project.id))}
            >
              Add User to project
            </button>
          )}
          <button
            className="shadow-md m-4 text-center bg-gray-300 rounded-md text-2xl p-3"
            onClick={() => navigate('/create_task', (projectId = project.id))}
          >
            Create New Task
          </button>
          {canDelete && (
            <button
              className="shadow-md m-4 text-center bg-red-500 rounded-md text-2xl p-3 text-white"
              onClick={deleteProject}
            >
              Delete Project
            </button>
          )}
          {/* <button
            className="shadow-md m-4 text-center bg-red-500 rounded-md text-2xl p-3 text-white"
            onClick={deleteProject}
          >
            Delete Project
          </button> */}
        </div>
      </div>
      <div className="grid grid-cols-3 h-full m-3">
        <div className="grid-flow-row bg-gray-300 rounded-md m-1">
          <h1 className="text-center text-3xl bg-gray-400 rounded-t-md rounded-tr-md">Not started</h1>
          {notStarted.map((task) => (
            <TaskWidget
              title={task.title}
              description={task.description}
              timeEstimation={task.timeEstimation}
              assigned={findUserById(task.userId)}
              increaseProgress={() => setTask(task, 1)}
              progress={0}
              people={people}
              onValueChange={(e) => setAssigned(task, e.target.value)}
            ></TaskWidget>
          ))}
        </div>
        <div className="grid-flow-row bg-red-300 rounded-md m-1">
          <h1 className="text-center text-3xl bg-red-400 rounded-t-md rounded-tr-md">In progress</h1>
          {inProgress.map((task) => (
            <TaskWidget
              title={task.title}
              description={task.description}
              timeEstimation={task.timeEstimation}
              assigned={findUserById(task.userId)}
              increaseProgress={() => setTask(task, 2)}
              decreaseProgress={() => setTask(task, 0)}
              progress={1}
              people={people}
            ></TaskWidget>
          ))}
        </div>
        <div className="grid-flow-row bg-green-300 rounded-md m-1">
          <h1 className="text-center text-3xl bg-green-400 rounded-t-md rounded-tr-md">Completed</h1>
          {completed.map((task) => (
            <TaskWidget
              title={task.title}
              description={task.description}
              timeEstimation={task.timeEstimation}
              assigned={findUserById(task.userId)}
              increaseProgress={() => setTask(task, 2)}
              decreaseProgress={() => setTask(task, 1)}
              progress={2}
              people={people}
            ></TaskWidget>
          ))}
        </div>
      </div>
    </div>
  );
};
