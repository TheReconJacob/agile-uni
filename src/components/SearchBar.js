import React, { Component } from "react";
import { ComboInput } from "@sky-uk/toolkit-react";
import DropdownLocation from "../Dropdown";

class SearchBar extends Component {
  render(){
    let newValue;
  return (
    <div className="o-layout o-layout--spaced" style={{ padding: 30 }}>
          <div className="o-layout__item u-width-1/4">
            <DropdownLocation />
          </div>
          <div className="o-layout__item u-width-3/4">
            <ComboInput
              cssClassName="search"
              onChange={value => {
                newValue = value;
              }}
              onButtonClick={() => {
                console.log(newValue);
              }}
            />
          </div>
          </div>
          );
        }
      }
          export default SearchBar;