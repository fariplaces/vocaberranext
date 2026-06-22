"use client";
import {
  Keyboard,
  BookOpen,
  LayoutDashboard,
  GitBranch,
  MessageSquare,
  FileText,
} from "lucide-react";
import Link from "next/link";

const HomePage = () => {
  const apps = [
    {
      id: "typing",
      name: "Typing",
      description: "Practice your typing skills",
      icon: Keyboard,
      route: "/typing",
      color: "from-blue-500 to-blue-600",
    },
    {
      id: "skills",
      name: "Skills",
      description: "Manage and track your skills",
      icon: BookOpen,
      route: "/skills",
      color: "from-green-500 to-green-600",
    },
    {
      id: "dashboard",
      name: "Dashboard",
      description: "View your progress and statistics",
      icon: LayoutDashboard,
      route: "/dashboard",
      color: "from-purple-500 to-purple-600",
    },
    {
      id: "revisions",
      name: "Revisions",
      description: "Review and revise your work",
      icon: GitBranch,
      route: "/revisions",
      color: "from-orange-500 to-orange-600",
    },
    {
      id: "communication",
      name: "Communication",
      description: "Connect and communicate",
      icon: MessageSquare,
      route: "/communication",
      color: "from-pink-500 to-pink-600",
    },
    {
      id: "notion",
      name: "Notion",
      description: "Organize your notes and ideas",
      icon: FileText,
      route: "/notion",
      color: "from-gray-500 to-gray-600",
    },
  ];

  return (
    <>
      <div className="container mx-auto px-12 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-200 dark:text-white mb-2">
            Welcome to MindOS
          </h2>
          <p className="text-slate-600 dark:text-slate-300">
            Choose an app to get started
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apps.map((app) => {
            const Icon = app.icon;
            return (
              <Link
                key={app.id}
                href={app.route}
                className="group relative overflow-hidden rounded-xl transition-all duration-300 hover:shadow-2xl"
              >
                <div className={`bg-gradient-to-br ${app.color} p-8 h-full`}>
                  {/* Background blur effect */}
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-300" />

                  {/* Content */}
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-4">
                      <div className="bg-white/20 p-3 rounded-lg group-hover:bg-white/30 transition-all duration-300 backdrop-blur-sm">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-white/60 group-hover:text-white transition-all duration-300">
                        →
                      </div>
                    </div>

                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {app.name}
                      </h3>
                      <p className="text-white/80 text-sm leading-relaxed">
                        {app.description}
                      </p>
                    </div>

                    {/* Hover effect accent */}
                    <div className="mt-4 h-1 bg-white/30 rounded-full group-hover:bg-white/60 transition-all duration-300 origin-left scale-x-0 group-hover:scale-x-100" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default HomePage;
