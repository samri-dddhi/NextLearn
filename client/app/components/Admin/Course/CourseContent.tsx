import React from "react";
import { FC, useState } from "react";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { styles } from "@/app/styles/style";
import { BsLink45Deg, BsPencil } from "react-icons/bs";
import toast from "react-hot-toast";

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseContentData: any;
  setCourseContentData: (courseContentData: any) => void;
  handleSubmit: any;
};

const CourseContent: FC<Props> = ({
  courseContentData,
  setCourseContentData,
  active,
  setActive,
  handleSubmit: handleCourseSubmit,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(
    Array(courseContentData.length).fill(false)
  );

  const [activeSection, setActiveSection] = useState(1);

  // Initialize links array if it doesn't exist
  React.useEffect(() => {
    const hasChanges = courseContentData.some(
      (item: any) => !item.links || item.links.length === 0
    );

    if (hasChanges) {
      const updatedData = courseContentData.map((item: any) => ({
        ...item,
        links:
          item.links && item.links.length > 0
            ? item.links
            : [{ title: "", url: "" }],
      }));
      setCourseContentData(updatedData);
    }
  }, [courseContentData.length]); // Only run when new items are added
  const handleSubmit = (e: any) => {
    e.preventDefault();
    handleCourseSubmit();
  };
  const handleCollapseToggle = (index: number) => {
    const updatedCollapseState = [...isCollapsed];
    updatedCollapseState[index] = !updatedCollapseState[index];
    setIsCollapsed(updatedCollapseState);
  };
  const handleRemoveLink = (itemIndex: number, linkIndex: number) => {
    const updatedData = [...courseContentData];
    if (
      updatedData[itemIndex].links &&
      updatedData[itemIndex].links.length > 1
    ) {
      updatedData[itemIndex].links.splice(linkIndex, 1);
      setCourseContentData(updatedData);
    }
  };

  const handleAddLink = (index: number) => {
    const updatedData = [...courseContentData];
    if (!updatedData[index].links) {
      updatedData[index].links = [];
    }
    updatedData[index].links.push({ title: "", url: "" });
    setCourseContentData(updatedData);
  };

  const handleLinkChange = (
    itemIndex: number,
    linkIndex: number,
    field: string,
    value: string
  ) => {
    const updatedData = [...courseContentData];
    if (!updatedData[itemIndex].links) {
      updatedData[itemIndex].links = [];
    }
    if (!updatedData[itemIndex].links[linkIndex]) {
      updatedData[itemIndex].links[linkIndex] = { title: "", url: "" };
    }
    updatedData[itemIndex].links[linkIndex][field] = value;
    setCourseContentData(updatedData);
  };

  const newContentHandler = (item: any) => {
    if (
      item.title === "" ||
      item.videoUrl === "" ||
      item.description === "" ||
      item.links[0].title === "" ||
      item.links[0].url === ""
    ) {
      toast.error("Please fill all the fields before adding new content");
      return;
    } else {
      let newVideoSection = "";
      if (courseContentData.length > 0) {
        const lastVideoSection =
          courseContentData[courseContentData.length - 1].videoSection;

        if (lastVideoSection) {
          newVideoSection = lastVideoSection;
        }
      }
      const newContent = {
        videoUrl: "",
        title: "",
        description: "",
        videoSection: newVideoSection,
        link: [{ title: "", url: "" }],
      };
      setCourseContentData([...courseContentData, newContent]);
    }
  };
  const addNewSection = () => {
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].links[0].url === ""
    ) {
      toast.error("Please fill all the fields before adding new section");
      return;
    } else {
      setActiveSection(activeSection + 1);
      const newSection = {
        title: "",
        videoUrl: "",
        description: "",
        videoSection: `Untitled Section ${activeSection + 1}`,
        links: [{ title: "", url: "" }],
      };
      setCourseContentData([...courseContentData, newSection]);
    }
  };
  const prevButton = () => {
    setActive(active - 1);
  };
  const handleOptions = () => {
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].links[0].url === ""
    ) {
      toast.error("Please fill all the fields before proceeding");
    } else {
      setActive(active + 1);
      handleCourseSubmit();
    }
  };
  return (
    <div className="w-[85%] m-auto mt-8 p-4">
      <form onSubmit={handleSubmit}>
        {courseContentData?.map((item: any, index: number) => {
          const showSectionInput =
            index === 0 ||
            item.videoSection !== courseContentData[index - 1].videoSection;

          return (
            <div key={index}>
              <div
                className={`w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-5 ${
                  showSectionInput ? "mt-6" : "mt-4"
                }`}
              >
                {showSectionInput && (
                  <div className="mb-6 pb-4 border-b border-gray-200 dark:border-gray-600">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Section Name
                    </label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="text"
                        className="flex-1 text-lg font-semibold bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
                        value={item.videoSection || ""}
                        placeholder="Enter section name (e.g., Introduction, Advanced Topics)"
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].videoSection =
                            e.target.value || "Untitled Section";
                          setCourseContentData(updatedData);
                        }}
                      />
                      <BsPencil className="text-gray-500 dark:text-gray-400 text-lg" />
                    </div>
                    {(!item.videoSection ||
                      item.videoSection === "Untitled Section") && (
                      <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">
                        💡 Please provide a descriptive section name
                      </p>
                    )}
                  </div>
                )}

                <div className="flex w-full items-center justify-between my-2">
                  {isCollapsed[index] ? (
                    <div className="flex items-center space-x-3">
                      {item.title ? (
                        <div className="flex items-center space-x-2">
                          <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">
                            {index + 1}
                          </span>
                          <p className="font-medium text-gray-800 dark:text-white">
                            {item.title}
                          </p>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <span className="bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">
                            {index + 1}
                          </span>
                          <p className="text-gray-500 dark:text-gray-400 italic">
                            Untitled Video
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <span className="bg-blue-500 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </span>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                        Video Content {index + 1}
                      </h3>
                    </div>
                  )}
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      className={`p-2 rounded-lg transition-all duration-200 ${
                        index > 0
                          ? "hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 hover:text-red-600 cursor-pointer"
                          : "text-gray-300 dark:text-gray-600 cursor-not-allowed"
                      }`}
                      onClick={() => {
                        if (index > 0) {
                          const updatedData = [...courseContentData];
                          updatedData.splice(index, 1);
                          setCourseContentData(updatedData);
                        }
                      }}
                      title={
                        index > 0
                          ? "Delete this video"
                          : "Cannot delete the first video"
                      }
                    >
                      <AiOutlineDelete className="text-lg" />
                    </button>
                    <button
                      type="button"
                      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
                      onClick={() => handleCollapseToggle(index)}
                      title={
                        isCollapsed[index]
                          ? "Expand content"
                          : "Collapse content"
                      }
                    >
                      <MdOutlineKeyboardArrowDown
                        className={`text-xl text-gray-600 dark:text-gray-400 transition-transform duration-200 ${
                          isCollapsed[index] ? "rotate-180" : "rotate-0"
                        }`}
                      />
                    </button>
                  </div>
                </div>
                {!isCollapsed[index] && (
                  <div className="mt-4 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Video Title *
                      </label>
                      <input
                        type="text"
                        placeholder="Enter a descriptive video title"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
                        value={item.title || ""}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].title = e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                      {!item.title && (
                        <p className="text-xs text-red-500 mt-1">
                          Title is required
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Video URL *
                      </label>
                      <input
                        type="url"
                        placeholder="https://youtube.com/watch?v=... or https://vimeo.com/..."
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
                        value={item.videoUrl || ""}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].videoUrl = e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                      {!item.videoUrl && (
                        <p className="text-xs text-red-500 mt-1">
                          Video URL is required
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Video Description
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Provide a detailed description of what students will learn in this video"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 resize-vertical"
                        value={item.description || ""}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].description = e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                    </div>
                    {(item?.links || []).map((link: any, linkIndex: number) => (
                      <div className="mb-3 block" key={linkIndex}>
                        <div className="w-full flex items-center justify-between">
                          <label className={styles.label}>
                            Link {linkIndex + 1}
                          </label>
                          <AiOutlineDelete
                            className={`${
                              (item?.links || []).length <= 1
                                ? "cursor-no-drop opacity-50"
                                : "cursor-pointer hover:text-red-500"
                            } text-black dark:text-white text-[20px] transition-colors duration-200`}
                            onClick={() =>
                              (item?.links || []).length > 1
                                ? handleRemoveLink(index, linkIndex)
                                : null
                            }
                            title={
                              (item?.links || []).length <= 1
                                ? "Cannot delete the only link"
                                : "Delete this link"
                            }
                          />
                        </div>
                        <input
                          type="text"
                          placeholder="Enter link title (e.g., Source Code, Documentation)"
                          className={`${styles.input} mb-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                          value={link?.title || ""}
                          onChange={(e) =>
                            handleLinkChange(
                              index,
                              linkIndex,
                              "title",
                              e.target.value
                            )
                          }
                        />

                        <input
                          type="url"
                          placeholder="Enter URL (e.g., https://github.com/username/repo)"
                          className={`${styles.input} focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                          value={link?.url || ""}
                          onChange={(e) =>
                            handleLinkChange(
                              index,
                              linkIndex,
                              "url",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    ))}
                    <br />
                    {/* Add Link Button */}
                    <div className="inline-block mb-4">
                      <button
                        type="button"
                        className="flex items-center px-4 py-2 text-[14px] bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-700 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onClick={() => handleAddLink(index)}
                      >
                        <BsLink45Deg className="mr-2 text-lg" /> Add Additional
                        Link
                      </button>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Links: {(item?.links || []).length} added
                      </p>
                    </div>
                  </div>
                )}
                <br />
                {/* Add New Video Button */}
                <div className="mt-6 text-center">
                  <button
                    type="button"
                    className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    onClick={() => newContentHandler(item)}
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    Add New Content
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        <br />
        <div
          className="flex items-center text-[20px] dark:text-white text-black cursor-pointer"
          onClick={() => addNewSection()}
        >
          <AiOutlinePlusCircle className="mr-2 text-3xl" /> Add New Section
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-600">
          <div className="flex justify-end space-x-4">
            <div
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
              onClick={() => prevButton()}
            >
              Previous
            </div>
            <div
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              onClick={() => handleOptions()}
            >
              Next
            </div>
          </div>
        </div>
      </form>
         <br />
      <br />
    </div>
  );
};
export default CourseContent;
