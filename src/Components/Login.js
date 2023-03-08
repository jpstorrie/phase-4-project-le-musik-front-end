import {useState} from "react";
import {useHistory} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Login({updateUser}){
  const [formData, setFormData] = useState({username: "", password: ""});
  const [errors, setErrors] = useState([]);
  // const history = useHistory();

  const {username, password} = formData;

  function onSubmit(e) {
    e.preventDefault();
    const user = {
      username,
      password
    }

    const loginObj = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(user)
    }

    fetch('/login', loginObj)
    .then(r => {
      if (r.ok) {
        r.json().then(user => {
          alert(user);
          // FIXME: Uncomment when complete
          // updateUser(user);
          // history.push(`/users/${user.id}`)
        })
      } else {
        r.json().then(json => setErrors(json.error))
      }
    })
    .then(data => console.log(data))
  }

  const handleChange = (e) => {
    const {name, value} = e.target;
    console.log('name:', name);
    console.log('value:', value);
    setFormData({...formData, [name]: value});
  }

  return (
    <>
    <Form onClick={onSubmit}>
      <Form.Group className="mb-3" controlId="username">
        <Form.Label>Username: </Form.Label>
        <Form.Control type="text" name="username" placeholder="username" maxLength={20} onChange={handleChange} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" name="password" placeholder="password"  maxLength={20} onChange={handleChange} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
    </>
  )
}
export default Login;