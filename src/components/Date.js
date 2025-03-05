import React from "react";
import { format } from "date-fns";

export const DateDisplay = ({ date }) => {
  return <p className="text-gray-600">{format(date, "PPP")}</p>;
};
