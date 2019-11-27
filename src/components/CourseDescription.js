import React from "react";

class CourseDescription extends React.Component{
    constructor(){
        super();
    }
    render(){
let htmlString= this.props.CourseDescription;
return(
<p className="c-text-body o-layout__item">
    {htmlString}
</p>
);
    }
}

export default CourseDescription;