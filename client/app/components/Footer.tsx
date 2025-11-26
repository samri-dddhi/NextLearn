import React from "react";
import Link from "next/link";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer>
      <div className="border border-[#0000000e] dark:border-[#ffffff1e]">
        <br />
        <div className="w-[95%] 800px:w-full 800px:max-w-[85%] mx-auto px-2 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div className="space-y-3">
              <h3 className="text-[20px] font-[600] text-black dark:text-white">
                About Us
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/about"
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-[20px] font-[600] text-black dark:text-white">
                Quick Links
              </h3>

              <ul className="space-y-4">
                <li>
                  <Link
                    href="/courses"
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    Courses
                  </Link>
                </li>
                <li>
                  <Link
                    href="/profile"
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    My Profile
                  </Link>
                </li>
                <li>
                  <Link
                    href="/course-dashboard"
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-[20px] font-[600] text-black dark:text-white">
                Social Links
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="https://www.youtube.com/"
                    target="_blank"
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    YouTube
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.instagram.com/"
                    target="_blank"
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    Instagram
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.facebook.com/"
                    target="_blank"
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    Facebook
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-[20px] font-[600] text-black dark:text-white">
                Contact Us
              </h3>
              <ul className="space-y-4">
              <li className="text-base text-black dark:text-gray-300 dark:hover:text-white mt-3">
                Call us: <span className="font-semibold">+123 456 7890</span>
              </li>
              <li className="text-base text-black dark:text-gray-300 dark:hover:text-white">
                Email: <span className="font-semibold">info@example.com</span>
              </li>
              <li className="text-base text-black dark:text-gray-300 dark:hover:text-white">
                Address:{" "}
                <span className="font-semibold">
                  123 Main St, City, Country
                </span>
              </li>
              </ul>
            </div>
          </div>
          <br />
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            Copyright © 2025 NextLearn. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
