// import React,{FC, useState} from 'react'
// import Image from 'next/image'
// import {styles} from "../../../app/styles/style";
// import {AiOutlineCamera} from "react-icons/ai"
// import avatarIcon from "../../../public/avatar.jpg"

// type Props = {
//     avatar:string | null;
//     user: any;
// }

// const ProfileInfo:FC<Props> = ({avatar, user}) => {
//     const [name, setName] = useState(user && user?.name);
//     const imageHandler = async (e:any) => {
//         console.log('gggg');
//     }

//     const handleSubmit = async(e:any)=>{
//         console.log("submit");
//     };
//   return (
//     <>
//     <div className='w-full flex justify-center'>
//         <div className='relative'>
//             <Image
//             src={ user?.avatar?.url || avatar || avatarIcon}
//             alt="avatar"
//             className='w-[120px] h-[120px] cursor-pointer border-[3px] border-[#37a39a] rounded-full'
// />
// <input
// type="file"
// name=""
// id="avatar"
// className='hidden'
// onChange={imageHandler}
// accept='image/*'/>

// <label htmlFor='avatar'>
//     <div className='w-[30px] h-[30px] bg-slate-900 rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer'>
//         <AiOutlineCamera size={20} className='z-1'/>
//     </div>
// </label>
// </div>
// </div>
// <br />
// <br />
// <div className='w-full pl-6 800px:pl-10'>
//     <form onSubmit={handleSubmit}>
//         <div className='800px:w-[50%] m-auto block pb-4'>
//             <div className='w-[100%]'>
//                 <label className="block pb-2">Full Name </label>
//                 <input
//                     type="text"
//                     required
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
//                 />
//             </div>
//             <div className='w-[100%] pt-2'>
//                 <label className="block pb-2">Email Address</label>
//                 <input
//                     type="email"
//                     readOnly
//                     value={user?.email}
//                     className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
//                     required
//                 />
//             </div>
//             <input
//             className={`w-full 800px:w-[250px] h-[40px] border border-[#37a39a] text-center dark:text-[#fff] text-black rounded-[3px] mt-8 cursor-pointer`}
//             required
//             value="Update"
//             type='submit'
//             />
//         </div>
//     </form>
// <br />
// </div>
//     </>
//   );
// };
// export default ProfileInfo

import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import { styles } from "../../../app/styles/style";
import { AiOutlineCamera } from "react-icons/ai";
import avatarIcon from "../../../public/avatar.jpg";
import { useUpdateAvatarMutation } from "@/redux/features/user/userApi";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";

type Props = {
  avatar: string | null;
  user: any;
};

const ProfileInfo: FC<Props> = ({ avatar, user }) => {
  const [name, setName] = useState(user && user?.name);
  const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation();
  const [loadUser, setLoadUser] = useState(false);
  const { data: userData } = useLoadUserQuery(undefined, { skip: loadUser ? false : true });

  const imageHandler = async (e: any) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const avatar = fileReader.result;
        updateAvatar(avatar);
      }
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (isSuccess) {
     setLoadUser(true);
    }
    if (error) {
      console.log("Error updating avatar:", error);
    }
}, [isSuccess, error]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("submit");
  };

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[80vh] py-8">
      <div className="bg-[#111827] rounded-xl p-8 flex flex-col md:flex-row items-center md:items-start gap-10 shadow-lg">
        {/* Avatar + upload */}
        <div className="relative">
          <Image
            src={user?.avatar?.url || avatar || avatarIcon}
            alt="avatar"
            width={120}
            height={120}
            className="w-[120px] h-[120px] cursor-pointer border-[3px] border-[#37a39a] rounded-full"
          />
          <input
            type="file"
            id="avatar"
            name=""
            className="hidden"
            onChange={imageHandler}
            accept="image/*"
          />
          <label htmlFor="avatar">
            <div className="w-[36px] h-[36px] bg-slate-900 rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer border-2 border-white">
              <AiOutlineCamera size={20} className="z-10 text-white" />
            </div>
          </label>
        </div>

        {/* Profile form */}
        <form
          onSubmit={handleSubmit}
          className="w-[260px] md:w-[320px] flex flex-col gap-4"
        >
          <div>
            <label className="block pb-1 text-sm text-gray-200">
              Full Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`${styles.input} w-full mb-1`}
            />
          </div>
          <div>
            <label className="block pb-1 text-sm text-gray-200">
              Email Address
            </label>
            <input
              type="email"
              readOnly
              value={user?.email}
              className={`${styles.input} w-full mb-1`}
              required
            />
          </div>
          <button
            className="w-full h-[40px] bg-[#37a39a] text-white rounded-[3px] mt-4 font-semibold transition hover:bg-[#2d837b]"
            type="submit"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};
export default ProfileInfo;
