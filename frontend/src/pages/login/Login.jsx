const Login = () => {
    return (
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto border border-white rounded-lg shadow-2xl'>

            <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
                <h1 className='text-3xl font-semibold text-center text-white'>Login</h1>

                <form>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text text-white'>Username</span>
                        </label>
                        <input type='text' name='username' className='input w-full input-bordered h-10 bg-green-50' placeholder='Enter Username' autoComplete="off" />
                    </div>

                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text text-white'>Password</span>
                        </label>
                        <input type='password' name='password' className='input w-full input-bordered h-10 bg-green-50' placeholder='Enter Password' autoComplete="off" />
                    </div>

                    <div>
                        <a href="#" className='text-white hover:underline hover:text-blue-600'>Forgot Password?</a>
                    </div>

                    <div>
                        <button className='btn btn-block btn-sm mt-3 text-white'>Login</button>
                    </div>

                    <p className='text-white'>Don't have an account? <a href="#" className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block text-white'>
                       Signup</a></p>
                </form>
            </div>
        </div>
    );
}

export default Login




//STARTER CODE FOR THE LOGIN COMPONENT

// const Login = () => {
//     return (
//         <div className='flex flex-col items-center justify-center min-w-96 mx-auto border border-white rounded-lg shadow-2xl'>

//             <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
//                 <h1 className='text-3xl font-semibold text-center text-white'>Login</h1>

//                 <form>
//                     <div>
//                         <label className='label p-2'>
//                             <span className='text-base label-text text-white'>Username</span>
//                         </label>
//                         <input type='text' name='username' className='input w-full input-bordered h-10 bg-green-50' placeholder='Enter Username' autoComplete="off" />
//                     </div>

//                     <div>
//                         <label className='label p-2'>
//                             <span className='text-base label-text text-white'>Password</span>
//                         </label>
//                         <input type='password' name='password' className='input w-full input-bordered h-10 bg-green-50' placeholder='Enter Password' autoComplete="off" />
//                     </div>

//                     <div>
//                         <a href="#" className='text-white hover:underline hover:text-blue-600'>Forgot Password?</a>
//                     </div>

//                     <div>
//                         <button className='btn btn-block btn-sm mt-3 text-white'>Login</button>
//                     </div>

//                     <p className='text-white'>Don't have an account? <a href="#" className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block text-white'>
//                        Signup</a></p>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default Login