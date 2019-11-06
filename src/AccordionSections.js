import React, { Component } from "react";
import { AccordionSection } from '@sky-uk/toolkit-react';

class AccordionSections extends AccordionSection {
    constructor(props) {
    super(props);
    this.state = {
    title: "",
    text: "Some text etc."
    }
}

render() {
return(
<div>
{this.state.text}
</div>
)
}


}

export default AccordionSections;