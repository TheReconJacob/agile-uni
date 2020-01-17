import React from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function RichText(props) {
  const [editorContent, setEditorContent] = React.useState("");
  let optionalLabel = "";

  if (props.label) {
    optionalLabel = (
      <label
        htmlFor={props.name}
        style={{ float: "none", marginBottom: "5px" }}
      >
        {props.label}
        <mark style={{ backgroundColor: "transparent", color: "red" }}>
          {props.required ? " *" : ""}
        </mark>
      </label>
    );
  }

  return (
    <div>
      {optionalLabel}
      <input
        id={props.name}
        name={props.name}
        type="hidden"
        readOnly={true}
        value={editorContent}
      ></input>
      <div style={{ marginBottom: "10px" }}>
        <CKEditor
          content={editorContent}
          onChange={(event, editor) => setEditorContent(editor.getData())}
          editor={ClassicEditor}
        />
      </div>
    </div>
  );
}
export default RichText;
