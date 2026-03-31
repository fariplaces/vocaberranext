"use client";

import {
   useCreateBlockNote,
   SuggestionMenuController,
   getDefaultReactSlashMenuItems,
   // createReactBlockSpec,
} from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import { BlockNoteSchema, defaultBlockSpecs, filterSuggestionItems } from "@blocknote/core";

import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import Factory from "./utils/Factories";


const schema = BlockNoteSchema.create({
   blockSpecs: {
      ...defaultBlockSpecs,
      ...Object.fromEntries(
         Object.entries(Factory).map(([key, { spec }]) => [key, spec()])
      ),
   },
});

// Auto-generated from factory keys — add a block to factory, it appears here automatically
const getCustomItems = (editor) =>
   Object.keys(Factory).map((type) => ({
      title: type.charAt(0).toUpperCase() + type.slice(1),
      group: "Custom Blocks",
      onItemClick: () => {
         editor.insertBlocks(
            [{ type, props: {} }],
            editor.getTextCursorPosition().block,
            "after"
         );
      },
   }));

export default function BlockNoteEditor({ onChange, initialContent }) {
   const editor = useCreateBlockNote({
      schema,
      initialContent: initialContent
         ? JSON.parse(initialContent)
         : [{ type: "paragraph", content: "Welcome! Type '/' to insert a custom block." }],
   });

   return (
      <div className="min-h-[300px] border border-gray-800 rounded-lg p-4 bg-slate-900/50">
         <BlockNoteView
            editor={editor}
            slashMenu={false}
            onChange={() => {
               if (onChange) onChange(JSON.stringify(editor.document));
            }}
         >
            <SuggestionMenuController
               triggerCharacter="/"
               getItems={async (query) =>
                  filterSuggestionItems(
                     [...getDefaultReactSlashMenuItems(editor), ...getCustomItems(editor)],
                     query
                  )
               }
            />
         </BlockNoteView>
      </div>
   );
}