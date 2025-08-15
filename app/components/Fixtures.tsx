"use client";
import { useQuery } from "@tanstack/react-query";
import React, { useState, useMemo } from "react";
import { getPredictions } from "../api/queries";
import type { Fixtures, FixturesResponse } from "../types/types";
import Calendar from "./Calendar";
import { formatDate } from "date-fns";
import { useSearchParams } from "next/navigation";
import { validateDate } from "../utils/validator";
import FixtureCard from "./FixtureCard";
import MatchDetailsModal from "./MatchDetailsModal";
import {
  IoIosCalendar,
  IoMdClose,
  IoMdSearch,
  IoIosFootball,
} from "react-icons/io";

const Fixtures = () => {
  const searchParams = useSearchParams();
  const searchDate = searchParams.get("date");
  const isDateValid = searchDate && validateDate(searchDate);
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const [showMatchDetails, setShowMatchDetails] = useState<Fixtures | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [selectedDate, setSelectedDate] = useState<string>(
    isDateValid ? searchDate : formatDate(new Date(), "yyyy-MM-dd")
  );

  // Single query for date-based fixtures
  const { data, error, isFetching } = useQuery<FixturesResponse>({
    queryKey: ["predictions", selectedDate],
    queryFn: () => getPredictions(selectedDate),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  // Filter fixtures based on search query
  const filteredFixtures = useMemo(() => {
    if (!data?.data?.data || !searchQuery.trim()) {
      return data?.data?.data || [];
    }

    const query = searchQuery.toLowerCase().trim();
    return data.data.data.filter((fixture) => {
      const homeTeam =
        fixture.participants
          ?.find((team) => team.meta.location === "home")
          ?.name?.toLowerCase() || "";
      const awayTeam =
        fixture.participants
          ?.find((team) => team.meta.location === "away")
          ?.name?.toLowerCase() || "";
      const leagueName = fixture.league?.name?.toLowerCase() || "";

      return (
        homeTeam.includes(query) ||
        awayTeam.includes(query) ||
        leagueName.includes(query)
      );
    });
  }, [data?.data?.data, searchQuery]);

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const isSearchMode = searchQuery.trim().length > 0;
  const hasResults = filteredFixtures.length > 0;

  return (
    <div className="bg-dark-bg-1 rounded-lg sm:p-4 p-2">
      {/* Search and Date Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        {/* Date Picker */}
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

        {/* Search Bar */}
        <div className="flex-1">
          <div className="relative">
            <IoMdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchInputChange}
              placeholder="Filter by team or league name..."
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
        </div>
      </div>



      {/* Validation message for date mode */}
      {!isDateValid && searchDate && (
        <div className="text-yellow-600 text-center mb-2">
          The date provided is not valid. Showing fixtures for today's date
          instead.
        </div>
      )}

      {/* Error Display */}
      {error && !data && (
        <div className="text-red-500 text-center">
          Error fetching fixtures: {error.message}
        </div>
      )}

      {/* Loading */}
      {isFetching && (
        <div className="flex flex-col items-center justify-center py-8">
          <div className="relative">
            <IoIosFootball className="w-12 h-12 text-accent animate-bounce animate-spin" />
          </div>
          <p className="mt-4 text-accent font-medium text-lg">
            Loading fixtures...
          </p>
        </div>
      )}

      {/* No Results */}
      {data?.data && !isFetching && !hasResults && (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="text-6xl mb-4">{isSearchMode ? "🔍" : "📅"}</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            {isSearchMode ? "No Matches Found" : "No Fixtures Available"}
          </h3>
          <p className="text-gray-500 text-center">
            {isSearchMode
              ? `No fixtures match "${searchQuery}" for this date. Try a different search term.`
              : "There are no fixtures scheduled for this date."}
          </p>
        </div>
      )}

      {/* Results */}
      {data?.data && !isFetching && hasResults && (
        <div>
          {isSearchMode && (
            <div className="text-gray-400 text-sm mb-4 text-center">
              Found {filteredFixtures.length} of {data.data.data?.length}{" "}
              fixture(s)
            </div>
          )}
          {filteredFixtures
            .sort((a, b) => a.league_id - b.league_id)
            .map((fixture) => (
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
