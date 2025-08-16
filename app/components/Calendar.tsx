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
import React, { useState, useRef, useEffect } from "react";
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
  const calendarRef = useRef<HTMLDivElement>(null);

  const searchDateParam = searchParams.get("date");
  const isValidSearchDate = searchDateParam && validateDate(searchDateParam);

  const [currentMonth, setCurrentMonth] = useState<Date>(
    isValidSearchDate ? new Date(searchDateParam) : today
  );

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setIsCalendarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsCalendarOpen]);

  // Close calendar on Escape key
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsCalendarOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [setIsCalendarOpen]);

  const Header = () => (
    <div className="flex items-center justify-between px-2 mt-6">
      <button
        onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
        className="p-1 hover:bg-accent/10 rounded-lg text-accent cursor-pointer transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-accent"
      >
        <IoIosArrowBack size={20} />
      </button>
      <h2 className="sm:text-xl text-lg font-bold text-white">
        {formatDate(currentMonth, "MMMM yyyy")}
      </h2>
      <button
        onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
        className="p-1 hover:bg-accent/10 rounded-lg text-accent cursor-pointer transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-accent"
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
          className="text-center py-3 text-xs font-semibold text-gray-300 uppercase tracking-wide"
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
              h-8 w-8 text-center rounded-lg transition-all duration-200 font-medium text-xs relative
              ${
                !isToday &&
                (!isCurrentMonth
                  ? "text-gray-400 hover:text-black hover:bg-blue-50"
                  : "hover:bg-gray-100 hover:text-black")
              }
              ${
                isToday
                  ? "bg-accent text-white hover:bg-accent/80 shadow-lg"
                  : ""
              }
              ${
                isSelectedDay && !isToday
                  ? "after:content-[''] after:block after:w-4 after:h-1 after:rounded-full after:bg-accent after:shadow-md after:absolute after:left-1/2 after:-translate-x-1/2"
                  : ""
              }
              ${!isSelectedDay && !isToday ? "hover:shadow-sm" : ""}
              focus:outline-none focus:ring-1 focus:ring-accent focus:ring-offset-1
            `}
          >
            {formatDate(day, "d")}
          </button>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div
          className="grid grid-cols-7 gap-2 mb-1 place-items-center"
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
    <div
      ref={calendarRef}
      className="bg-dark-bg rounded-xl shadow-lg p-4 mb-6 border border-accent/40 absolute z-50"
    >
      <button
        onClick={() => setIsCalendarOpen(false)}
        className="text-white absolute right-4 top-4"
      >
        <RxCross2 className="hover:bg-accent/10 rounded w-6 h-6 text-lg" />
      </button>
      {Header()}
      {Days()}
      {Cells()}
      <div className="py-1 border-t border-gray-400/20">
        <div className="text-sm text-white mb-2 text-center">
          Selected: {formatDate(selectedDate, "MMMM d, yyyy")}
        </div>
        <button
          className="w-full bg-accent text-white py-1 rounded-lg hover:bg-accent/90 focus:outline-none focus:ring-1 focus:ring-accent focus:ring-offset-2 transition-colors duration-200 font-medium"
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
