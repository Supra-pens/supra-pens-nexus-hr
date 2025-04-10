
import React from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  BarChart3, 
  Calendar, 
  MessageSquare, 
  Users, 
  FileText, 
  BanknoteIcon, 
  BellRing, 
  Settings, 
  HomeIcon
} from "lucide-react";

type NavItem = {
  title: string;
  href: string;
  icon: React.ReactNode;
  submenu?: { title: string; href: string }[];
};

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <HomeIcon className="h-5 w-5" />,
  },
  {
    title: "Employees",
    href: "/employees",
    icon: <Users className="h-5 w-5" />,
    submenu: [
      { title: "All Employees", href: "/employees" },
      { title: "Departments", href: "/employees/departments" },
      { title: "Attendance", href: "/employees/attendance" },
      { title: "Leave", href: "/employees/leave" },
      { title: "Documents", href: "/employees/documents" },
    ],
  },
  {
    title: "Payroll",
    href: "/payroll",
    icon: <BanknoteIcon className="h-5 w-5" />,
    submenu: [
      { title: "Salary Structure", href: "/payroll/salary-structure" },
      { title: "Monthly Payroll", href: "/payroll/monthly" },
      { title: "Payslips", href: "/payroll/payslips" },
    ],
  },
  {
    title: "Events & Notices",
    href: "/events",
    icon: <BellRing className="h-5 w-5" />,
    submenu: [
      { title: "Company Events", href: "/events" },
      { title: "Announcements", href: "/events/announcements" },
      { title: "Celebrations", href: "/events/celebrations" },
    ],
  },
  {
    title: "Performance",
    href: "/performance",
    icon: <BarChart3 className="h-5 w-5" />,
  },
  {
    title: "Calendar",
    href: "/calendar",
    icon: <Calendar className="h-5 w-5" />,
  },
  {
    title: "Messages",
    href: "/messages",
    icon: <MessageSquare className="h-5 w-5" />,
  },
  {
    title: "Reports",
    href: "/reports",
    icon: <FileText className="h-5 w-5" />,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: <Settings className="h-5 w-5" />,
  },
];

const Sidebar: React.FC = () => {
  return (
    <aside className="hidden md:flex h-[calc(100vh-4rem)] w-64 flex-col border-r bg-background">
      <div className="flex flex-1 flex-col overflow-hidden">
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="px-2 space-y-1">
            {navItems.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.href}
                  end={item.href === "/dashboard"}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                      isActive
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                      "transition-colors"
                    )
                  }
                >
                  {item.icon}
                  {item.title}
                </NavLink>
                
                {item.submenu && (
                  <ul className="ml-6 mt-1 space-y-1">
                    {item.submenu.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        <NavLink
                          to={subItem.href}
                          className={({ isActive }) =>
                            cn(
                              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                              isActive
                                ? "bg-accent/80 text-accent-foreground"
                                : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                              "transition-colors"
                            )
                          }
                        >
                          {subItem.title}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
