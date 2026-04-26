import { usePathname } from "next/navigation";

const Button = (title = "default title", url = "/") => {

   const pathName = usePathname();

   // "/pending"
   // "/cleared"
   // "/overdue"
   // "/"


   // short-circuit Operator
   // (condition/s) && //return
   return (
      <button className={`${pathName === url ? "bg-blue-500" : "bg-red-500"} hover:bg-gray-50`}>
         {title}
      </button>
   )


}