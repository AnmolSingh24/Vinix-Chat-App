import { useState } from "react";
import { Link } from "react-router-dom";
import userLogin from "../../hooks/userLogin";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const {loading, login} = userLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(username, password);
    }

    return (
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto border border-white rounded-lg shadow-2xl'>

            <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
                <h1 className='text-3xl font-semibold text-center text-white'>Login</h1>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text text-white'>Username</span>
                        </label>
                        <input type='text' name='username' className='input w-full input-bordered h-10 bg-green-50 text-black' placeholder='Enter Username' autoComplete="off"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text text-white'>Password</span>
                        </label>
                        <input type='password' name='password' className='input w-full input-bordered h-10 bg-green-50 text-black' placeholder='Enter Password' autoComplete="off"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div>
                        <button className='btn btn-block btn-sm mt-3 bg-emerald-600 hover:bg-emerald-700 border-none text-white' disabled={loading}>{loading ? <span className="loading loading-spinner"></span> : "Login"}</button>
                    </div>

                    <p className='text-white'>Don't have an account? <Link to="/signup" className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block text-white'>
                       Signup</Link></p>
                </form>
            </div>
        </div>
    );
}

export default Login