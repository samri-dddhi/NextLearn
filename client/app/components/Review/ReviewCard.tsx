import React from "react";
import Image from "next/image";

type Props = {
  item: any;
};

const Ratings: React.FC<{ rating: number }> = ({ rating }) => {
  const rounded = Math.max(0, Math.min(5, Math.round(rating || 0)));
  return (
    <div className="flex items-center space-x-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          width="16"
          height="16"
          className={`w-4 h-4 ${
            i < rounded ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"
          }`}
          fill={i < rounded ? "currentColor" : "none"}
          stroke="currentColor"
        >
          <path d="M12 .587l3.668 7.431L23.5 9.75l-5.5 5.356L19.836 24 12 20.012 4.164 24l1.836-8.894L.5 9.75l7.832-1.732L12 .587z" />
        </svg>
      ))}
      <span className="text-sm text-gray-600 dark:text-gray-300 ml-2">
        {rating?.toFixed(1)}
      </span>
    </div>
  );
};

const ReviewCard = (props: Props) => {
  return (
    <div className="w-full h-max pb-4 dark:bg-slate-500 dark:bg-opacity-[0.20] border border-[#00000028] dark:border-[#ffffff1d] backdrop-blur shadow-[bg-slate-700] rounded-lg p-3 shadow-inner">
      <div className="flex w-full">
        <Image
          src={props.item.avatar}
          alt={props.item.name}
          width={50}
          height={50}
          className="rounded-full aspect-square object-cover border-2 border-white shadow"
        />
        <div className="800px:flex justify-between w-full hidden">
          <div className="pl-4">
            <h5 className="text-[20px] font-semibold text-black dark:text-white">
              {props.item.name}
            </h5>
            <h6 className="text-[16px] font-medium text-gray-600 dark:text-gray-300">
              {props.item.profession}
            </h6>
          </div>
          <Ratings rating={5} />
        </div>
        <div className="800px:hidden justify-between w-full flex flex-col">
          <div className="pl-4 ">
            <h5 className="text-[20px] font-semibold text-black dark:text-white">
              {props.item.name}
            </h5>

            <h6 className="text-[16px] font-medium text-gray-600 dark:text-gray-300">
              {props.item.profession}
            </h6>
          </div>
          <Ratings rating={5} />
        </div>

      </div>
      <p className="text-gray-700 dark:text-gray-200 mt-4 text-[16px] font-">
        {props.item.comment}
      </p>
    </div>
  );
};

export default ReviewCard;
