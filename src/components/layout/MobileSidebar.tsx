
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  BarChart3, 
  Calendar, 
  MessageSquare, 
  Users, 
  FileText, 
  Wallet, 
  BellRing, 
  Settings, 
  Home,
  ChevronDown,
  ChevronUp,
  Moon,
  Sun
} from "lucide-react";
import { useTheme } from "../theme/ThemeProvider";
import { Button } from "@/components/ui/button";

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
    icon: <Home className="h-5 w-5" />,
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
    icon: <Wallet className="h-5 w-5" />,
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

const MobileSidebar: React.FC = () => {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>("Employees");
  const { theme, setTheme } = useTheme();

  const toggleSubmenu = (title: string) => {
    setOpenSubmenu(openSubmenu === title ? null : title);
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900">
      <div className="flex items-center justify-between h-16 border-b px-4 py-2">
        <div className="flex items-center space-x-2">
          <div className="h-6 w-6 rounded-full bg-primary-800 dark:bg-primary-500"></div>
          <span className="text-lg font-semibold text-primary-800 dark:text-primary-100">Supra Pens</span>
        </div>
        <Button 
          variant="ghost" 
          size="icon"
          className="rounded-full"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <ul className="space-y-1">
          {navItems.map((item, index) => (
            <li key={index} className="py-0.5">
              {item.submenu ? (
                <div className="mb-1">
                  <button
                    onClick={() => toggleSubmenu(item.title)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      openSubmenu === item.title
                        ? "bg-accent/20 text-accent-foreground"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span>{item.title}</span>
                    </div>
                    {openSubmenu === item.title ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </button>
                  {openSubmenu === item.title && (
                    <ul className="mt-1 space-y-1 pl-10 pr-2">
                      {item.submenu.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <NavLink
                            to={subItem.href}
                            className={({ isActive }) =>
                              cn(
                                "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                                isActive
                                  ? "bg-accent text-accent-foreground"
                                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                              )
                            }
                          >
                            {subItem.title}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <NavLink
                  to={item.href}
                  end={item.href === "/dashboard"}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    )
                  }
                >
                  {item.icon}
                  {item.title}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default MobileSidebar;
