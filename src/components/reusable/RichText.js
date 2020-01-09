import React from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function RichText(props) {
  const [editorContent, setEditorContent] = React.useState("");

  let optionalLabel = "";
  if (props.label) {
    optionalLabel = (
      <label htmlFor={props.name} style={{ float: "none" }}>
        {props.label}
        <mark style={{ backgroundColor: "transparent", color: "red" }}>
          {props.required ? " *" : ""}
        </mark>
      </label>
    );
  }

  return (
    <div>
      <input
        name={`${props.name}-ck-editor-text`}
        type="hidden"
        readOnly={true}
        value={editorContent}
      ></input>

      {optionalLabel}

      <div style={{ marginBottom: "10px" }}>
        <CKEditor
          id={props.name}
          content={editorContent}
          onChange={(event, editor) => setEditorContent(editor.getData())}
          editor={ClassicEditor}
        />
      </div>
    </div>
  );
}

export default RichText;
