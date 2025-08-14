import Image from "next/image";
import React from "react";
import { Fixtures } from "../types/types";
import { teamImagePlaceHolder } from "../utils/imagePlaceholders";
import { formatDate } from "date-fns";
import { FaCircleInfo } from "react-icons/fa6";

interface FixtureCardProp {
  fixture: Fixtures;
  setShowMatchDetails?: React.Dispatch<React.SetStateAction<Fixtures | null>>;
}

const FixtureCard: React.FC<FixtureCardProp> = ({
  fixture,
  setShowMatchDetails,
}) => {
  return (
    <div className="mb-4 p-4 bg-dark-bg shadow rounded-lg ">
      <div className="flex justify-between items-center py-1">
        <div className="flex items-center gap-x-2 ">
          <div className="h-7 w-7 rounded-full overflow-hidden">
            <Image
              src={fixture.league.country.image_path || teamImagePlaceHolder}
              alt={fixture.league.country.name}
              width={20}
              height={20}
              className="object-cover w-full h-full"
            />
          </div>
          {fixture.league.name}
        </div>
        <button onClick={() => setShowMatchDetails?.(fixture)} className=" text-lg rounded-md px-2 py-1">
          <FaCircleInfo />
        </button>
      </div>
      <div className="flex items-center py-1 ">
        <div className="flex gap-x-2 items-center justify-end w-2/5 text-center">
          <div>
            {fixture.participants?.find((team) => team.meta.location === "home")
              ?.name || "Home Team"}
          </div>
          <div>
            <Image
              src={
                fixture.participants?.find(
                  (team) => team.meta.location === "home"
                )?.image_path || teamImagePlaceHolder
              }
              alt="Home Team Logo"
              width={30}
              height={30}
              onError={(e) => {
                e.currentTarget.src = teamImagePlaceHolder;
              }}
              unoptimized
            />
          </div>
        </div>
        <div className="flex-1 text-center">
          <div>{formatDate(fixture.starting_at, "HH:mm")}</div>
        </div>
        <div className="flex gap-x-2 items-center w-2/5 text-center">
          <div>
            <Image
              src={
                fixture.participants?.find(
                  (team) => team.meta.location === "away"
                )?.image_path || teamImagePlaceHolder
              }
              alt="Away Team Logo"
              width={30}
              height={30}
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
      <div className="py-1">
        {fixture.predictions?.map((prediction) => (
          <div key={prediction.id} className="">
            <div className="flex justify-between text-sm mb-1 text-gray-300">
              <span className="w-2/5 flex justify-end">
                Home: {prediction.predictions.home}%
              </span>
              <span>Draw: {prediction.predictions.draw}%</span>
              <span className="w-2/5 flex">
                Away: {prediction.predictions.away}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FixtureCard;
