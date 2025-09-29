import React, { FC } from "react";
import { IoMdCheckmark } from "react-icons/io";
import { 
  MdInfo, 
  MdSettings, 
  MdPreview, 
  MdPlayCircleOutline,
  MdCircle 
} from "react-icons/md";

type Props = {
  active: number;
  setActive: (active: number) => void;
};

interface OptionStep {
  title: string;
  description: string;
  icon: React.ReactNode;
  isCompleted?: boolean;
}

const CourseOptions: FC<Props> = ({ active, setActive }) => {
  const options: OptionStep[] = [
    {
      title: "Course Information",
      description: "Basic course details and settings",
      icon: <MdInfo className="text-lg" />,
    },
    {
      title: "Course Options", 
      description: "Configure pricing and availability",
      icon: <MdSettings className="text-lg" />,
    },
    {
      title: "Course Preview",
      description: "Set up course preview and thumbnail", 
      icon: <MdPreview className="text-lg" />,
    },
    {
      title: "Course Content",
      description: "Add lessons, videos and materials",
      icon: <MdPlayCircleOutline className="text-lg" />,
    },
  ];

  const handleStepClick = (stepIndex: number) => {
    // Only allow navigation to completed steps or the next step
    if (stepIndex <= active + 1) {
      setActive(stepIndex);
    }
  };

  const isStepCompleted = (stepIndex: number) => active > stepIndex;
  const isStepActive = (stepIndex: number) => active === stepIndex;
  const isStepAccessible = (stepIndex: number) => stepIndex <= active + 1;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 h-[80vh] max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-gray-100 dark:scrollbar-track-gray-800">
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
          Course Setup Progress
        </h3>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${((active + 1) / options.length) * 100}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          Step {active + 1} of {options.length}
        </p>
      </div>

      <div className="space-y-2">
        {options.map((option, index) => (
          <div key={index} className="relative">
            {/* Connector Line */}
            {index < options.length - 1 && (
              <div
                className={`absolute left-[22px] top-[45px] w-0.5 h-[50px] transition-colors duration-300 ${
                  isStepCompleted(index) 
                    ? "bg-blue-500" 
                    : "bg-gray-300 dark:bg-gray-600"
                }`}
              />
            )}
            
            {/* Step Item */}
            <div 
              onClick={() => handleStepClick(index)}
              className={`flex items-start space-x-4 p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                isStepActive(index)
                  ? "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700"
                  : isStepAccessible(index)
                  ? "hover:bg-gray-50 dark:hover:bg-gray-700"
                  : "opacity-60 cursor-not-allowed"
              }`}
            >
              {/* Step Indicator */}
              <div className="flex-shrink-0 relative">
                <div
                  className={`w-[45px] h-[45px] rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    isStepCompleted(index)
                      ? "bg-blue-500 border-blue-500 text-white"
                      : isStepActive(index)
                      ? "bg-blue-100 dark:bg-blue-900 border-blue-500 text-blue-600 dark:text-blue-400"
                      : "bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-400"
                  }`}
                >
                  {isStepCompleted(index) ? (
                    <IoMdCheckmark className="text-xl" />
                  ) : isStepActive(index) ? (
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  ) : (
                    <MdCircle className="text-xl" />
                  )}
                </div>
                
                {/* Step Number Badge */}
                <div className="absolute -top-1 -right-1 bg-white dark:bg-gray-800 rounded-full border-2 border-gray-200 dark:border-gray-600 w-6 h-6 flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                    {index + 1}
                  </span>
                </div>
              </div>

              {/* Step Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <div className={`${
                    isStepActive(index) 
                      ? "text-blue-600 dark:text-blue-400" 
                      : "text-gray-500 dark:text-gray-400"
                  }`}>
                    {option.icon}
                  </div>
                  <h4 className={`font-medium text-base ${
                    isStepActive(index)
                      ? "text-blue-900 dark:text-blue-100"
                      : isStepCompleted(index)
                      ? "text-green-700 dark:text-green-400"
                      : "text-gray-700 dark:text-gray-300"
                  }`}>
                    {option.title}
                  </h4>
                  
                  {/* Status Indicator */}
                  {isStepCompleted(index) && (
                    <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs rounded-full font-medium">
                      Completed
                    </span>
                  )}
                  {isStepActive(index) && (
                    <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs rounded-full font-medium">
                      Current
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {option.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-between">
          <button
            onClick={() => active > 0 && setActive(active - 1)}
            disabled={active === 0}
            className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            ← Previous
          </button>
          <button
            onClick={() => active < options.length - 1 && setActive(active + 1)}
            disabled={active === options.length - 1}
            className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};
export default CourseOptions;
