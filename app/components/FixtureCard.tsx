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
          <div className="h-6 w-6 rounded-full overflow-hidden">
            <Image
              src={fixture.league.country.image_path || teamImagePlaceHolder}
              alt={fixture.league.country.name}
              width={20}
              height={20}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="text-xs">
            <div>{fixture.league.name}</div>
            <div>{fixture.league.country.name}</div>
          </div>
        </div>
        <button
          onClick={() => setShowMatchDetails?.(fixture)}
          className=" text-lg rounded-md px-2 py-1"
        >
          <FaCircleInfo />
        </button>
      </div>
      <div className="flex items-center py-2 gap-x-2">
        <div className="flex gap-x-2 items-center justify-end w-2/5 text-center flex-col-reverse sm:flex-row">
          <div className="sm:text-base text-sm">
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
              width={20}
              height={20}
              onError={(e) => {
                e.currentTarget.src = teamImagePlaceHolder;
              }}
              unoptimized
            />
          </div>
        </div>
        <div className="flex-1 text-center flex justify-center">
          <div className="bg-dark-bg-1 rounded py-1 px-3 w-fit">{formatDate(fixture.starting_at, "HH:mm")}</div>
        </div>
        <div className="flex gap-x-2 items-center w-2/5 text-center flex-col sm:flex-row">
          <div>
            <Image
              src={
                fixture.participants?.find(
                  (team) => team.meta.location === "away"
                )?.image_path || teamImagePlaceHolder
              }
              alt="Away Team Logo"
              width={20}
              height={20}
              onError={(e) => {
                e.currentTarget.src = teamImagePlaceHolder;
              }}
              unoptimized
            />
          </div>

          <div className="sm:text-base text-sm max-w-4/5">
            {fixture.participants?.find((team) => team.meta.location === "away")
              ?.name || "Away Team"}
          </div>
        </div>
      </div>
      <div className="py-1">
        {fixture.predictions?.map((prediction) => (
          <div key={prediction.id} className="">
            <div className="flex justify-between text-sm mb-1 text-gray-300">
              <span className="sm:w-2/5 w-1/3 flex sm:justify-end justify-center">
                <span className="sm:block hidden mr-1">Home: </span>{" "}
                <span className="sm:hidden block mr-1">H: </span>{" "}
                <span> {prediction.predictions.home}%</span>
              </span>
              <span className="sm:1/5 w-1/3 flex justify-center">
                <span className="sm:block hidden mr-1">Draw: </span>{" "}
                <span className="sm:hidden block mr-1">D: </span>{" "}
                <span>{prediction.predictions.draw}%</span>
              </span>
              <span className="sm:w-2/5 w-1/3 flex sm:justify-start justify-center">
                <span className="sm:block hidden mr-1">Away: </span>{" "}
                <span className="sm:hidden block mr-1">A: </span>{" "}
                <span> {prediction.predictions.away}%</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FixtureCard;
