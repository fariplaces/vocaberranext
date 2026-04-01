// import createBlockSpec from "./utils/createBlockSpec";

import { LuShieldAlert } from "react-icons/lu";

const SwareBlock = ({ block }) => (
   <div
      className="flex items-start gap-3 p-4 bg-rose-500/20 border border-red-800 rounded-lg text-yellow-300 my-2 w-full"
      contentEditable={false}
   >
      <div className="mt-0.5">
         <LuShieldAlert />
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

export default SwareBlock