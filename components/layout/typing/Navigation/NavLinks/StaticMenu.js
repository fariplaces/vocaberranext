import { ChartNoAxesColumn } from "lucide-react";
import { GoTypography } from "react-icons/go";

const StaticNavitaionMenu = [
  {
    name: "DASHBOARD",
    icon: ChartNoAxesColumn,
    hasSubmenu: true,
    // link: "/dashboard",
    subItems: [
      {
        item: "Typing Exercises",
        href: "/typing/dashboard/exercises",
      },
      {
        item: "Typing Tests",
        href: "/typing/dashboard/tests",
      },
    ],
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
    icon: GoTypography,
    hasSubmenu: true,
    subItems: [
      {
        item: "Exercises List",
        href: "/typing/manage/course",
      },
      {
        item: "Tests List",
        href: "/typing/manage/test",
      },
    ],
  },
  {
    name: "Logout",
    icon: GoTypography,
    hasSubmenu: false,
    link: "/",
  },
];
export default StaticNavitaionMenu;
