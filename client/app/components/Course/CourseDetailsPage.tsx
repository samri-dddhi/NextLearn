import React,{useState} from 'react'
import { useGetCourseDetailsQuery } from '../../../redux/features/courses/coursesApi';
import Heading from '../../../app/utils/Heading';
import Loader from '../Loader/Loader';
import Header from '../Header';
import CourseDetails from './CourseDetails';
import Footer from '../Footer';

type Props = {
    id: string;
}

const CourseDetailsPage = ({id}: Props) => {
    const [route, setRoute] = useState("Login");
    const [open, setOpen] = useState(false);
    const { data, isLoading } = useGetCourseDetailsQuery(id);

  return (
  <>
  {
    isLoading ? (
        <Loader />
    ) : (
        <div>
            <Heading
            title={data?.course?.name + "-NextLearn"}
            description={data?.course?.description}
            keywords={data?.course?.tags}
            />
<Header
open={open}
setOpen={setOpen}
activeItem={1}
setRoute={setRoute}
route={route}
/>
<CourseDetails
data={data?.course}
/>
<Footer />
           </div>
    )
  }
  </>
  )
}

export default CourseDetailsPage