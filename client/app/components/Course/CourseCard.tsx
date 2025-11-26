import React,{FC} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Ratings from '@/app/utils/Ratings';
import { AiOutlineUnorderedList } from 'react-icons/ai';
type Props = {
    item:any;
    isProfile?:boolean;
}

const CourseCard: FC<Props> = ({item,isProfile}) => {
  return (
    <Link href={!isProfile ? `/course/${item._id}` : `course-access/${item._id}`} >
<div className='w-full min-h-[35vh] dark:bg-slate-500 dark:bg-opacity-20 backdrop-blur-sm bg-white cursor-pointer hover:shadow-xl transition-shadow duration-300 dark:shadow-[bg-slate-700] rounded-lg p-3 shadow-sm dark:shadow-inner'>
<Image src={item?.thumbnail?.url} width={500} height={300} objectFit="contain" className="rounded w-full" alt="" />
<br />
<h1 className='font-Poppins text-[16px] text-black dark:text-[#fff]'>
{item?.name}
</h1>
<div className='w-full flex items-center justify-between pt-2'>
 <Ratings rating ={item.ratings} />
 <h5 className={`text-black dark:text-white ${isProfile && "hidden 800px:inline"
}`}>
    {item.purchased} Students
 </h5>
</div>
<div className='w-full flex items-center justify-between pt-3'>
    <div className='flex '>
        <h3 className='font-Poppins text-[16px] text-black dark:text-white font-[600]'>
        {item?.price === 0 ? "Free" : `$${item?.price}`}
        </h3>
        <h5 className={`font-Poppins text-[16px] text-gray-500 dark:text-gray-300 font-[600] pl-2 ${item?.price === 0 ? "hidden" : "" } line-through`}>
            {item.estimatedPrice ? `$${item?.estimatedPrice}` : ""}

        </h5>
        </div>
        <div className='flex items-center'>
            <AiOutlineUnorderedList size={20} className='text-black dark:text-white' fill="#fff"/>
            <h5 className='font-Poppins text-[16px] text-gray-500 dark:text-gray-300 font-[600] pl-2'>
                {item?.courseData?.length} Lectures
            </h5>
        </div>
</div>
</div>

        </Link>
  )
}

export default CourseCard