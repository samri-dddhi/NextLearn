// import Image from "next/image";
// import Link from "next/link";
// import React, { FC } from "react";
// import { BiSearch } from "react-icons/bi";

// const Hero: FC = () => {
//   return (
//     <div className="w-full 1000px:flex items-center">
//       {/* Hero Image Section */}
//       <div className="absolute top-[100px] 1000px:top-[unset] 1500px:h-[700px] 1500px:w-[700px] 1100px:h-[600px] 1100px:w-[600px] h-[50vh] w-[50vh] hero_animation rounded-full">
//         <div className="1000px:w-[40%] flex 1000px:min-h-screen items-center justify-end pt-[70px] 1000px:pt-[0] z-10">
//           <Image
//             src="/hero-image.png" // Add your hero image path here
//             alt="Hero"
//             width={500}
//             height={500}
//             className="object-contain 1100px:max-w-[90%] w-[90%] 1500px:max-w-[85%] h-[auto] z-[10]"
//           />
//         </div>
//        </div>
//       {/* Hero Content */}
//       <div className="1000px:w-[60%] flex flex-col items-center 1000px:mt-[0px] text-center 1000px:text-left mt-[150px]">
//         <h2 className="dark:text-white text-[#000000c7] text-[30px] px-3 w-full 1000px:text-[70px] font-[600] font-Josefin py-2 1000px:leading-[75px] 1500px:w-[60%]">
//           Improve Your Online Learning Experience Better Instantly
//         </h2>
//         <br />
//         <p className="dark:text-[#edfff4] text-[#000000ac] font-Josefin font-[600] text-[18px] 1500px:!w-[55%] 1100px:!w-[78%]">
//           We have 40k+ online courses & 500k+ online registered student. Find your desired courses from them.
//         </p>
//         <br />
//         <br />
//         {/* Search Bar */}
//         <div className="1500px:w-[55%] 1100px:w-[78%] w-[90%] h-[50px] bg-transparent relative">
//           <input
//             type="search"
//             placeholder="Search Courses..."
//             className="bg-transparent border dark:border-none dark:bg-[#575757] dark:placeholder:text-[#ffffffdd] rounded-[5px] p-2 w-full h-full outline-none text-[#0000004e] dark:text-[#ffffffe6] text-[20px] font-[500] font-Josefin"
//           />
//           <div className="absolute flex items-center justify-center w-[50px] cursor-pointer h-[50px] right-0 top-0  bg-[#39c1f3] rounded-r-[5px]">
//             <BiSearch className="text-white" size={30} />
//           </div>
//         </div>
//         <br />
//         <br />
//         <div className="1500px:w-[55%] 1100px:w-[78%] w-[90%] flex items-center">
//           <Image
//             src="/avatar1.jpg"
//             alt="Student 1"
//             width={50}
//             height={50}
//             className="rounded-full"
//           />
//           <Image
//             src="/avatar2.jpg" // Add your avatar image path
//             alt="Student 2"
//             width={50}
//             height={50}
//             className="rounded-full ml-[-20px]"
//           />
//           <Image
//             src="/avatar3.jpg" // Add your avatar image path
//             alt="Student 3"
//             width={50}
//             height={50}
//             className="rounded-full ml-[-20px]"
//           />
//         <p className="font-Josefin dark:text-[#edfff4] text-[#000000b3] 1000px:pl-3 text-[18px] font-[600]">
//           500k+ People already trusted us.
//         <Link href="/courses" className="dark:text-[#46e256] text-[crimson]">
//           View Courses
//         </Link>
//         </p>
//     </div>
//     <br />
//       </div>
//        </div>
//   );
// };

// export default Hero;

"use client";

import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { BiSearch } from "react-icons/bi";

const Hero: FC = () => {
  const {data,refetch} = useGetHeroDataQuery("Banner",{});
  return (
    <div className="relative w-full 1000px:flex items-center">
      {/* Hero Image Section (left) */}
     {/* <div className="absolute top-[100px] 1000px:top-[unset] left-0 1500px:h-[560px] 1500px:w-[560px] 1100px:h-[470px] 1100px:w-[470px] w-[38vh] h-[38vh] hero_animation rounded-full" /> */}
      <div className="1000px:w-[50%] 1000px:h-[70%] flex 1000px:min-h-screen items-center justify-end pt-[70px] 1000px:pt-[0] z-10 ">
        <Image
          src={"/hero-image.png"} 
          alt="Hero"
          width={800}
          height={800}
          className="object-contain max-w-full h-full z-10"
          priority
        />
      </div>
      {/* Hero Content (right) */}
      <div className="1000px:w-[60%] flex flex-col items-center 1000px:mt-0 text-center 1000px:text-left mt-[150px]">
        <h2 className="dark:text-white text-[#000000c7] text-[26px] px-3 w-full 1000px:text-[56px] font- font-Josefin py-2 1000px:leading-[62px] 1500px:w-[60%]">
         {data?.layout?.banner?.title}
        </h2>

        <br />

        <p className="dark:text-[#edfff4] text-[#000000ac] font-Josefin font- text-[16px] 1500px:!w-[55%] 1100px:!w-[78%]">
          {data?.layout?.banner?.subtitle}
        </p>

        <br />
        <br />

        {/* Search Bar */}
        <div className="1500px:w-[55%] 1100px:w-[78%] w-[90%] h-[50px] bg-transparent relative">
          <input
            type="search"
            placeholder="Search Courses..."
            className="bg-transparent border dark:border-none dark:bg-[#575757] dark:placeholder:text-[#ffffffdd] rounded-[5px] p-2 w-full h-full outline-none text-[#0000004e] dark:text-[#ffffffe6] text-[16px] font- font-Josefin"
          />
          <div className="absolute flex items-center justify-center w-[50px] cursor-pointer h-[50px] right-0 top-0 bg-[#39c1f3] rounded-r-[5px]">
            <BiSearch className="text-white" size={30} />
          </div>
        </div>

        <br />
        <br />

        {/* Trust row */}
        <div className="1500px:w-[55%] 1100px:w-[78%] w-[90%] flex items-center">
          <Image
            src="/avatar1.jpg" // your avatar
            alt="Student 1"
            width={40}
            height={40}
            className="rounded-full aspect-square object-cover border-2 border-white shadow"
          />
          <Image
            src="/avatar2.jpg"
            alt="Student 2"
            width={40}
            height={40}
            className="rounded-full aspect-square object-cover border-2 border-white shadow ml-[-20px]"
          />
          <Image
            src="/avatar3.jpg"
            alt="Student 3"
            width={40}
            height={40}
            className="rounded-full aspect-square object-cover border-2 border-white shadow ml-[-20px]"
          />
          <p className="font-Josefin dark:text-[#edfff4] text-[#000000b3] 1000px:pl-3 text-[16px] font-">
            Trusted by 500,000+ learners worldwide.
            <Link
              href="/courses"
              className="ml-1 dark:text-[#46e256] text-[crimson]"
            >
              View Courses
            </Link>
          </p>
        </div>

        <br />
      </div>
    </div>
  );
};

export default Hero;

