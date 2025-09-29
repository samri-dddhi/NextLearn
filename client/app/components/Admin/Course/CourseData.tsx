import React, { FC } from "react";
import { styles } from "@/app/styles/style";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import toast from "react-hot-toast";

type Props = {
  benefits: { title: string }[];
  setBenefits: (benefits: { title: string }[]) => void;
  prerequisites: { title: string }[];
  setPrerequisites: (prerequisites: { title: string }[]) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseData: FC<Props> = ({
  benefits,
  setBenefits,
  prerequisites,
  setPrerequisites,
  active,
  setActive,
}) => {
  const handleBenefitChange = (index: number, value: string) => {
    const updatedBenefits = [...benefits];
    updatedBenefits[index].title = value;
    setBenefits(updatedBenefits);
  };

  const handleAddBenefit = () => {
    setBenefits([...benefits, { title: "" }]);
  };
  const handlePrerequisitesChange = (index: number, value: string) => {
    const updatedPrerequisites = [...prerequisites];
    updatedPrerequisites[index].title = value;
    setPrerequisites(updatedPrerequisites);
  };
  const handleAddPrerequisites = () => {
    setPrerequisites([...prerequisites, { title: "" }]);
  };
    const prevButton = () => {
    setActive(active - 1);
  };
  const handleOptions = () => {
    if(benefits[benefits.length - 1]?.title !== "" && prerequisites[prerequisites.length - 1]?.title !== "") {
    setActive(active + 1);
    }
    else{
        toast.error("Please fill all the fields");
    }
  };
  return (
    <div className="w-[80%] m-auto mt-24 block">
      <div>
        <label className={`${styles.label} text-[20px]`} htmlFor="email">
          What are the benefits of this course?
        </label>
        <br />
        {benefits.map((benefit, index) => (
          <input
            type="text"
            key={index}
            value={benefit.title}
            onChange={(e) => handleBenefitChange(index, e.target.value)}
            placeholder="e.g. Learn at your own pace"
            className={`${styles.input} my-2`}
          />
        ))}
        <AddCircleIcon
          style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
          onClick={handleAddBenefit}
        />
      </div>
      <br />
      <div>
        <label className={`${styles.label} text-[20px]`} htmlFor="email">
          What are the prerequisites of this course?
        </label>
        <br />
        {prerequisites.map((prerequisite, index) => (
          <input
            type="text"
            key={index}
            value={prerequisite.title}
            onChange={(e) => handlePrerequisitesChange(index, e.target.value)}
            placeholder="e.g. Basic understanding of programming"
            className={`${styles.input} my-2`}
          />
        ))}
        <AddCircleIcon
          style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
          onClick={handleAddPrerequisites}
        />
      </div>
      <div className="w-full flex items-center justify-between">
        <div
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#39c1f3] text-center text-[#fff] rounded mt-8 cursor-pointer"
          onClick={() => prevButton()}
        >
          Previous
        </div>
        <div
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#39c1f3] text-center text-[#fff] rounded mt-8 cursor-pointer"
          onClick={() => handleOptions()}
        >
          Next
        </div>
      </div>
    </div>
  );
};
export default CourseData;
