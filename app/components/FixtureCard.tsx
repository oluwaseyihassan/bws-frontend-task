import Image from "next/image";
import React from "react";
import { Fixtures } from "../types/types";
import { teamImagePlaceHolder } from "../utils/imagePlaceholders";

interface FixtureCardProp {
  fixture: Fixtures;
}

const FixtureCard: React.FC<FixtureCardProp> = ({ fixture }) => {
  return (
    <div className="mb-4 p-4 bg-dark-bg rounded shadow">
      <div className="flex justify-between items-center ">
        <div className="flex flex-col items-center mr-4 flex-1 text-center">
          <div>
            <Image
              src={
                fixture.participants?.find(
                  (team) => team.meta.location === "home"
                )?.image_path || teamImagePlaceHolder
              }
              alt="Home Team Logo"
              width={50}
              height={50}
              onError={(e) => {
                e.currentTarget.src = teamImagePlaceHolder;
              }}
              unoptimized
            />
          </div>
          <div>
            {fixture.participants?.find((team) => team.meta.location === "home")
              ?.name || "Home Team"}
          </div>
        </div>
        <div className="flex-1 text-center">VS</div>
        <div className="flex flex-col items-center flex-1 text-center">
          <div>
            <Image
              src={
                fixture.participants?.find(
                  (team) => team.meta.location === "away"
                )?.image_path || teamImagePlaceHolder
              }
              alt="Away Team Logo"
              width={50}
              height={50}
              onError={(e) => {
                e.currentTarget.src = teamImagePlaceHolder;
              }}
              unoptimized
            />
          </div>

          <div>
            {fixture.participants?.find((team) => team.meta.location === "away")
              ?.name || "Away Team"}
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-3 text-center">
          Match Predictions
        </h3>
        {fixture.predictions?.map((prediction) => (
          <div key={prediction.id} className="mb-3">
            <div className="flex justify-between text-sm mb-1 text-gray-300">
              <span>Home: {prediction.predictions.home}%</span>
              <span>Draw: {prediction.predictions.draw}%</span>
              <span>Away: {prediction.predictions.away}%</span>
            </div>
            <div className="flex w-full h-8 rounded-lg overflow-hidden border border-gray-600">
              <div
                className="bg-green-500 flex items-center justify-center text-white text-sm font-medium"
                style={{ width: `${prediction.predictions.home}%` }}
              >
                {prediction.predictions.home > 15 &&
                  prediction.predictions.home}
              </div>
              <div
                className="bg-gray-500 flex items-center justify-center text-white text-sm font-medium"
                style={{ width: `${prediction.predictions.draw}%` }}
              >
                {prediction.predictions.draw > 15 &&
                  prediction.predictions.draw}
              </div>
              <div
                className="bg-red-500 flex items-center justify-center text-white text-sm font-medium"
                style={{ width: `${prediction.predictions.away}%` }}
              >
                {prediction.predictions.away > 15 &&
                  prediction.predictions.away}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FixtureCard;
