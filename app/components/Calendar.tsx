"use client";
import {
  addDays,
  addMonths,
  endOfMonth,
  endOfWeek,
  formatDate,
  getMonth,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { validateDate } from "../utils/validator";
import { RxCross2 } from "react-icons/rx";

interface CalendarProps {
  selectedDate: string;
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
  isCalendarOpen: boolean;
  setIsCalendarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Calendar = ({
  selectedDate,
  setSelectedDate,
  setIsCalendarOpen,
}: CalendarProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const today = new Date();

  const searchDateParam = searchParams.get("date");
  const isValidSearchDate = searchDateParam && validateDate(searchDateParam);

  const [currentMonth, setCurrentMonth] = useState<Date>(
    isValidSearchDate ? new Date(searchDateParam) : today
  );

  const Header = () => (
    <div className="flex items-center justify-between mb-6 px-2">
      <button
        onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
        className="p-3 hover:bg-blue-100 rounded-full text-blue-600 cursor-pointer transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <IoIosArrowBack size={20} />
      </button>
      <h2 className="text-xl font-bold text-gray-800">
        {formatDate(currentMonth, "MMMM yyyy")}
      </h2>
      <button
        onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
        className="p-3 hover:bg-blue-100 rounded-full text-blue-600 cursor-pointer transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <IoIosArrowForward size={20} />
      </button>
    </div>
  );

  const Days = () => {
    const days = [];
    const date = new Date();
    for (let i = 0; i < 7; i++) {
      days.push(
        <div
          key={i}
          className="text-center py-3 text-sm font-semibold text-gray-600 uppercase tracking-wide"
        >
          {formatDate(addDays(startOfWeek(date), i), "EEE")}
        </div>
      );
    }
    return <div className="grid grid-cols-7 mb-2">{days}</div>;
  };

  const Cells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day;
        const isCurrentMonth = isSameMonth(day, monthStart);
        const isToday = isSameDay(day, today);
        const isSelectedDay = isSameDay(cloneDay, selectedDate);

        days.push(
          <button
            key={day.toString()}
            onClick={() => {
              if (getMonth(cloneDay) !== getMonth(currentMonth)) {
                setCurrentMonth(cloneDay);
              }
              setSelectedDate(formatDate(cloneDay, "yyyy-MM-dd"));
              const params = new URLSearchParams(searchParams);
              params.set("date", formatDate(cloneDay, "yyyy-MM-dd"));
              router.push(`/predictions?${params.toString()}`);
              setIsCalendarOpen(false);
            }}
            className={`
              w-12 h-12 text-center rounded-lg transition-all duration-200 font-medium text-sm
              ${
                !isCurrentMonth
                  ? "text-gray-400 hover:bg-gray-100"
                  : "text-gray-800 hover:bg-blue-50"
              }
              ${
                isToday
                  ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg"
                  : ""
              }
              ${
                isSelectedDay && !isToday
                  ? "bg-green-500 text-white shadow-md"
                  : ""
              }
              ${!isSelectedDay && !isToday ? "hover:shadow-sm" : ""}
              focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1
            `}
          >
            {formatDate(day, "d")}
          </button>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div
          className="grid grid-cols-7 gap-2 mb-2 place-items-center"
          key={day.toString()}
        >
          {days}
        </div>
      );
      days = [];
    }
    return <div>{rows}</div>;
  };

  return (
    <div className="bg-gray-300 rounded-xl shadow-lg p-4 mb-6 border border-gray-200 absolute z-50">
      <button
        onClick={() => setIsCalendarOpen(false)}
        className="text-black flex justify-end  w-full  "
      >
        <RxCross2 className="hover:bg-gray-200/40 rounded w-6 h-6 text-lg" />
      </button>
      {Header()}
      {Days()}
      {Cells()}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="text-sm text-gray-600 mb-3 text-center">
          Selected: {formatDate(selectedDate, "MMMM d, yyyy")}
        </div>
        <button
          className="w-full bg-accent text-white py-3 px-4 rounded-lg hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-colors duration-200 font-medium"
          onClick={() => {
            setSelectedDate(formatDate(today, "yyyy-MM-dd"));
            if (getMonth(today) !== getMonth(currentMonth)) {
              setCurrentMonth(today);
            }
            const params = new URLSearchParams(searchParams);
            params.set("date", formatDate(today, "yyyy-MM-dd"));
            router.push(`/predictions?${params.toString()}`);
            setIsCalendarOpen(false);
          }}
        >
          Today
        </button>
      </div>
    </div>
  );
};

export default Calendar;
