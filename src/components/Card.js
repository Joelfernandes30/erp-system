import React from "react";

export const Card = ({ children }) => (
  <div className="border rounded-lg shadow-md p-4 bg-white">{children}</div>
);

export const CardContent = ({ children }) => <div>{children}</div>;
