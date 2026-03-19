"use client";

import React from "react";
import DatePicker from "react-datepicker";
import { addDays, format, isValid, parse } from "date-fns";
import { CalendarDays } from "lucide-react";

import "react-datepicker/dist/react-datepicker.css";

type StartDatePickerProps = {
  value: string;
  onChange: (nextDate: string) => void;
};

const DATE_FORMAT = "MM/dd/yyyy";
const STORAGE_FORMAT = "yyyy-MM-dd";

const StartDatePicker = ({ value, onChange }: StartDatePickerProps) => {
  const tomorrow = addDays(new Date(), 1);

  const parsed = value ? parse(value, STORAGE_FORMAT, new Date()) : null;

  const selectedDate = parsed && isValid(parsed) ? parsed : null;

  return (
    <div className="relative flex items-center rounded-xl bg-white">
      <DatePicker
        selected={selectedDate}
        onChange={(date: Date | null) => {
          if (!date) return;
          onChange(format(date, STORAGE_FORMAT));
        }}
        minDate={tomorrow}
        dateFormat={DATE_FORMAT}
        placeholderText="Select date"
        className="trip-datepicker-input"
        popperClassName="trip-datepicker-popper"
        calendarClassName="trip-datepicker-calendar"
        showPopperArrow={false}
      />
      <CalendarDays className="trip-datepicker-icon" />
    </div>
  );
};

export default StartDatePicker;
