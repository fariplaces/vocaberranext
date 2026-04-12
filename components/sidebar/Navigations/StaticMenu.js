
import {
   ChartNoAxesColumn,
   TrendingUp,
} from "lucide-react";
import { GoTypography } from "react-icons/go";
import { LuListTodo } from "react-icons/lu";
import { GiBrain } from "react-icons/gi";
import { RiEnglishInput } from "react-icons/ri";
import { PiNotionLogoFill } from "react-icons/pi";



const StaticNavitaionMenu = [
   {
      name: "DASHBOARD",
      icon: ChartNoAxesColumn,
      hasSubmenu: true,
      link: "/dashboard",
      subItems: [
         {
            item: "Tasking Stats",
            href: "/dashboard/tasking",
         },
         {
            item: "Typing Exercises",
            href: "/dashboard/typing/exercises",
         },
         {
            item: "Typing Tests",
            href: "/dashboard/typing/tests",
         },
         {
            item: "Revisions",
            href: "/dashboard/progress/revisions",
         },
         {
            item: "Skills",
            href: "/dashboard/progress/skills",
         },
      ],
   },
   {
      name: "Revisions",
      icon: GiBrain,
      hasSubmenu: true,
      link: "",
      subItems: [
         {
            item: "Pending R-I",
            href: "/dashboard/progress/pendingri",
         },
         {
            item: "Pending R-II",
            href: "/dashboard/progress/pendingrii",
         },
         {
            item: "Pending R-III",
            href: "/dashboard/progress/pendingriii",
         },
         {
            item: "Scheduled",
            href: "/dashboard/progress/scheduled",
         },
      ],
   },
   {
      name: "Taskings",
      icon: LuListTodo,
      hasSubmenu: true,
      link: "",
      subItems: [
         {
            item: "TODO Tasks",
            href: "/tasks/today-tasks",
         },
         {
            item: "Tomorrow Tasks",
            href: "/tasks/tom-tasks",
         },
         {
            item: "Yesterday Tasks",
            href: "/tasks/yes-tasks",
         },
         {
            item: "All Tasks",
            href: "/tasks/all-tasks",
         },
         {
            item: "Default Tasks",
            href: "/tasks/default-tasks",
         },
      ],
   },
   // { name: "COMMUNICATION", icon: Home, hasSubmenu: false },
   {
      name: "Communication Skill",
      icon: RiEnglishInput,
      hasSubmenu: true,
      subItems: [
         {
            item: "Home",
            href: "/",
         },
         {
            item: "Word List",
            href: "word",
         },
         {
            item: "Meanings",
            href: "meaning",
         },
      ],
   },
   {
      name: "Notion",
      icon: PiNotionLogoFill,
      hasSubmenu: false,
      link: "/notes2",
   },
   {
      name: "Typing",
      icon: GoTypography,
      hasSubmenu: true,
      subItems: [
         {
            item: "Exercises",
            href: "/typing/exercise/course",
         },
         {
            item: "Tests",
            href: "/typing/exercise/test",
         },
      ],
   },
   {
      name: "Manage Typing",
      type: "Admin",
      icon: GoTypography,
      hasSubmenu: true,
      subItems: [
         {
            item: "Exercises List",
            href: "/typing/manage/exercises",
         },
         {
            item: "Tests List",
            href: "/typing/manage/tests",
         },
      ],
   },
   {
      name: "Manage Skills",
      icon: TrendingUp,
      type: "Admin",
      hasSubmenu: true,
      subItems: [
         {
            item: "Skills",
            href: "/skills/manage/skills",
         },
         {
            item: "Parent-Categories",
            href: "/skills/manage/parent-categories",
         },
         {
            item: "Sub-Categories",
            href: "/skills/manage/sub-categories",
         },
         {
            item: "Categories",
            href: "/skills/manage/categories",
         },
         {
            item: "Topics List",
            href: "/skills/manage/topics",
         },
      ],
   },
   { name: "Skills Module", icon: TrendingUp, hasSubmenu: false, link: "/skills" },
   { name: "Revision Module", icon: TrendingUp, hasSubmenu: false, link: "/revisions" },

];
export default StaticNavitaionMenu;