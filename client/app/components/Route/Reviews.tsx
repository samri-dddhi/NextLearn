import React from "react";
import { styles } from "@/app/styles/style";
import Image from "next/image";
import ReviewCard from "../Review/ReviewCard";

type Props = {};
export const reviews = [
  {
    name: "John Doe",
    avatar: "/avatar1.jpg",
    profession: "Software Engineer",
    comment:
      "Great course! Learned a lot.I highly recommend it to anyone looking to improve their skills.You won't regret it.",
  },
  {
    name: "Jane Smith",
    avatar: "/avatar2.jpg",
    profession: "Data Scientist",
    comment:
      "This course exceeded my expectations. The content was well-structured and the instructor was very knowledgeable.",
  },
  {
    name: "Mike Johnson",
    avatar: "/avatar3.jpg",
    profession: "Web Developer",
    comment:
      "I found the course to be very informative and engaging. The practical examples helped me understand the concepts better.",
  },
  {
    name: "Emily Davis",
    avatar: "/avatar4.jpg",
    profession: "UI/UX Designer",
    comment:
      "As a designer, I appreciated the focus on user experience in this course. It provided valuable insights that I can apply to my work.",
  },
  {
    name: "David Wilson",
    avatar: "/avatar5.jpg",
    profession: "Project Manager",
    comment:
      "The course content was relevant and up-to-date. The instructor's teaching style made complex topics easy to understand.",
  },
  {
    name: "Sarah Brown",
    avatar: "/avatar6.jpg",
    profession: "Marketing Specialist",
    comment:
      "I learned so much from this course! The practical tips and strategies shared were incredibly useful for my marketing campaigns.",
  },
];

const Reviews = (props: Props) => {
  return (
    <div className="w-[90%] 800px:w-[85%] m-auto">
      <div className="w-full 800px:flex items-center">
        <div className="800px:w-[50%] w-full mt-10">
          <Image src="/ratings.png" alt="Ratings" width={600} height={600} />
        </div>
        <div className="800px:w-[50%] w-full">
          <h3 className={`${styles.title} 800px:!text-[40px]`}>
            Our Students Are <span className="text-blue-600">Our Strength</span>{" "}
            <br /> See What They Say About Us
          </h3>
          <br />
          <p className={`${styles.label} 800px:text-left text-center`}>
            We are committed to providing the best learning experience for our
            students. Here are some reviews from our satisfied learners.
          </p>
        </div>
        <br />
        <br />
      </div>
      <div className="grid grid-cols-1 gap-[25px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg:gap-[25px] xl:grid-cols-2 xl:gap-[35px] mb-12 border-0 md:[&>*:nth-child(odd)]:pr-2 lg:[&>*:nth-child(odd)]:pr-2 xl:[&>*:nth-child(odd)]:pr-3 [&>*:nth-child(odd)]:pr-0">
        {reviews &&
          reviews.map((i, index) => <ReviewCard key={index} item={i} />)}
      </div>
    </div>
  );
};

export default Reviews;
