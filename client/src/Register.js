import { useState } from "react";
import axios from 'axios';

function Register () {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function registerUser (e){
        e.preventDefault();

        // a request to API
        axios.post('',);
    }

    return(
        <form action="">
            <input type="email" placeholder="email" value={email} onChange={e => setEmail(e.target.value)}/><br/>
            <input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)}/><br/>
            <button type="submit">register</button>
        </form>
    );
}

export default Register