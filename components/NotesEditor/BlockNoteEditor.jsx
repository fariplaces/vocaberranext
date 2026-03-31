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
import CreateReactBlock from "./utils/CreateReactBlock";
import AlertComponent from "./templates/AlertTemplate";

// Step 1: createReactBlockSpec returns a FACTORY FUNCTION — assign it
// const createAlertBlock = createReactBlockSpec(
//    {
//       type: "alert",
//       propSchema: {
//          title: { default: "This will be the title" },
//          message: { default: "Type your warning message here..." },
//       },
//       content: "none",
//    },
//    {
//       render: ({ block }) => (
//          <div
//             className="flex items-start gap-3 p-4 bg-red-900/20 border border-red-800 rounded-lg text-red-300 my-2 w-full"
//             contentEditable={false}
//          >
//             <div className="mt-0.5">
//                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="20" width="20">
//                   <path fill="none" d="M0 0h24v24H0z" />
//                   <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
//                </svg>
//             </div>
//             <div className="flex-1">
//                <strong className="block text-red-400 font-bold mb-1" contentEditable={true} suppressContentEditableWarning> {block.props.title}</strong>
//                <div
//                   className="text-white/90 outline-none"
//                   contentEditable={true}
//                   suppressContentEditableWarning
//                >
//                   {block.props.message}
//                </div>
//             </div>
//          </div>
//       ),
//    }
// );


const factory = {
   alert: CreateReactBlock(
      "alert",
      { title: "This will be the title", message: "Type your warning message here..." },
      AlertComponent
   ),
}
// Create the factory
// const createAlertBlock = CreateReactBlock(
//    "alert",
//    { title: "This will be the title", message: "Type your warning message here..." },
//    AlertComponent
// );
const callFactories = (factoryMap) =>
   Object.fromEntries(
      Object.entries(factoryMap).map(([key, factory]) => [key, factory()])
   );

// Step 2: CALL the factory to get the actual block spec
const schema = BlockNoteSchema.create({
   blockSpecs: {
      ...defaultBlockSpecs,
      // alert: createAlertBlock(), // <-- () is critical
      ...callFactories(factory),
   },
});

// Step 3: Slash menu items
const getCustomItems = (editor) => [
   {
      title: "Custom Alert",
      group: "New Style",
      onItemClick: () => {
         editor.insertBlocks(
            [{ type: "alert", props: { message: "Type your warning here..." } }],
            editor.getTextCursorPosition().block,
            "after"
         );
      },
   },
];

export default function BlockNoteEditor({ onChange, initialContent }) {
   const editor = useCreateBlockNote({
      schema, // Step 4: pass schema here
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