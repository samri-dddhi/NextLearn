import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import React, { FC, useEffect, useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { FiSave } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { useEditLayoutMutation } from "@/redux/features/layout/layoutApi";

type Props = {};

const EditHero: FC<Props> = () => {
  const [image, setImage] = useState("/hero-image.png");
  const [title, setTitle] = useState("Empowering Your Online Learning Experience");
  const [subTitle, setSubTitle] = useState("Explore 40,000+ expert-led courses and join over 500,000 learners building their future. Discover your perfect course now!");
  const [searchPlaceholder, setSearchPlaceholder] = useState("Search Courses...");
  const [trustText, setTrustText] = useState("Trusted by 500,000+ learners worldwide.");
  const [linkText, setLinkText] = useState("View Courses");
  const [isLoading, setIsLoading] = useState(false);

  const { data, refetch } = useGetHeroDataQuery("Banner", {
    refetchOnMountOrArgChange: true,
  });
  const [editLayout,{ isSuccess, error}] = useEditLayoutMutation();

  useEffect(() => {
    if (data) {
      setTitle(data?.layout?.banner.title || "Empowering Your Online Learning Experience");
      setSubTitle(data?.layout?.banner.subtitle || "Explore 40,000+ expert-led courses and join over 500,000 learners building their future. Discover your perfect course now!");
      setImage(data?.layout?.banner.image?.url || "/hero-image.png");
    }
    if( isSuccess ){
      refetch();
      toast.success("Hero section updated successfully!");
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [data, isSuccess, error]);

  const handleImageUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImage(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!title.trim()) {
      toast.error("Title is required!");
      return;
    }
    if (!subTitle.trim()) {
      toast.error("Subtitle is required!");
      return;
    }

    setIsLoading(true);
    try {
      // Here you would make API call to save the hero data
      // await updateHeroData({ title, subTitle, image, searchPlaceholder, trustText, linkText });
      toast.success("Hero section updated successfully!");
    } catch (error) {
      toast.error("Failed to update hero section");
    } finally {
      setIsLoading(false);
    }
  };
const handleEdit = async () => {
  await editLayout({
    type: "Banner",
    title,
    subtitle: subTitle,
    image,
  });
};
  return (
    <div className="p-6 space-y-8">
      {/* Admin Controls */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Edit Hero Section</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Text Controls */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Hero Title
              </label>
              <textarea
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                rows={3}
                className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Subtitle
              </label>
              <textarea
                value={subTitle}
                onChange={(e) => setSubTitle(e.target.value)}
                rows={4}
                className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Search Placeholder
              </label>
              <input
                type="text"
                value={searchPlaceholder}
                onChange={(e) => setSearchPlaceholder(e.target.value)}
                className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Trust Text
              </label>
              <input
                type="text"
                value={trustText}
                onChange={(e) => setTrustText(e.target.value)}
                className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Link Text
              </label>
              <input
                type="text"
                value={linkText}
                onChange={(e) => setLinkText(e.target.value)}
                className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Hero Image
            </label>
            <div className="relative border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 hover:border-blue-500 transition-colors">
              {image && (
                <img
                  src={image}
                  alt="Hero preview"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              
              <input
                type="file"
                id="heroImage"
                accept="image/*"
                onChange={handleImageUpdate}
                className="hidden"
              />
              
              <label
                htmlFor="heroImage"
                className="flex flex-col items-center justify-center cursor-pointer p-6 text-center"
              >
                <AiOutlineCamera className="text-4xl text-gray-400 mb-2" />
                <span className="text-gray-600 dark:text-gray-400">
                  Click to upload hero image
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={isLoading}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
        >
          <FiSave className="inline mr-2" />
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {/* Live Preview - Exact Hero Layout */}
      <div className="bg-gray-100 dark:bg-gray-900 rounded-lg shadow-lg border p-6 overflow-hidden">
        <h3 className="text-lg font-bold mb-6 text-gray-900 dark:text-white">Live Preview</h3>
        
        {/* Exact Hero Component Structure */}
        <div className="relative w-full 1000px:flex items-center min-h-[600px] max-h-[800px] bg-gray-100 dark:bg-gray-900">
          {/* Hero Image Section (left) */}
          <div className="1000px:w-[50%] flex items-center justify-end pt-[70px] 1000px:pt-[0] z-10 h-full">
            <Image
              src={image}
              alt="Hero"
              width={600}
              height={600}
              className="object-contain max-w-full max-h-[500px] z-10"
              priority
            />
          </div>

          {/* Hero Content (right) */}
          <div className="1000px:w-[60%] flex flex-col items-center text-center 1000px:text-left mt-[50px] 1000px:mt-0 px-4">
            <h2 className="dark:text-white text-[#000000c7] text-[20px] px-3 w-full 1000px:text-[40px] font- font-Josefin py-2 1000px:leading-[44px] 1500px:w-[60%]">
              {title}
            </h2>

            <div className="my-4"></div>

            <p className="dark:text-[#edfff4] text-[#000000ac] font-Josefin font- text-[14px] 1000px:text-[16px] 1500px:!w-[55%] 1100px:!w-[78%]">
              {subTitle}
            </p>

            <div className="my-6"></div>

            {/* Search Bar */}
            <div className="1500px:w-[55%] 1100px:w-[78%] w-[90%] h-[40px] bg-transparent relative">
              <input
                type="search"
                placeholder={searchPlaceholder}
                className="bg-transparent border dark:border-none dark:bg-[#575757] dark:placeholder:text-[#ffffffdd] rounded-[5px] p-2 w-full h-full outline-none text-[#0000004e] dark:text-[#ffffffe6] text-[14px] font- font-Josefin"
                readOnly
              />
              <div className="absolute flex items-center justify-center w-[40px] cursor-pointer h-[40px] right-0 top-0 bg-[#39c1f3] rounded-r-[5px]">
                <BiSearch className="text-white" size={20} />
              </div>
            </div>

            <div className="my-6"></div>

            {/* Trust row */}
            <div className="1500px:w-[55%] 1100px:w-[78%] w-[90%] flex items-center">
              <Image
                src="/avatar1.jpg"
                alt="Student 1"
                width={32}
                height={32}
                className="rounded-full aspect-square object-cover border-2 border-white shadow"
              />
              <Image
                src="/avatar2.jpg"
                alt="Student 2"
                width={32}
                height={32}
                className="rounded-full aspect-square object-cover border-2 border-white shadow ml-[-16px]"
              />
              <Image
                src="/avatar3.jpg"
                alt="Student 3"
                width={32}
                height={32}
                className="rounded-full aspect-square object-cover border-2 border-white shadow ml-[-16px]"
              />
              <p className="font-Josefin dark:text-[#edfff4] text-[#000000b3] 1000px:pl-3 text-[14px] font-">
                {trustText}
                <Link
                  href="/courses"
                  className="ml-1 dark:text-[#46e256] text-[crimson]"
                >
                  {linkText}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditHero;
