import React from "react";

function dateTimeFormatter(dateString) {
  let formattedDateTime = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric"
  }).format(Date.parse(dateString));
  return formattedDateTime;
}

function DateDisplay(props) {
  let formattedDate = "";
  try {
    formattedDate = dateTimeFormatter(props.date);
  } catch (e) {
    console.log("Error", e.stack);
  }

  return (
    <>
      <p className="c-text-body o-layout__item">
        <b>{props.title + ": " + formattedDate}</b>
      </p>
    </>
  );
}

export default DateDisplay;
