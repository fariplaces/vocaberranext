// import createBlockSpec from "./utils/createBlockSpec";

import { ShieldCheckIcon } from "lucide-react";

const CriticalBlock = ({ block }) => (
   <div
      className="flex items-start gap-3 p-4 bg-rose-700/60 border border-red-800 rounded-lg text-red-300 my-2 w-full"
      contentEditable={false}
   >
      <div className="mt-0.5">
         <ShieldCheckIcon />
      </div>
      <div className="flex-1">
         <strong className="block text-yellow-400 font-bold mb-1" contentEditable={true} suppressContentEditableWarning>
            {block.props.title}
         </strong>
         <div className="text-white/90 outline-none" contentEditable={true} suppressContentEditableWarning>
            {block.props.message}
         </div>
      </div>
   </div>
);

export default CriticalBlock