import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $createParagraphNode, $getSelection, $isRangeSelection } from "lexical";
import { useCallback } from "react";

export default function ImagesPlugin() {
  const [editor] = useLexicalComposerContext();

  const insertImage = useCallback(async (file) => {
    if (!file) return;
    
    // 1. Upload the file to your server or get a local base64 URL
    const imageUrl = URL.createObjectURL(file);

    // 2. Insert an <img> node into the editor
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        // Simple approach: Insert an image via a plain <img> tag
        const imgNode = $createParagraphNode();
        imgNode.setFormat("left"); // or 'center'
        imgNode.append(
          // Quick inline approach; for production, create a custom Lexical Node
          editor.parseEditorState(`<p><img src="${imageUrl}" alt="uploaded" /></p>`)
            ._nodeMap.get("1") // Grabs the <img> node inside the parsed content
        );
        selection.insertNodes([imgNode]);
      }
    });
  }, [editor]);

  // Render a hidden input for selecting images or adjust for drag-n-drop
  return (
    <input
      type="file"
      accept="image/*"
      style={{ display: "none" }}
      onChange={(e) => insertImage(e.target.files?.[0])}
      id="lexical-file-input"
    />
  );
}