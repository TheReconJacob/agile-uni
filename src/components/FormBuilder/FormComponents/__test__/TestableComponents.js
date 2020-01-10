import React from "react";

import * as builders from "../";

import ButtonComponent from "../../../reusable/Button";
import { Input } from "@sky-uk/toolkit-react";
import Select from "../../../reusable/Select";
import RichText from "../../../reusable/RichText";

const testableComponents = testJson => ({
  // Rich Text Builder
  rich_text: {
    builder: builders.richTextBuilder,
    expectedDOM: (
      <RichText name="TestRichText" label="Rich Text" required={true} />
    )
  },

  // Select Builder
  select: {
    builder: builders.selectBuilder,
    expectedDOM: (
      <Select
        name="TestSelect"
        label="Select"
        items={{
          opt1: { label: "Option 1" },
          opt2: { label: "Option 2" },
          opt3: { label: "Option 3" }
        }}
        required={true}
        default="Please select a location"
      />
    )
  },

  // Button Builder
  button: {
    builder: builders.buttonBuilder,
    expectedDOM: <ButtonComponent type="button" text="Test" />
  },

  // Input Builders
  text: {
    builder: builders.inputBuilder,
    expectedDOM: (
      <Input id="TestText" type="text" labelText="Text" required={true} />
    )
  },
  number: {
    builder: builders.inputBuilder,
    expectedDOM: (
      <Input
        id="TestNumber"
        type="number"
        labelText="Number"
        required={false}
        min={0}
        max={100}
      />
    )
  },
  email: {
    builder: builders.inputBuilder,
    expectedDOM: (
      <Input id="TestEmail" type="email" labelText="Email" required={true} />
    )
  },
  tel: {
    builder: builders.inputBuilder,
    expectedDOM: <Input id="TestTelephone" type="tel" labelText="Telephone" />
  },
  password: {
    builder: builders.inputBuilder,
    expectedDOM: (
      <Input id="TestPassword" type="password" labelText="Password" />
    )
  },
  time: {
    builder: builders.inputBuilder,
    expectedDOM: <Input id="TestTime" type="time" labelText="Time" />
  },
  date: {
    builder: builders.inputBuilder,
    expectedDOM: <Input id="TestDate" type="date" labelText="Date" />
  }
});

export default testableComponents;
