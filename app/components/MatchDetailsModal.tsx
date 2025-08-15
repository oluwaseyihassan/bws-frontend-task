"use client";
import React from "react";
import Image from "next/image";
import { formatDate } from "date-fns";
import { teamImagePlaceHolder } from "../utils/imagePlaceholders";
import type { Fixtures } from "../types/types";

interface MatchDetailsModalProps {
  fixture: Fixtures | null;
  onClose: () => void;
}

const MatchDetailsModal: React.FC<MatchDetailsModalProps> = ({
  fixture,
  onClose,
}) => {
  if (!fixture) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background overlay */}
      <div
        className="absolute inset-0 bg-black/20 bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Content */}
      <div className="relative z-10 max-w-2xl w-full mx-4 max-h-[90vh] overflow-auto">
        <div className="bg-dark-bg-1 rounded-xl shadow-2xl p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-accent">Match Details</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              ×
            </button>
          </div>

          {/* Match Info */}
          <div className="space-y-4">
            <div className="flex items-center flex-col gap-y-1">
              <div className="h-10 w-10 rounded-full overflow-hidden">
                <Image
                  src={
                    fixture.league.country.image_path || teamImagePlaceHolder
                  }
                  alt={fixture.league.country.name}
                  width={40}
                  height={40}
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                {fixture.league.name}{" "}
                <span className="text-gray-400">({fixture.league.country.name})</span>
              </h3>
              <p className="text-sm text-gray-400">
                {formatDate(fixture.starting_at, "MMMM d, yyyy 'at' HH:mm")}
              </p>
            </div>

            {/* Teams */}
            <div className="flex justify-between items-center py-6">
              <div className="text-center flex-1">
                <div className="flex flex-col items-center mb-4">
                  <div className="mb-3">
                    <Image
                      src={
                        fixture.participants?.find(
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
                    {fixture.participants?.find(
                      (team) => team.meta.location === "home"
                    )?.name || "Home Team"}
                  </div>
                </div>
              </div>
              <div className="text-2xl font-bold mx-4">VS</div>
              <div className="text-center flex-1">
                <div className="flex flex-col items-center mb-4">
                  <div className="mb-3">
                    <Image
                      src={
                        fixture.participants?.find(
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
                    {fixture.participants?.find(
                      (team) => team.meta.location === "away"
                    )?.name || "Away Team"}
                  </div>
                </div>
              </div>
            </div>

            {/* Predictions */}
            {fixture.predictions && fixture.predictions.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold mb-4">
                  Match Predictions
                </h4>
                {fixture.predictions.map((prediction) => (
                  <div key={prediction.id} className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Home Win: {prediction.predictions.home}%</span>
                      <span>Draw: {prediction.predictions.draw}%</span>
                      <span>Away Win: {prediction.predictions.away}%</span>
                    </div>
                    <div className="flex w-full h-6 rounded-lg overflow-hidden text-black">
                      <div
                        className="bg-green-500 flex items-center justify-center text-xs font-medium"
                        style={{
                          width: `${prediction.predictions.home}%`,
                        }}
                      >
                        {prediction.predictions.home > 20 &&
                          `${prediction.predictions.home}%`}
                      </div>
                      <div
                        className="bg-gray-400 flex items-center justify-center text-xs font-medium"
                        style={{
                          width: `${prediction.predictions.draw}%`,
                        }}
                      >
                        {prediction.predictions.draw > 20 &&
                          `${prediction.predictions.draw}%`}
                      </div>
                      <div
                        className="bg-red-500 flex items-center justify-center text-xs font-medium"
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchDetailsModal;
