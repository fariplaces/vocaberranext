import { useState } from "react";

function CustomDropdown({ items, columns, getLabel, value, onChange, placeholder }) {
   const [open, setOpen] = useState(false);

   const selected = items.find((item) => item.id === value);

   return (
      <div className="relative w-96">
         {/* Trigger */}
         <div
            className="border border-gray-600 rounded p-1 cursor-pointer bg-[#141414]"
            onClick={() => setOpen(!open)}
         >
            {selected ? getLabel(selected) : placeholder}
         </div>

         {/* Dropdown */}
         {open && (
            <div className="absolute w-full bg-[#141414] border mt-1 shadow-lg z-10 max-h-60 overflow-y-auto">

               {/* Header */}
               <div className="flex font-bold text-blue-500 border-b bg-[#141414]">
                  {columns.map((col) => (
                     <div key={col.key} className="flex-1">
                        {col.label}
                     </div>
                  ))}
               </div>

               {/* Rows */}
               {items.map((item) => (
                  <div
                     key={item.id}
                     className="flex hover:bg-gray-800 cursor-pointer"
                     onClick={() => {
                        onChange(item.id); // 🔥 important
                        setOpen(false);
                     }}
                  >
                     {columns.map((col) => (
                        <div key={col.key} className="flex-1 border border-gray-600">
                           {item[col.key]}
                        </div>
                     ))}
                  </div>
               ))}
            </div>
         )}
      </div>
   );
}

export default CustomDropdown