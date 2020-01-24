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
      <RichText
        name="TestRichText"
        label="Test RichText Label"
        required={true}
      />
    )
  },

  // Select Builder
  select: {
    builder: builders.selectBuilder,
    expectedDOM: (
      <Select
        name="TestSelect"
        label="Test Select Label"
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
    expectedDOM: <ButtonComponent type="button" text="Test Button Text" />
  },

  // Header Builder
  header: {
    builder: builders.headerBuilder,
    expectedDOM: <h1 className="header">Testing Header</h1>
  },

  // Input Builders
  text: {
    builder: builders.inputBuilder,
    expectedDOM: (
      <Input
        id="TestText"
        type="text"
        labelText="Test TextBox Label"
        required={true}
      />
    )
  },
  number: {
    builder: builders.inputBuilder,
    expectedDOM: (
      <Input
        id="TestNumber"
        type="number"
        labelText="Test Number Label"
        required={false}
        min={0}
        max={100}
      />
    )
  },
  email: {
    builder: builders.inputBuilder,
    expectedDOM: (
      <Input
        id="TestEmail"
        type="email"
        labelText="Test Email Label"
        required={true}
      />
    )
  },
  tel: {
    builder: builders.inputBuilder,
    expectedDOM: (
      <Input id="TestTelephone" type="tel" labelText="Test Telephone Label" />
    )
  },
  password: {
    builder: builders.inputBuilder,
    expectedDOM: (
      <Input
        id="TestPassword"
        type="password"
        labelText="Test Password Label"
      />
    )
  },
  time: {
    builder: builders.inputBuilder,
    expectedDOM: <Input id="TestTime" type="time" labelText="Test Time Label" />
  },
  date: {
    builder: builders.inputBuilder,
    expectedDOM: <Input id="TestDate" type="date" labelText="Test Date Label" />
  }
});

export default testableComponents;
