import { useEffect, useState } from "react"
import fetchJSON from '../functions/fetchJSON'
const Login = () => {

  const [users, setUsers] = useState([]);

  useEffect(() => {
        
    const apiReq = `http://localhost:3500/users`


    const getUsers = async () => {
        const data = await fetchJSON(apiReq);
        console.log(data);
        setUsers(data);
    }
    getUsers();
}, [])

  return (
    <ul className="login__temp">
      {users &&
      users.map((user, i) => {
        return <li key={i}>username = {user.username}</li>
      })}
    </ul>  
  )
}

export default Login