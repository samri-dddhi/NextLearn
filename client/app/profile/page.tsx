'use client'
import React, { FC, useState } from 'react' 
import Protected from '../hooks/useProtected'
import Header from '../components/Header'
import Heading from '../utils/Heading'
import { useSelector } from 'react-redux'
import Profile from '../components/Profile/Profile'

type Props = {}
  
const Page: FC<Props> = (props) => {
     const [open, setOpen] = useState(false);
      const [activeItem, setActiveItem] = useState(5);
      const [route, setRoute] = useState('Login');
      const {user} = useSelector  ((state:any) => state.auth);
  return (
    <div>
        <Protected>
            <Heading
    title={`${user?.name}'s Profile`}
    description="NextLearn is a modern platform to master real-world skills through expert-led courses, interactive learning, and verifiable certificates."
    keywords='Programming, Web Development, Next.js, React, Courses, Learning, Skills'
  />
  <Header
    open={open}
    setOpen={setOpen}
    activeItem={activeItem}
    setRoute={setRoute}
    route={route}
  />
  <Profile user={user} />
        </Protected>

    </div>
  )
}
export default Page