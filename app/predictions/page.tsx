import React from "react";
import { getPredictions } from "../api/queries";
import Calendar from "../components/Calendar";
import { getQueryClient } from "../get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import Fixtures from "../components/Fixtures";
import { formatDate } from "date-fns";
import { validateDate } from "../utils/validator";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ date: string }>;
}) => {
  const params = await searchParams;
  let date = params.date;
  if (!date || !validateDate(date)) {
    console.warn("Invalid date provided, using today's date instead.");
    date = formatDate(new Date(), "yyyy-MM-dd");
  }
  console.log("Fetching predictions for date:", date);
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["predictions", date],
    queryFn: () => getPredictions(date),
  });

  return (
    <div>
      Predictions Page
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Fixtures />
      </HydrationBoundary>
    </div>
  );
};

export default page;
