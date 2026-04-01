import { TriangleAlert } from "lucide-react";

const DangerBlock = ({ block }) => (
   <div
      className="flex items-start gap-3 p-4 bg-orange-400 border border-red-800 rounded-lg text-red-800 my-2 w-full"
      contentEditable={false}
   >
      <div className="mt-0.5">
         <TriangleAlert />
      </div>
      <div className="flex-1">
         <strong
            className="block text-red-800 font-bold mb-1"
            contentEditable={true}
            suppressContentEditableWarning={true}
            onBlur={(e) => updateBlockProp('title', e.currentTarget.innerText)}
         >
            {block.props.title}
         </strong>
         <div
            className="text-white outline-none"
            contentEditable={true}
            suppressContentEditableWarning={true}
            onBlur={(e) => updateBlockProp('message', e.currentTarget.innerText)}
         >
            {block.props.message}
         </div>
      </div>
   </div>
);

export default DangerBlock;