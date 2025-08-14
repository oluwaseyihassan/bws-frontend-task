"use client";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { getPredictions } from "../api/queries";
import type { Fixtures, FixturesResponse } from "../types/types";
import Calendar from "./Calendar";
import { formatDate } from "date-fns";
import { useSearchParams } from "next/navigation";
import { validateDate } from "../utils/validator";
import FixtureCard from "./FixtureCard";
import Image from "next/image";
import { teamImagePlaceHolder } from "../utils/imagePlaceholders";
import { IoIosCalendar } from "react-icons/io";

const Fixtures = () => {
  const searchParams = useSearchParams();
  const searchDate = searchParams.get("date");
  const isDateValid = searchDate && validateDate(searchDate);
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const [showMatchDetails, setShowMatchDetails] = useState<Fixtures | null>(
    null
  );

  const [selectedDate, setSelectedDate] = useState<string>(
    isDateValid ? searchDate : formatDate(new Date(), "yyyy-MM-dd")
  );

  // const validDate = isDateValid
  //   ? searchDate
  //   : formatDate(new Date(), "yyyy-MM-dd");

  const { data, error, isFetching } = useQuery<FixturesResponse>({
    queryKey: ["predictions", selectedDate],
    queryFn: () => getPredictions(selectedDate),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="bg-dark-bg-1 rounded-lg sm:p-4 p-2">
      <div className="">
        <div
          onClick={() => {
            setIsCalendarOpen(!isCalendarOpen);
          }}
          className="cursor-pointer border border-gray-400/40 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 w-fit flex items-center gap-x-2"
        >
          <IoIosCalendar />
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
      <h1 className="font-bold text-2xl text-center mb-4">Fixtures</h1>

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

      {data?.data && !isFetching && data.data.data?.length === 0 && (
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
        (data.data.data?.length ?? 0) > 0 &&
        data.data.data?.map((fixture) => (
          <FixtureCard
            key={fixture.id}
            fixture={fixture}
            setShowMatchDetails={setShowMatchDetails}
          />
        ))}
      {showMatchDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Background overlay */}
          <div
            className="absolute inset-0 bg-black/20 bg-opacity-50 backdrop-blur-sm"
            onClick={() => setShowMatchDetails(null)}
          />
          {/* Content */}
          <div className="relative z-10 max-w-2xl w-full mx-4 max-h-[90vh] overflow-auto">
            <div className="bg-white rounded-xl shadow-2xl p-6">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Match Details
                </h2>
                <button
                  onClick={() => setShowMatchDetails(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                >
                  ×
                </button>
              </div>

              {/* Match Info */}
              <div className="space-y-4">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    {showMatchDetails.league.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {formatDate(
                      showMatchDetails.starting_at,
                      "MMMM d, yyyy 'at' HH:mm"
                    )}
                  </p>
                </div>

                {/* Teams */}
                <div className="flex justify-between items-center py-6 text-black">
                  <div className="text-center flex-1">
                    <div className="flex flex-col items-center mb-4">
                      <div className="mb-3">
                        <Image
                          src={
                            showMatchDetails.participants?.find(
                              (team) => team.meta.location === "home"
                            )?.image_path || teamImagePlaceHolder
                          }
                          alt="Home Team Logo"
                          width={60}
                          height={60}
                          className="rounded-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = teamImagePlaceHolder;
                          }}
                          unoptimized
                        />
                      </div>
                      <div className="text-lg font-bold">
                        {showMatchDetails.participants?.find(
                          (team) => team.meta.location === "home"
                        )?.name || "Home Team"}
                      </div>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-400 mx-4">
                    VS
                  </div>
                  <div className="text-center flex-1">
                    <div className="flex flex-col items-center mb-4">
                      <div className="mb-3">
                        <Image
                          src={
                            showMatchDetails.participants?.find(
                              (team) => team.meta.location === "away"
                            )?.image_path || teamImagePlaceHolder
                          }
                          alt="Away Team Logo"
                          width={60}
                          height={60}
                          className="rounded-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = teamImagePlaceHolder;
                          }}
                          unoptimized
                        />
                      </div>
                      <div className="text-lg font-bold">
                        {showMatchDetails.participants?.find(
                          (team) => team.meta.location === "away"
                        )?.name || "Away Team"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Predictions */}
                {showMatchDetails.predictions &&
                  showMatchDetails.predictions.length > 0 && (
                    <div>
                      <h4 className="text-lg font-semibold mb-4">
                        Match Predictions
                      </h4>
                      {showMatchDetails.predictions.map((prediction) => (
                        <div key={prediction.id} className="mb-4">
                          <div className="flex justify-between text-sm mb-2 text-gray-600">
                            <span>
                              Home Win: {prediction.predictions.home}%
                            </span>
                            <span>Draw: {prediction.predictions.draw}%</span>
                            <span>
                              Away Win: {prediction.predictions.away}%
                            </span>
                          </div>
                          <div className="flex w-full h-6 rounded-lg overflow-hidden border border-gray-300">
                            <div
                              className="bg-green-500 flex items-center justify-center text-white text-xs font-medium"
                              style={{
                                width: `${prediction.predictions.home}%`,
                              }}
                            >
                              {prediction.predictions.home > 20 &&
                                `${prediction.predictions.home}%`}
                            </div>
                            <div
                              className="bg-gray-500 flex items-center justify-center text-white text-xs font-medium"
                              style={{
                                width: `${prediction.predictions.draw}%`,
                              }}
                            >
                              {prediction.predictions.draw > 20 &&
                                `${prediction.predictions.draw}%`}
                            </div>
                            <div
                              className="bg-red-500 flex items-center justify-center text-white text-xs font-medium"
                              style={{
                                width: `${prediction.predictions.away}%`,
                              }}
                            >
                              {prediction.predictions.away > 20 &&
                                `${prediction.predictions.away}%`}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                {/* Additional Match Info */}
                <div className="border-t pt-4 mt-6">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-semibold text-gray-600">
                        League:
                      </span>
                      <p>{showMatchDetails.league.name}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-600">
                        Country:
                      </span>
                      <p>{showMatchDetails.league.country.name}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-600">
                        Match ID:
                      </span>
                      <p>{showMatchDetails.id}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-600">
                        Status:
                      </span>
                      {/* <p>{showMatchDetails.state?.state || "Scheduled"}</p> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Fixtures;
