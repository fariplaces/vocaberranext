// import createBlockSpec from "./utils/createBlockSpec";

import { Aperture } from "lucide-react";

const ImportantBlock = ({ block }) => (
   <div
      className="flex items-start gap-3 p-4 bg-red-900/20 border border-red-800 rounded-lg text-red-300 my-2 w-full"
      contentEditable={false}
   >
      <div className="mt-0.5">
         <Aperture />
      </div>
      <div className="flex-1">
         <strong className="block text-red-400 font-bold mb-1" contentEditable={true} suppressContentEditableWarning onBlur={(e) => updateBlockProp('title', e.currentTarget.innerText)}>
            {block.props.title}
         </strong>
         <div className="text-white/90 outline-none" contentEditable={true} suppressContentEditableWarning onBlur={(e) => updateBlockProp('message', e.currentTarget.innerText)}>
            {block.props.message}
         </div>
      </div>
   </div>
);

export default ImportantBlock