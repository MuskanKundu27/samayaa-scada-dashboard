import { NavLink } from "react-router-dom";
import {
  House,
  Droplet,
  ChartLine,
  Waves,
  Filter,
  FlaskConical,
  Activity,
  FileText,
  Settings,
  BookOpen,
} from "lucide-react";

type SidebarProps = {
  isDark: boolean;
  onToggleTheme: () => void;
};



const menuItems = [
  { id: "overview", label: "Overview", icon: House },
  { id: "water-balance", label: "Water Balance", icon: Droplet },
  { id: "cooling-performance", label: "Cooling Performance", icon: ChartLine },
  { id: "coc-blowdown", label: "COC & Blowdown", icon: Waves },
  { id: "filter-intelligence", label: "Filter Intelligence", icon: Filter },
  { id: "chemicals", label: "Chemicals", icon: FlaskConical },
  { id: "predictive-maintenance", label: "Predictive Maintenance", icon: Activity },
  { id: "reports", label: "Reports", icon: FileText },
  { id: "settings", label: "Settings", icon: Settings },
  {id: "learning",label:"Learning", icon:BookOpen}
];


type MenuItem = (typeof menuItems)[number];

function Sidebar({ isDark, onToggleTheme }: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <h2 className="brand-title">SAMAYAA.AI</h2>
        <p>Water Intelligence Platform</p>
      </div>

<nav className="sidebar-nav">
  {menuItems.map((item: MenuItem) => {
    const Icon = item.icon;

    return (
      <NavLink
        key={item.id}
        to={"/" + item.id}
        className={({ isActive }) =>
          isActive ? "sidebar-link active" : "sidebar-link"
        }
      >
        <Icon size={18} strokeWidth={1.8} />
        <span>{item.label}</span>
      </NavLink>
    );
  })}
</nav>


      <div className="theme-control">
        <button
          type="button"
          className="theme-button"
          onClick={onToggleTheme}
        >
          {isDark ? "☀️ Switch to Light Mode" : "🌙 Switch to Dark Mode"}
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;