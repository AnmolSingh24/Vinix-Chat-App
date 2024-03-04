import GenderCheckbox from "./GenderCheckbox";

const Signup = () => {
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto border border-white rounded-lg shadow-2xl'>

      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <h1 className='text-3xl font-semibold text-center text-white'>Signup</h1>

        <form>

          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-white'>Fullname</span>
            </label>
            <input type='text' className='input w-full input-bordered h-10 bg-green-50' placeholder='John carlx' autoComplete="off" />
          </div>

          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-white'>Username</span>
            </label>
            <input type='text' className='input w-full input-bordered h-10 bg-green-50' placeholder='Enter Username' autoComplete="off" />
          </div>

          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-white'>Password</span>
            </label>
            <input type='password' className='input w-full input-bordered h-10 bg-green-50' placeholder='abc123' autoComplete="off" />
          </div>

          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-white'>Confirm Password</span>
            </label>
            <input type='password' className='input w-full input-bordered h-10 bg-green-50' placeholder='abc123' autoComplete="off" />
          </div>

          <GenderCheckbox/>

          <div>
            <button className='btn btn-block btn-sm mt-3 text-white'>Signup</button>
          </div>

          <p className='text-white'>Already have an account? <a href="#" className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block text-white'>
            Login</a></p>
        </form>
      </div>
    </div>
  );
}

export default Signup



// STARTER CODE FOR THE SIGNUP COMPONENT
// import GenderCheckbox from "./GenderCheckbox";

// const Signup = () => {
//   return (
//     <div className='flex flex-col items-center justify-center min-w-96 mx-auto border border-white rounded-lg shadow-2xl'>

//       <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
//         <h1 className='text-3xl font-semibold text-center text-white'>Signup</h1>

//         <form>

//           <div>
//             <label className='label p-2'>
//               <span className='text-base label-text text-white'>Fullname</span>
//             </label>
//             <input type='text' className='input w-full input-bordered h-10 bg-green-50' placeholder='John carlx' autoComplete="off" />
//           </div>

//           <div>
//             <label className='label p-2'>
//               <span className='text-base label-text text-white'>Username</span>
//             </label>
//             <input type='text' className='input w-full input-bordered h-10 bg-green-50' placeholder='Enter Username' autoComplete="off" />
//           </div>

//           <div>
//             <label className='label p-2'>
//               <span className='text-base label-text text-white'>Password</span>
//             </label>
//             <input type='password' className='input w-full input-bordered h-10 bg-green-50' placeholder='abc123' autoComplete="off" />
//           </div>

//           <div>
//             <label className='label p-2'>
//               <span className='text-base label-text text-white'>Confirm Password</span>
//             </label>
//             <input type='password' className='input w-full input-bordered h-10 bg-green-50' placeholder='abc123' autoComplete="off" />
//           </div>

//           <GenderCheckbox/>

//           <div>
//             <button className='btn btn-block btn-sm mt-3 text-white'>Signup</button>
//           </div>

//           <p className='text-white'>Already have an account? <a href="#" className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block text-white'>
//             Login</a></p>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Signup