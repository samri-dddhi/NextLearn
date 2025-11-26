import React, { useEffect, useState } from "react";
import { useGetHeroDataQuery } from "../../../redux/features/layout/layoutApi";
import { HiMinus, HiPlus } from "react-icons/hi";
import { styles } from "../../../app/styles/style";

type FAQItem = {
  _id: string;
  question: string;
  answer: string;
};

const FAQ = () => {
  const { data, isLoading } = useGetHeroDataQuery("FAQ", {});
  const [questions, setQuestions] = useState<FAQItem[]>([]);
  const [activeQuestion, setActiveQuestion] = useState<string | null>(null);

  useEffect(() => {
    if (data?.layout?.faq) {
      setQuestions(data.layout.faq);
    }
  }, [data]);

  const toggleQuestion = (id: string) => {
    setActiveQuestion((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-[90%] 800px:w-[80%] m-auto mb-10">
      <h1 className={`${styles.title} 800px:text-[40px]`}>
        Frequently Asked Questions
      </h1>

      <div className="mt-4">
        <dl className="space-y-8">
          {questions.map((q, index) => (
            <div
              key={q._id}
              className={`${
                index !== 0 && "border-t"
              } border-gray-200 dark:border-gray-700 pt-6`}
            >
              <dt className="text-lg">
                <button
                  className="flex items-start text-left dark:text-white text-black font-medium w-full justify-between"
                  onClick={() => toggleQuestion(q._id)}
                >
                  <span>{q.question}</span>
                  <span className="ml-6 flex-shrink-0">
                    {activeQuestion === q._id ? (
                      <HiMinus className="h-6 w-6 dark:text-white text-black" />
                    ) : (
                      <HiPlus className="h-6 w-6 dark:text-white text-black" />
                    )}
                  </span>
                </button>
              </dt>

              {activeQuestion === q._id && (
                <dd className="mt-2 pr-12">
                  <p className="text-base font-Poppins dark:text-gray-300 text-gray-700">
                    {q.answer}
                  </p>
                </dd>
              )}
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};

export default FAQ;
