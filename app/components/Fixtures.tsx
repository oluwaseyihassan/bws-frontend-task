"use client";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { getPredictions } from "../api/queries";
import { FixturesResponse } from "../types/types";
import Calendar from "./Calendar";
import { formatDate } from "date-fns";
import { useSearchParams } from "next/navigation";
import { validateDate } from "../utils/validator";
import Image from "next/image";
import { teamImagePlaceHolder } from "../utils/imagePlaceholders";
import FixtureCard from "./FixtureCard";

const Fixtures = () => {
  const searchParams = useSearchParams();
  const searchDate = searchParams.get("date");
  const isDateValid = searchDate && validateDate(searchDate);
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);

  const [selectedDate, setSelectedDate] = useState<string>(
    isDateValid ? searchDate : formatDate(new Date(), "yyyy-MM-dd")
  );

  // const validDate = isDateValid
  //   ? searchDate
  //   : formatDate(new Date(), "yyyy-MM-dd");

  const { data, error, isLoading, isFetching } = useQuery<FixturesResponse>({
    queryKey: ["predictions", selectedDate],
    queryFn: () => getPredictions(selectedDate),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return (
    <div className=" sm:p-4">
      <div className="">
        <div
          onClick={() => {
            setIsCalendarOpen(!isCalendarOpen);
          }}
          className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 w-fit"
        >
          {formatDate(selectedDate, "MMMM d, yyyy")}
        </div>
        {isCalendarOpen && (
          <Calendar
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            isCalendarOpen={isCalendarOpen}
            setIsCalendarOpen={setIsCalendarOpen}
          />
        )}
      </div>
      <h1 className="font-bold text-2xl text-center">Fixtures</h1>

      {!isDateValid && searchDate && (
        <div className="text-yellow-600 text-center mb-2">
          The date provided is not valid. Showing fixtures for today's date
          instead.
        </div>
      )}

      {error && !data && (
        <div className="text-red-500">
          Error fetching fixtures {error.message}
        </div>
      )}

      {isFetching && (
        <div className="flex flex-col items-center justify-center py-8">
          <div className="relative">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
          <p className="mt-4 text-blue-600 font-medium text-lg">
            Loading fixtures...
          </p>
        </div>
      )}

      {data?.data && !isFetching && data.data.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="text-6xl mb-4">📅</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            No Fixtures Available
          </h3>
          <p className="text-gray-500 text-center">
            There are no fixtures scheduled for this date.
          </p>
        </div>
      )}

      {data?.data &&
        !isFetching &&
        data.data.length > 0 &&
        data.data.map((fixture) => (
          <FixtureCard key={fixture.id} fixture={fixture} />
        ))}
    </div>
  );
};

export default Fixtures;
