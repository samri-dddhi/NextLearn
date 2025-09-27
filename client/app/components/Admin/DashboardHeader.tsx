'use client'
import { ThemeSwitcher } from '../../utils/ThemeSwitcher'
import React, { FC, useState } from 'react'
import { IoMdNotificationsOutline } from "react-icons/io"

const DashboardHeader: FC = () => {
  const [open, setOpen] = useState(false)

  return (
    <div className="w-full flex justify-end items-center p-6 fixed top-5 right-0 z-50">
      <ThemeSwitcher />
      <div 
        className="relative m-2 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <IoMdNotificationsOutline className="text-2xl text-black dark:text-white cursor-pointer" />
        <span className="absolute -top-2 -right-2 bg-[#3ccba0] rounded-full w-[20px] h-[20px] text-[12px] flex items-center justify-center text-white">
          4
        </span>
      </div>
      
      {open && (
        <div className="w-[350px] h-[50vh] bg-white dark:bg-slate-800 shadow-xl rounded-md p-4 absolute top-16 right-0 z-40 border border-gray-200 dark:border-slate-700 overflow-y-auto">
          <h5 className="text-lg font-medium text-black dark:text-white mb-3">
            Notifications
          </h5>
          
          <div className="space-y-3">
            <div className="bg-gray-50 dark:bg-slate-700 border-b border-gray-200 dark:border-slate-600 p-3 rounded-md">
              <div className="w-full flex items-center justify-between gap-3">
                <p className="text-black dark:text-white">
                  New Question Received
                </p>
                <button className="text-blue-600 dark:text-blue-400 cursor-pointer hover:underline text-sm">
                  Mark as Read
                </button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                2 min ago
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-slate-700 border-b border-gray-200 dark:border-slate-600 p-3 rounded-md">
              <div className="w-full flex items-center justify-between gap-3">
                <p className="text-black dark:text-white">
                  New Comment on Your Post
                </p>
                <button className="text-blue-600 dark:text-blue-400 cursor-pointer hover:underline text-sm">
                  Mark as Read
                </button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                5 min ago
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-slate-700 border-b border-gray-200 dark:border-slate-600 p-3 rounded-md">
              <div className="w-full flex items-center justify-between gap-3">
                <p className="text-black dark:text-white">
                  New Course Enrollment
                </p>
                <button className="text-blue-600 dark:text-blue-400 cursor-pointer hover:underline text-sm">
                  Mark as Read
                </button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                10 min ago
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-slate-700 border-b border-gray-200 dark:border-slate-600 p-3 rounded-md">
              <div className="w-full flex items-center justify-between gap-3">
                <p className="text-black dark:text-white">
                  Payment Received
                </p>
                <button className="text-blue-600 dark:text-blue-400 cursor-pointer hover:underline text-sm">
                  Mark as Read
                </button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                1 day ago
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DashboardHeader