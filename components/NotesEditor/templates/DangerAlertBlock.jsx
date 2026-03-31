
const DangerAlertBlock = ({ block }) => (
   <div
      className="flex items-start gap-3 p-4 bg-orange-300/50 border border-orange-800 rounded-lg text-red-300 my-2 w-full"
      contentEditable={false}
   >
      <div className="mt-0.5">
         <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="20" width="20">
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
         </svg>
      </div>
      <div className="flex-1">
         <strong
            className="block text-red-400 font-bold mb-1"
            contentEditable={true}
            suppressContentEditableWarning={true}
            onBlur={(e) => {
               // Keeps your BlockNote JSON state in sync when you edit the title
               block.props.title = e.target.innerText;
            }}
         >
            {block.props.title}
         </strong>
         <div
            className="text-white/90 outline-none"
            contentEditable={true}
            suppressContentEditableWarning={true}
            onBlur={(e) => {
               // Keeps your BlockNote JSON state in sync when you edit the message
               block.props.message = e.target.innerText;
            }}
         >
            {block.props.message}
         </div>
      </div>
   </div>
);

export default DangerAlertBlock;