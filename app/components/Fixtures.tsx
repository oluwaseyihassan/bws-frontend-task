"use client";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { getPredictions, getFixturesByName } from "../api/queries";
import type { Fixtures, FixturesResponse } from "../types/types";
import Calendar from "./Calendar";
import { formatDate } from "date-fns";
import { useSearchParams } from "next/navigation";
import { validateDate } from "../utils/validator";
import FixtureCard from "./FixtureCard";
import MatchDetailsModal from "./MatchDetailsModal";
import { IoIosCalendar, IoMdClose, IoMdSearch } from "react-icons/io";

const Fixtures = () => {
  const searchParams = useSearchParams();
  const searchDate = searchParams.get("date");
  const isDateValid = searchDate && validateDate(searchDate);
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const [showMatchDetails, setShowMatchDetails] = useState<Fixtures | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearchMode, setIsSearchMode] = useState<boolean>(false);

  const [selectedDate, setSelectedDate] = useState<string>(
    isDateValid ? searchDate : formatDate(new Date(), "yyyy-MM-dd")
  );

  // Query for date-based fixtures
  const {
    data: dateData,
    error: dateError,
    isFetching: dateIsFetching,
  } = useQuery<FixturesResponse>({
    queryKey: ["predictions", selectedDate],
    queryFn: () => getPredictions(selectedDate),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: !isSearchMode,
  });

  // Query for search-based fixtures
  const {
    data: searchData,
    error: searchError,
    isFetching: searchIsFetching,
  } = useQuery<FixturesResponse>({
    queryKey: ["fixtures", searchQuery],
    queryFn: () => getFixturesByName(searchQuery),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: isSearchMode && searchQuery.length > 2,
  });

  // Use appropriate data based on mode
  const data = isSearchMode ? searchData : dateData;
  const error = isSearchMode ? searchError : dateError;
  const isFetching = isSearchMode ? searchIsFetching : dateIsFetching;

  console.log(searchData)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim().length > 2) {
      setIsSearchMode(true);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setIsSearchMode(false);
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    // Auto-search when typing stops
    if (value.length === 0) {
      setIsSearchMode(false);
    } else if (value.length > 2) {
      setIsSearchMode(true);
    }
  };

  return (
    <div className="bg-dark-bg-1 rounded-lg sm:p-4 p-2">
      {/* Search and Date Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">

        
        {/* Date Picker - Only show when not in search mode */}
        {!isSearchMode && (
          <div>
            <div
              onClick={() => {
                setIsCalendarOpen(!isCalendarOpen);
              }}
              className="cursor-pointer border border-gray-400/40 text-white px-4 py-2 rounded-lg shadow-md hover:border-accent transition-colors duration-200 w-fit flex items-center gap-x-2 bg-dark-bg"
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
        )}

        {/* Search Bar */}
        <div className="">
          <form onSubmit={handleSearch} className="relative">
            <div className="relative">
              <IoMdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchInputChange}
                placeholder="Enter team name..."
                className="w-full pl-10 pr-10 py-2 border border-gray-400/40 rounded-lg bg-dark-bg text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-accent focus:border-transparent"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <IoMdClose />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Title */}
      <h1 className="font-bold text-2xl text-center mb-4">
        {isSearchMode ? `Search Results for "${searchQuery}"` : "Fixtures"}
      </h1>

      {/* Search mode indicator */}
      {isSearchMode && (
        <div className="text-center mb-4">
          <span className="text-blue-400 text-sm">
            Showing search results •
          </span>
          <button
            onClick={handleClearSearch}
            className="text-blue-400 hover:text-blue-300 text-sm ml-2 underline"
          >
            View date-based fixtures
          </button>
        </div>
      )}

      {/* Validation message for date mode */}
      {!isSearchMode && !isDateValid && searchDate && (
        <div className="text-yellow-600 text-center mb-2">
          The date provided is not valid. Showing fixtures for today's date
          instead.
        </div>
      )}

      {/* Search validation */}
      {isSearchMode && searchQuery.length > 0 && searchQuery.length <= 2 && (
        <div className="text-yellow-600 text-center mb-2">
          Please enter at least 3 characters to search.
        </div>
      )}

      {/* Error Display */}
      {error && !data && (
        <div className="text-red-500 text-center">
          Error fetching {isSearchMode ? "search results" : "fixtures"}:{" "}
          {error.message}
        </div>
      )}

      {/* Loading */}
      {isFetching && (
        <div className="flex flex-col items-center justify-center py-8">
          <div className="relative">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
          <p className="mt-4 text-blue-600 font-medium text-lg">
            {isSearchMode ? "Searching fixtures..." : "Loading fixtures..."}
          </p>
        </div>
      )}

      {/* No Results */}
      {data?.data && !isFetching && data.data.data?.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="text-6xl mb-4">{isSearchMode ? "🔍" : "📅"}</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            {isSearchMode ? "No Search Results" : "No Fixtures Available"}
          </h3>
          <p className="text-gray-500 text-center">
            {isSearchMode
              ? `No fixtures found for "${searchQuery}". Try a different search term.`
              : "There are no fixtures scheduled for this date."}
          </p>
        </div>
      )}

      {/* Results */}
      {data?.data && !isFetching && (data.data.data?.length ?? 0) > 0 && (
        <div>
          {isSearchMode && (
            <div className="text-gray-400 text-sm mb-4 text-center">
              Found {data.data.data?.length} fixture(s)
            </div>
          )}
          {data.data.data?.sort((a, b) => a.league_id - b.league_id).map((fixture) => (
            <FixtureCard
              key={fixture.id}
              fixture={fixture}
              setShowMatchDetails={setShowMatchDetails}
            />
          ))}
        </div>
      )}

      <MatchDetailsModal
        fixture={showMatchDetails}
        onClose={() => setShowMatchDetails(null)}
      />
    </div>
  );
};

export default Fixtures;
