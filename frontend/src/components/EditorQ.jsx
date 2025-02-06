import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    ["link", "image", "video", "formula"],

    [{ size: [] }],
    [
      { list: "ordered" },
      { list: "bullet" }, { 'list': 'check' },
      { indent: "-1" },
      { indent: "+1" },
    ],
    [{ 'script': 'sub'}, { 'script': 'super' }],
    [{ 'direction': 'rtl' }],     
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],

    ['clean'] ,
     
    
  ],

  
};

const EditorQ = () => {
  const [value, setValue] = useState("");
  return (
    <div className="max-w-4xl mx-auto border border-gray-600 text-white p-5 h-[50vh] rounded-lg">
      <ReactQuill
        theme="snow"
        className="border rounded-lg text-white "
        value={value}
        onChange={setValue}
        modules={modules}
      />
      {/* {console.log(value)} */}
    </div>
  );
};

export default EditorQ;
