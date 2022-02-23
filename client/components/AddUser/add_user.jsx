import { Paper } from '../common/paper';
import { Input } from '../common/input';
import { Button } from '../common/button';
import { useNavigate } from 'react-router';
import { ApiContext } from '../../utils/api_context';
import { useContext, useEffect, useState } from 'react';

export const AddUser = () => {
  const navigate = useNavigate();
  const api = useContext(ApiContext);

  const [userEmail, setUserEmail] = useState('');
  const [user, setUser] = useState(null);
  const [userAdded, setUserAdded] = useState(null);

  useEffect(async () => {
    const res = await api.get('/users/me');
    setUser(res.user);
    console.log('test');
    console.log(projectId);
  }, []);

  const addUser = async () => {
    let users = await api.get('/users');
    let myUser = null;
    console.log(projectId);
    for (let x = 0; x < users.users.length; x++) {
      if (users.users[x].email == userEmail) {
        console.log(users.users[x]);
        myUser = users.users[x];
      }
    }
    console.log("logging myuser")
    console.log(myUser)
    if (myUser !== null) {
      let worked = await api.post('/projects/newUser', {
        projectId: projectId,
        userId: myUser.id,
      });
      setUserAdded(true);
      navigate('/');
    }
    else {
      setUserAdded(false);
    }
  };

  return (
    <div className="flex flex-row justify-center m-4 mt-32">
      <div className="w-96">
        {userAdded == false && (
          <div>
            <h1>User not found. Please add an existing TaskTracker user</h1>
          </div>
        )}
        <Paper>
          <div>User Email</div>
          <Input type="text" onChange={(e) => setUserEmail(e.target.value)} />
          <div className="flex flex-row justify-center mt-2">
            <Button type="button" onClick={() => navigate('/')}>
              Cancel
            </Button>
            <div className="pl-2" />
            <Button type="button" onClick={addUser}>
              Add User
            </Button>
          </div>
        </Paper>
      </div>
    </div>
  );
};
