import React from "react";

export const DatePicker = ({ label, selected, onChange }) => {
  const handleDateChange = (event) => {
    onChange(new Date(event.target.value));
  };

  return (
    <div className="flex flex-col">
      <label className="font-medium mb-1">{label}</label>
      <input
        type="date"
        value={selected.toISOString().split("T")[0]}
        onChange={handleDateChange}
        className="border rounded p-2"
      />
    </div>
  );
};
