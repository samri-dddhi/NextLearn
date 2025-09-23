// import React,{FC, useState} from 'react'
// import { styles } from '@/app/styles/style';
// type Props = {}

// const ChangePassword: FC<Props> = (props) => {
//   const [oldPassword, setOldPassword] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

//   const passwordChangeHandler = (e: any) => {
//   };

//   return (
//     <div className='w-full pl-7 px-2 800px:px-5 800px:pl-0'>
//         <h1 className='block text-[25px] 800px:text-[30px] font-Poppins text-center font-[500] text-black dark:text-[#fff] pb-2'>
//             ChangePassword
//             </h1>
//             <div className='w-full'>
//                 <form
//                 onSubmit={passwordChangeHandler}
//                 className='flex flex-col items-center'>
//                     <div className='w-[100%] 800px:w-[60%] mt-5'>
//                         <label className='block pb-2 text-black dark:text-[#fff]'>Enter Your Old Password</label>
//                         <input type="password"
//                         className={`${styles.input} !w-[95%] mb-4 800px:mb-0 text-black dark:text-[#fff]`}
//                         required
//                         value={oldPassword}
//                         onChange={(e) => setOldPassword(e.target.value)}
//                         />
//                     </div>
//                     <div className='w-[100%] 800px:w-[60%] mt-2'>
//                         <label className='block pb-2 text-black dark:text-[#fff]'>Enter Your New Password</label>
//                         <input type="password"
//                         className={`${styles.input} !w-[95%] mb-4 800px:mb-0 text-black dark:text-[#fff]`}
//                         required
//                         value={newPassword}
//                         onChange={(e) => setNewPassword(e.target.value)}
//                         />
//                     </div>
//                     <div className='w-[100%] 800px:w-[60%] mt-2'>
//                         <label className='block pb-2 text-black dark:text-[#fff]'>Confirm Your New Password</label>
//                         <input type="password"
//                         className={`${styles.input} !w-[95%] mb-4 800px:mb-0 text-black dark:text-[#fff]`}
//                         required
//                         value={confirmPassword}
//                         onChange={(e) => setConfirmPassword(e.target.value)}
//                         />
//                         <input type="submit"
//                         required
//                         value="Update"
//                         className={`w-[95%] h-[40px] border border-[#37a39a] text-center text-black dark:text-[#fff] rounded-[3px] mt-8 cursor-pointer`} />
//                     </div>
//                 </form>
//             </div>
//         </div>
//   )
// }
// export default ChangePassword;

import React, { FC, useEffect, useState } from "react";
import { styles } from "@/app/styles/style";
import { useUpdatePasswordMutation } from "@/redux/features/user/userApi";
import toast from "react-hot-toast";

type Props = {};

const ChangePassword: FC<Props> = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updatePassword, { isSuccess, error }] = useUpdatePasswordMutation();

  const passwordChangeHandler = async (e: any) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Password do not match");
    } else {
      await updatePassword({ oldPassword, newPassword });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Password updated successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[70vh] py-6">
      <div className="w-full max-w-md bg-[#111827] rounded-xl shadow-lg p-8 flex flex-col items-center">
        <h1 className="text-2xl md:text-3xl font-semibold font-Poppins text-center text-black dark:text-white mb-6">
          Change Password
        </h1>
        <form
          onSubmit={passwordChangeHandler}
          className="w-full flex flex-col gap-4"
        >
          <div>
            <label className="block pb-1 text-gray-200 text-sm">
              Old Password
            </label>
            <input
              type="password"
              className={`${styles.input} w-full text-black dark:text-white`}
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Enter your old password"
            />
          </div>
          <div>
            <label className="block pb-1 text-gray-200 text-sm">
              New Password
            </label>
            <input
              type="password"
              className={`${styles.input} w-full text-black dark:text-white`}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
            />
          </div>
          <div>
            <label className="block pb-1 text-gray-200 text-sm">
              Confirm New Password
            </label>
            <input
              type="password"
              className={`${styles.input} w-full text-black dark:text-white`}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter new password"
            />
          </div>
          <button
            type="submit"
            className="w-full h-10 bg-[#37a39a] text-white rounded-[3px] mt-4 font-semibold transition hover:bg-[#2d837b]"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
