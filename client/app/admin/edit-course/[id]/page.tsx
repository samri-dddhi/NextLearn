'use client'
import React from 'react'
import AdminSidebar from '../../../components/Admin/Sidebar/AdminSidebar'
import Heading from '../../../../app/utils/Heading'
import DashboardHeader from '../../../../app/components/Admin/DashboardHeader'
import EditCourse from '../../../components/Admin/Course/EditCourse'

type Props = {}

const page = ({params}:any) => {
const id = params?.id;

  return (
    <div>
         <Heading
         title="NextLearn - Admin"
            description="NextLearn is a cutting-edge online learning platform that offers a wide range of courses to help you enhance your skills and knowledge. Join us today and start your learning journey!"
            keywords="NextLearn, Online Learning, Courses, Education, E-learning, Skill Development"
          />
<div className='flex'>
    <div className='1500px:w-[16%] w-1/5'>
    <AdminSidebar />
    </div>
    <div className='w-[85%]'>
      <DashboardHeader />
      <EditCourse id={id} />
    </div>
</div>
    </div>
  )
}

export default page