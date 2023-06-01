import { useState } from "react";

function Register () {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    return(
        <form action="">
            <input type="email" placeholder="email" value={email} onChange={e => setEmail(e.target.value)}/><br/>
            <input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)}/><br/>
            <button type="submit">register</button>
        </form>
    );
}

export default Register