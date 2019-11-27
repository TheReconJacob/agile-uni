import React from "react";

class CourseDescription extends React.Component{
    constructor(){
        super();
    }
    render(){
let divText= this.props.courseId + "description";
let childDivText= this.props.courseId + "child";
let htmlString= "<a id="+childDivText+">" +this.props.CourseDescription+"</a>";
try{
let parentDiv = document.getElementById (divText);
let childDiv = document.getElementById(childDivText);
let range=document.createRange();
let documentFragment=range.createContextualFragment(htmlString);
parentDiv.replaceChild (documentFragment, childDiv);
}
catch{}
return(
<p className="c-text-body o-layout__item">
    <div id={divText}>
        <a id={childDivText}> bla </a>
    </div>
</p>
);
    }
}

export default CourseDescription;