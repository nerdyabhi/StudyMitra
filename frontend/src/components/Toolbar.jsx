import React, { useCallback, useEffect, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { 
  $getSelection, 
  $isRangeSelection, 
  FORMAT_ELEMENT_COMMAND, 
  FORMAT_TEXT_COMMAND 
} from "lexical";
import { Button } from "./ui/button";

const Toolbar = () => {
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikeThrough, setIsStrikeThrough] = useState(false);

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsStrikeThrough(selection.hasFormat("strikethrough"));
    }
  }, []);

  useEffect(() => {
    return editor.registerUpdateListener(() => {
      editor.read($updateToolbar);
    });
  }, [editor, $updateToolbar]);

  // Toggle headings (block format), example for h1
  const toggleHeading = (headingType) => {
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, headingType);
  };

  // Insert image: trigger the hidden <input> from ImagesPlugin
  const openFileDialog = () => {
    const fileInput = document.getElementById("lexical-file-input");
    if (fileInput) fileInput.click();
  };

  return (
    <div className="flex gap-2">
      {/* Bold, italic, underline, strike */}
      <Button
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
        className="font-bold"
        variant={isBold ? "secondary" : "ghost"}
      >
        B
      </Button>
      <Button
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}
        className="italic"
        variant={isItalic ? "secondary" : "ghost"}
      >
        I
      </Button>
      <Button
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")}
        className="underline"
        variant={isUnderline ? "secondary" : "ghost"}
      >
        U
      </Button>
      <Button
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough")}
        className="line-through"
        variant={isStrikeThrough ? "secondary" : "ghost"}
      >
        S
      </Button>

      {/* Headings */}
      <Button onClick={() => toggleHeading("h1")} variant="ghost">
        H1
      </Button>
      <Button onClick={() => toggleHeading("h2")} variant="ghost">
        H2
      </Button>

      {/* Insert image */}
      <Button onClick={openFileDialog} variant="ghost">
        Insert Image
      </Button>
    </div>
  );
};

export default Toolbar;