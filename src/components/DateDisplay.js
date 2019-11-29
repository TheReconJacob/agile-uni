import React from "react";

class DateDisplay extends React.Component{
    render(){
        let formattedStart="";
        let formattedEnd="";
        try{
            formattedStart=new Intl.DateTimeFormat('en-GB', { 
                year: 'numeric', 
                month: 'long', 
                day: '2-digit' 
  }).format(Date.parse(this.props.start_date)) +" at "+ this.props.start_date.slice(11, 16);
  formattedEnd=new Intl.DateTimeFormat('en-GB', { 
    year: 'numeric', 
    month: 'long', 
    day: '2-digit' 
}).format(Date.parse(this.props.end_date)) +" at "+ this.props.end_date.slice(11, 16);

        }
        catch{}
let dateElement=(<><p className="c-text-body o-layout__item">
                        <b>Start: {formattedStart}
                        </b>
                      </p>
                      <p className="c-text-body o-layout__item">
                      <b>End: {formattedEnd}
                        </b>
                      </p>
                      </>
);
return(
<>
{dateElement}
</>
);
    }
}

export default DateDisplay;