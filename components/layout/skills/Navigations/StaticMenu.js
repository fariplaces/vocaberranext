import { ChartNoAxesColumn, TrendingUp } from "lucide-react";

const StaticSkillNavitaionMenu = [
  {
    name: "DASHBOARD",
    icon: ChartNoAxesColumn,
    hasSubmenu: true,
    subItems: [
      {
        item: "Skills",
        href: "/skills/dashboard/progress/skills",
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
        item: "Categories",
        href: "/skills/manage/categories",
      },
      {
        item: "Topics List",
        href: "/skills/manage/topics",
      },
    ],
  },
  {
    name: "Logout",
    icon: TrendingUp,
    hasSubmenu: false,
    link: "/",
  },
];
export default StaticSkillNavitaionMenu;
