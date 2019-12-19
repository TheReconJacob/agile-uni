import React from "react";

function dateTimeFormatter(dateString) {
  let formattedDateTime = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric"
  }).format(Date.parse(dateString));
  return formattedDateTime;
}

function DateDisplay(props) {
  let formattedStart = "";
  let formattedEnd = "";
  try {
    formattedStart = dateTimeFormatter(props.start_date);
    formattedEnd = dateTimeFormatter(props.end_date);
  } catch (e) {
    console.log("Error", e.stack);
  }

  return (
    <>
      <p className="c-text-body o-layout__item">
        <b>Start: {formattedStart}</b>
      </p>
      <p className="c-text-body o-layout__item">
        <b>End: {formattedEnd}</b>
      </p>
    </>
  );
}

export default DateDisplay;
