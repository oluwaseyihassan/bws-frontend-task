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
    <div className="fixed inset-0 z-50 flex items-center justify-center text-black">
      {/* Background overlay */}
      <div
        className="absolute inset-0 bg-black/20 bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Content */}
      <div className="relative z-10 max-w-2xl w-full mx-4 max-h-[90vh] overflow-auto">
        <div className="bg-white rounded-xl shadow-2xl p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Match Details</h2>
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
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                {fixture.league.name}
              </h3>
              <p className="text-sm text-gray-500">
                {formatDate(fixture.starting_at, "MMMM d, yyyy 'at' HH:mm")}
              </p>
            </div>

            {/* Teams */}
            <div className="flex justify-between items-center py-6 text-black">
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
              <div className="text-2xl font-bold text-gray-400 mx-4">VS</div>
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
                    <div className="flex justify-between text-sm mb-2 text-gray-600">
                      <span>Home Win: {prediction.predictions.home}%</span>
                      <span>Draw: {prediction.predictions.draw}%</span>
                      <span>Away Win: {prediction.predictions.away}%</span>
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
                  <span className="font-semibold text-gray-600">League:</span>
                  <p>{fixture.league.name}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-600">Country:</span>
                  <p>{fixture.league.country.name}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-600">Match ID:</span>
                  <p>{fixture.id}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchDetailsModal;
