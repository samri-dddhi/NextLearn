import React, { use, useEffect, useState } from "react";
import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "../../../../redux/features/layout/layoutApi";
import Loader from "../../Loader/Loader";
import { AiOutlineDelete } from "react-icons/ai";
import { styles } from "../../../../app/styles/style";
import { IoMdAddCircleOutline } from "react-icons/io";
import toast from "react-hot-toast";

type Props = {};

const EditCategories = (props: Props) => {
  const { data, isLoading, refetch } = useGetHeroDataQuery("Categories", {
    refetchOnMountOrArgChange: true,
  });
  const [editLayout, { isSuccess: layoutSuccess, error }] =
    useEditLayoutMutation();
  const [categories, setCategories] = useState<any>([]);
  useEffect(() => {
    if (data) {
      setCategories(data?.layout?.categories);
    }
    if (layoutSuccess) {
        refetch();
      toast.success("Categories updated successfully");
    }

    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [data, layoutSuccess, error]);

  const handleCategoriesAdd = (id: any, value: string) => {
    setCategories((prevCategories: any) =>
      prevCategories.map((i: any) =>
        i._id === id ? { ...i, title: value } : i
      )
    );
  };
  const newCategoriesHandler = () => {
    if (categories[categories.length - 1]?.title === "") {
      toast.error("Please fill in the last category before adding a new one.");
    } else {
      setCategories((prevCategories: any) => [
        ...prevCategories,
        {
          title: "",
        },
      ]);
    }
  };
  const areCategoriesUnchanged = (
    originalCategories: any[],
    updatedCategories: any[]
  ) => {
    return (
      JSON.stringify(originalCategories) === JSON.stringify(updatedCategories)
    );
  };
  const isAnyCategoryTitleEmpty = (categories: any[]) => {
    return categories.some((category) => category.title === "");
  };
  const editCategoriesHandler = async () => {
    if (
      !areCategoriesUnchanged(data?.layout?.categories, categories) &&
      !isAnyCategoryTitleEmpty(categories)
    ) {
      await editLayout({
        type: "Categories",
        categories: categories,
      });
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="mt-[120px] text-center">
          <h1 className={`${styles.title}`}>All Categories</h1>
          {categories &&
            categories.map((item: any, index: number) => {
              return (
                <div className="p-3" key={index}>
                  <div className="flex items-center w-full justify-center">
                    <input
                      className={`${styles.input} !w-[unset] !border-none !text-[20px]`}
                      value={item.title}
                      onChange={(e) =>
                        handleCategoriesAdd(item._id, e.target.value)
                      }
                      placeholder="Enter Category Title"
                    />
                    <AiOutlineDelete
                      className="dark:text-white text-black text-[18px] cursor-pointer"
                      onClick={() => {
                        setCategories((prevCategory: any) =>
                          prevCategory.filter((i: any) => i._id !== item._id)
                        );
                      }}
                    />
                  </div>
                </div>
              );
            })}
          <br />
          <br />
          <div className="w-full flex items-center justify-center">
            <IoMdAddCircleOutline
              className="dark:text-white text-black text-[25px] cursor-pointer"
              onClick={newCategoriesHandler}
            />
          </div>
          <div
            className={`${
              styles.button
            } !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#cccccc34]
                        ${
                          areCategoriesUnchanged(
                            data?.layout?.categories,
                            categories
                          ) || isAnyCategoryTitleEmpty(categories)
                            ? "!cursor-not-allowed"
                            : "!cursor-pointer !bg-[#42d383]"
                        }
                        !rounded absolute bottom-12 right-12`}
            onClick={
              areCategoriesUnchanged(data?.layout?.categories, categories) ||
              isAnyCategoryTitleEmpty(categories)
                ? () => null
                : editCategoriesHandler
            }
          >
            Save
          </div>
        </div>
      )}
    </>
  );
};

export default EditCategories;
