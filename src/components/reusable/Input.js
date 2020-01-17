import React from "react";
import { Input, SelectInput } from "@sky-uk/toolkit-react";
import "../../styles/input.scss";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const isExists = testSubject => {
  if (testSubject === "empty") {
    return null;
  } else {
    return testSubject;
  }
};

function InputComponent(props) {
  const { multipleInputs } = props;

  return multipleInputs.map(
    (
      [
        ClassName,
        type,
        name,
        labelText,
        maxlength,
        required,
        defaultValue,
        min,
        onChange,
        options,
        data
      ],
      index
    ) => {
      if (type === "select") {
        return (
          <SelectInput
            key={index}
            cssClassName={isExists(ClassName)}
            name={isExists(name)}
            labelText={isExists(labelText)}
            required={isExists(required)}
            defaultValue={isExists(defaultValue)}
            onChange={isExists(onChange)}
            options={isExists(options)}
          />
        );
      } else if (type === "richText") {
        console.log("object");
        return (
          <>
            <label>
              Description
              <abbr
                title="This field is required"
                className="c-form-required"
                name="description"
                id="description"
              >
                *
              </abbr>
            </label>

            <br />

            <CKEditor
              editor={ClassicEditor}
              data={isExists(data)}
              config={{
                heading: {
                  options: [
                    {
                      model: "paragraph",
                      view: { name: "h1", classes: "c-text-body" },
                      title: "Paragraph",
                      class: "ck-heading_paragraph"
                    },
                    {
                      model: "heading1",
                      view: { name: "h1", classes: "c-heading-charlie" },
                      title: "Heading 1",
                      class: "ck-heading_heading1"
                    },
                    {
                      model: "heading2",
                      view: { name: "h2", classes: "c-heading-delta" },
                      title: "Heading 2",
                      class: "ck-heading_heading2"
                    }
                  ]
                }
              }}
              onChange={isExists(onChange)}
            />
          </>
        );
      } else {
        return (
          <Input
            key={index}
            cssClassName={isExists(ClassName)}
            type={isExists(type)}
            name={isExists(name)}
            labelText={isExists(labelText)}
            maxlength={isExists(maxlength)}
            required={isExists(required)}
            defaultValue={isExists(defaultValue)}
            min={isExists(min)}
            onChange={isExists(onChange)}
          />
        );
      }
    }
  );
}

export default InputComponent;
