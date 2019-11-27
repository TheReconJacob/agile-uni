import React from "react";

class CourseDescription extends React.Component{
    constructor(){
        super();
    }
    render(){
let htmlString= this.props.CourseDescription;
return(
<> 
{htmlString}
</>
);
    }
}

export default CourseDescription;