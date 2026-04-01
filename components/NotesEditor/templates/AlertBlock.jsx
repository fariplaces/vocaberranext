// // import createBlockSpec from "./utils/createBlockSpec";

// import { TbAlertSquareRounded } from "react-icons/tb";

// const AlertBlock = ({ block }) => (
//    <div
//       className="flex items-start gap-3 p-4 bg-yellow-500 border-red-400 border-2 rounded-lg text-red-800 my-2 w-full"
//       contentEditable={false}
//    >
//       <div className="mt-0.5">
//          <TbAlertSquareRounded />
//       </div>
//       <div className="flex-1">
//          <strong className="block text-red-400 font-bold mb-1" contentEditable={true} suppressContentEditableWarning>
//             {block.props.title}
//          </strong>
//          <div className="text-black outline-none" contentEditable={true} suppressContentEditableWarning>
//             {block.props.message}
//          </div>
//       </div>
//    </div>
// );

// export default AlertBlock


import { TbAlertSquareRounded } from "react-icons/tb";

const AlertBlock = ({ block, editor }) => {

   // Helper function to update props in BlockNote's document state
   const updateBlockProp = (key, value) => {
      editor.updateBlock(block, {
         props: {
            ...block.props,
            [key]: value
         }
      });
   };

   return (
      <div
         className="flex items-start gap-3 p-4 bg-yellow-500 border-red-400 border-2 rounded-lg text-red-800 my-2 w-full"
         contentEditable={false} // Keeps BlockNote from treating the whole wrapper as text
      >
         <div className="mt-0.5">
            <TbAlertSquareRounded size={24} />
         </div>
         <div className="flex-1">
            {/* 1. Title Field */}
            <strong
               className="block text-red-400 font-bold mb-1 outline-none min-h-[1.5rem]"
               contentEditable={true}
               suppressContentEditableWarning
               // 🔥 THE FIX: Tell BlockNote to update when the user stops typing
               onBlur={(e) => updateBlockProp('title', e.currentTarget.innerText)}
            >
               {block.props.title}
            </strong>

            {/* 2. Message Field */}
            <div
               className="text-black outline-none min-h-[1.5rem]"
               contentEditable={true}
               suppressContentEditableWarning
               // 🔥 THE FIX: Tell BlockNote to update when the user stops typing
               onBlur={(e) => updateBlockProp('message', e.currentTarget.innerText)}
            >
               {block.props.message}
            </div>
         </div>
      </div>
   );
};

export default AlertBlock;