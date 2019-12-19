import React from "react";

function CourseDescription(props) {
  let divText = props.courseId + "description";
  let childDivText = props.courseId + "child";
  let htmlString =
    "<div id=" + childDivText + ">" + props.CourseDescription + "</div>";
  try {
    let parentDiv = document.getElementById(divText);
    let childDiv = document.getElementById(childDivText);
    let range = document.createRange();
    let documentFragment = range.createContextualFragment(htmlString);
    parentDiv.replaceChild(documentFragment, childDiv);
  } catch {}
  return (
    <p className="c-text-body o-layout__item">
      <div id={divText}>
        <div id={childDivText} />
      </div>
    </p>
  );
}

export default CourseDescription;
