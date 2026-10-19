import { NavLink } from "react-router-dom";
import {
  
  PlusCircle,
  List,
  ShoppingBag,
} from "lucide-react";

const Sidebar = () => {
  const navItems = [
 
    {
      name: "Add Items",
      path: "/add",
      icon: PlusCircle,
    },
    {
      name: "List Items",
      path: "/list",
      icon: List,
    },
    {
      name: "Orders",
      path: "/orders",
      icon: ShoppingBag,
    },
  ];

  return (
    <aside className="w-64 min-h-[calc(100vh-73px)] bg-white border-r border-slate-200">
      <nav className="p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              
              className={({ isActive }) =>
                `
                flex items-center gap-3
                px-4 py-3
                rounded-xl
                text-sm font-medium
                transition-all duration-200
                ${
                  isActive
                    ? "bg-pink-50 text-pink-600"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }
                `
              }
            >
              <Icon size={19} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;