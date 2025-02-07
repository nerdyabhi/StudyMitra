import React from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import Toolbar from "./Toolbar";
import ImagesPlugin from "./ImagePlugin.jsx";

const exampleTheme = {
  text: {
    bold: "font-bold",
    italic: "italic",
    underline: "underline",
    strikethrough: "line-through",
  },
  // ...list, heading, code, etc.
};

function onError(error) {
  console.error(error);
}

export const Editor = () => {
  const initialConfig = {
    namespace: "MyEditor",
    theme: exampleTheme,
    onError,
  };

  return (
    <div className="max-w-4xl mx-auto border border-gray-600 text-white p-5 h-[50vh] rounded-lg">
      <LexicalComposer initialConfig={initialConfig}>
        <Toolbar />
        {/* Hidden input from ImagesPlugin for file uploads */}
        <ImagesPlugin />
        <RichTextPlugin
          contentEditable={<ContentEditable className="focus:outline-none" />}
          placeholder={<div className="text-slate-600">Enter some text...</div>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <AutoFocusPlugin />
      </LexicalComposer>
    </div>
  );
};