// import { Link } from "react-router-dom";
// import GenderCheckbox from "./GenderCheckbox";
// import { useState } from "react";
// import useSignup from "../../hooks/useSignup";

// const Signup = () => {

//   const [inputs, setInputs] = useState({
//     fullname: '',
//     username: '',
//     password: '',
//     confirmPassword: '',
//     gender: ''
//   });

//   const {loading, signup} = useSignup();

//   const handleCheckboxChange = (gender) => {
//     setInputs({...inputs, gender});
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await signup(inputs);
//   }

//   return (
//     <div className='flex flex-col items-center justify-center min-w-96 mx-auto border border-white rounded-lg shadow-2xl'>

//       <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
//         <h1 className='text-3xl font-semibold text-center text-white'>Signup</h1>

//         <form onSubmit={handleSubmit}>

//           <div>
//             <label className='label p-2'>
//               <span className='text-base label-text text-white'>Fullname</span>
//             </label>
//             <input type='text' className='input w-full input-bordered h-10 bg-green-50' value={inputs.fullname} onChange={(e) => setInputs({...inputs, fullname: e.target.value})} placeholder='John carlx' autoComplete="off" />
//           </div>

//           <div>
//             <label className='label p-2'>
//               <span className='text-base label-text text-white'>Username</span>
//             </label>
//             <input type='text' className='input w-full input-bordered h-10 bg-green-50' value={inputs.username} onChange={(e) => setInputs({...inputs, username: e.target.value})} placeholder='Enter Username' autoComplete="off" />
//           </div>

//           <div>
//             <label className='label p-2'>
//               <span className='text-base label-text text-white'>Password</span>
//             </label>
//             <input type='password' className='input w-full input-bordered h-10 bg-green-50' value={inputs.password} onChange={(e) => setInputs({...inputs, password: e.target.value})} placeholder='abc123' autoComplete="off" />
//           </div>

//           <div>
//             <label className='label p-2'>
//               <span className='text-base label-text text-white'>Confirm Password</span>
//             </label>
//             <input type='password' className='input w-full input-bordered h-10 bg-green-50' value={inputs.confirmPassword} onChange={(e) => setInputs({...inputs, confirmPassword: e.target.value})} placeholder='abc123' autoComplete="off" />
//           </div>

//           <GenderCheckbox onCheckboxChange = {handleCheckboxChange} selectedGender={inputs.gender} />

//           <div>
//             <button className='btn btn-block btn-sm mt-3 text-white bg-emerald-800 hover:bg-emerald-600 border-none' disabled={loading}>
//               {loading ? <span className="loading loading-spinner"></span> : "Signup"}
//             </button>
//           </div>

//           <p className='text-white'>Already have an account? <Link to="/login" className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block text-white'>
//             Login</Link></p>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Signup


import { Link } from "react-router-dom";
import GenderCheckbox from "./GenderCheckbox";
import { useState } from "react";
import useSignup from "../../hooks/useSignup";
import toast from "react-hot-toast";

const Signup = () => {
  const [inputs, setInputs] = useState({
    fullname: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: ''
  });

  const { loading, signup } = useSignup();

  const handleCheckboxChange = (gender) => {
    setInputs({ ...inputs, gender });
  }

  const validateInputs = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])(?!.*\s).{6,20}$/;

    if (!inputs.fullname.trim()) {
      toast.error('Fullname is required');
      return false;
    }
    if (!inputs.username.trim()) {
      toast.error('Username is required');
      return false;
    }
    if (!inputs.email.trim()) {
      toast.error('Email is required');
      return false;
    } else if (!emailRegex.test(inputs.email)) {
      toast.error('Please enter valid email');
      return false;
    }
    if (!inputs.password.trim()) {
      toast.error('Password is required');
      return false;
    } else if (!passwordRegex.test(inputs.password)) {
      toast.error('Password must be at least 6 characters long and contain at least one digit, one lowercase letter, one uppercase letter, and one special character');
      return false;
    }
    if (inputs.password !== inputs.confirmPassword) {
      toast.error('Passwords do not match');
      return false;
    }
    if (!inputs.gender) {
      toast.error('Gender is required');
      return false;
    }

    return true;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateInputs()) {
      try {
        await signup(inputs);
        toast.success('Signup successful!');
      } catch (error) {
        toast.error(error.message);
      }
    }
  }

  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto border border-white rounded-lg shadow-2xl'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <h1 className='text-3xl font-semibold text-center text-white'>Signup</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-white'>Fullname</span>
            </label>
            <input type='text' className='input w-full input-bordered h-10 bg-green-50' value={inputs.fullname} onChange={(e) => setInputs({ ...inputs, fullname: e.target.value })} placeholder='John carlx' autoComplete="off" />
          </div>

          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-white'>Username</span>
            </label>
            <input type='text' className='input w-full input-bordered h-10 bg-green-50' value={inputs.username} onChange={(e) => setInputs({ ...inputs, username: e.target.value })} placeholder='Enter Username' autoComplete="off" />
          </div>

          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-white'>Email</span>
            </label>
            <input type='email' className='input w-full input-bordered h-10 bg-green-50' value={inputs.email} onChange={(e) => setInputs({ ...inputs, email: e.target.value })} placeholder='Enter Email' autoComplete="off" />
          </div>

          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-white'>Password</span>
            </label>
            <input type='password' className='input w-full input-bordered h-10 bg-green-50' value={inputs.password} onChange={(e) => setInputs({ ...inputs, password: e.target.value })} placeholder='abc123' autoComplete="off" />
          </div>

          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-white'>Confirm Password</span>
            </label>
            <input type='password' className='input w-full input-bordered h-10 bg-green-50' value={inputs.confirmPassword} onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })} placeholder='abc123' autoComplete="off" />
          </div>

          <GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />

          <div>
            <button className='btn btn-block btn-sm mt-3 text-white bg-emerald-800 hover:bg-emerald-600 border-none' disabled={loading}>
              {loading ? <span className="loading loading-spinner"></span> : "Signup"}
            </button>
          </div>

          <p className='text-white'>Already have an account? <Link to="/login" className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block text-white'>
            Login</Link></p>
        </form>
      </div>
    </div>
  );
}

export default Signup;