'use client'
import React , {FC, useState} from 'react';
import Heading from './utils/Heading'; 
import Header from './components/Header';
import Hero from './components/Route/Hero';

interface Props {}

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState('Login');
  return(
<div>
  <Heading
    title="NextLearn"
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
  <Hero />
</div>

  )
};

export default Page;
