import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  LayoutDashboard,
  FolderOpen,
  Briefcase,
  Menu as MenuIcon,
  BookOpen,
  Mail,
  Settings,
  ShieldAlert,
  Globe,
  Users,
  ChevronDown,
  LogOut,
  X
} from "lucide-react";
import { apiGet, setAuthToken } from "@/utils/api";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [enquiriesOpen, setEnquiriesOpen] = useState(false);
  const [cmsOpen, setCmsOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await apiGet("/auth/me");
        setUser(data.user);
        setLoading(false);
      } catch (err) {
        setAuthToken(null);
        router.push("/admin/login");
      }
    };
    fetchUser();
  }, [router]);

  // Keep dropdowns expanded if the current path falls inside them
  useEffect(() => {
    if (router.pathname.includes("/enquiries")) {
      setEnquiriesOpen(true);
    }
    if (
      router.pathname.includes("/gallery") ||
      router.pathname.includes("/about") ||
      router.pathname.includes("/services") ||
      router.pathname.includes("/industries")
    ) {
      setCmsOpen(true);
    }
    if (router.pathname.includes("/settings/")) {
      setSettingsOpen(true);
    }
  }, [router.pathname]);

  const handleLogout = () => {
    setAuthToken(null);
    router.push("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-400 font-medium tracking-wide">Securing Session...</p>
        </div>
      </div>
    );
  }

  const hasPermission = (moduleName, type = "read") => {
    if (!user) return false;
    if (user.role === "Super Admin") return true;
    return user.permissions?.[moduleName]?.[type] === true;
  };

  const getRequiredPermission = (path) => {
    if (path.startsWith("/admin/categories")) return { module: "products", type: "read" };
    if (path.startsWith("/admin/products")) return { module: "products", type: "read" };
    if (path.startsWith("/admin/blogs")) return { module: "blogs", type: "read" };
    if (path.startsWith("/admin/navbar")) return { module: "navbar", type: "read" };
    if (path.startsWith("/admin/enquiries")) return { module: "enquiries", type: "read" };
    if (path.startsWith("/admin/gallery")) return { module: "settings", type: "read" };
    if (path.startsWith("/admin/about")) return { module: "settings", type: "read" };
    if (path.startsWith("/admin/services")) return { module: "settings", type: "read" };
    if (path.startsWith("/admin/industries")) return { module: "settings", type: "read" };
    if (path.startsWith("/admin/partners")) return { module: "settings", type: "read" };
    if (path.startsWith("/admin/settings")) return { module: "settings", type: "read" };
    return null;
  };

  const navItems = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: LayoutDashboard,
      show: true,
    },
    {
      name: "Product Categories",
      path: "/admin/categories",
      icon: FolderOpen,
      show: hasPermission("products"),
    },
    {
      name: "Products",
      path: "/admin/products",
      icon: Briefcase,
      show: hasPermission("products"),
    },
    {
      name: "Blogs",
      path: "/admin/blogs",
      icon: BookOpen,
      show: hasPermission("blogs"),
    },
    {
      name: "Partners CMS",
      path: "/admin/partners",
      icon: Users,
      show: hasPermission("settings"),
    },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex font-sans overflow-hidden">
      
      {/* Sidebar Mobile Toggle Button */}
      <div className="lg:hidden fixed top-4 right-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-2xl border border-emerald-500/25 transition cursor-pointer"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-slate-950/95 border-r border-slate-800/60 backdrop-blur-md flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col flex-1 overflow-y-auto">
          {/* Logo / Header */}
          <div className="h-20 flex items-center justify-between px-6 border-b border-slate-900">
            <span className="text-lg font-black tracking-widest bg-gradient-to-r from-emerald-400 via-teal-400 to-green-500 bg-clip-text text-transparent">
              SRO SYSTEMS
            </span>
            <span className="px-2 py-0.5 text-[9px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-900/60 rounded-full uppercase">
              V1.4
            </span>
          </div>

          {/* Logged in User Profile Element */}
          <div className="p-4 mx-3 my-4 bg-slate-900/40 border border-slate-800/40 rounded-2xl flex items-center gap-3">
            <div className="relative">
              <img
                src={
                  user.profilePic
                    ? user.profilePic.startsWith("http")
                      ? user.profilePic
                      : `http://localhost:5001${user.profilePic}`
                    : "https://picsum.photos/seed/avatar/80/80"
                }
                alt={user.username}
                className="w-10 h-10 rounded-xl object-cover border border-slate-700 shadow-sm"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border border-slate-950 rounded-full animate-pulse"></span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-slate-100 truncate">
                {user.username}
              </span>
              <span className="text-[10px] text-slate-450 font-medium truncate uppercase tracking-wider">
                {user.role}
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-3 space-y-1.5">
            {navItems
              .filter((item) => item.show)
              .map((item) => {
                const isActive = router.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    href={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 border ${
                      isActive
                        ? "bg-emerald-950/40 border-emerald-500/25 text-emerald-400 font-bold shadow-md shadow-emerald-950/20"
                        : "text-slate-400 hover:text-slate-100 hover:bg-slate-900/50 border-transparent"
                    }`}
                  >
                    <item.icon className={`w-4 h-4 ${isActive ? "text-emerald-400" : "text-slate-400 group-hover:text-slate-100"}`} />
                    {item.name}
                  </Link>
                );
              })}

            {/* Enquiries Dropdown */}
            {hasPermission("enquiries") && (
              <div className="space-y-1">
                <button
                  onClick={() => setEnquiriesOpen(!enquiriesOpen)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all border ${
                    router.pathname.includes("/enquiries")
                      ? "bg-slate-900/40 border-slate-800 text-emerald-400"
                      : "text-slate-400 hover:text-slate-100 hover:bg-slate-900/50 border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <Mail className="w-4 h-4" />
                    <span>Enquiries</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-250 ${
                      enquiriesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {enquiriesOpen && (
                  <div className="pl-8 pr-2 py-1 space-y-1 bg-slate-950/20 rounded-xl">
                    <Link
                      href="/admin/enquiries/contact"
                      onClick={() => setSidebarOpen(false)}
                      className={`block px-4 py-2.5 rounded-lg text-xs font-semibold transition ${
                        router.pathname === "/admin/enquiries/contact"
                          ? "text-emerald-400 font-bold bg-emerald-950/25"
                          : "text-slate-450 hover:text-slate-100"
                      }`}
                    >
                      Contact Us Form
                    </Link>
                    <Link
                      href="/admin/enquiries/website"
                      onClick={() => setSidebarOpen(false)}
                      className={`block px-4 py-2.5 rounded-lg text-xs font-semibold transition ${
                        router.pathname === "/admin/enquiries/website"
                          ? "text-emerald-400 font-bold bg-emerald-950/25"
                          : "text-slate-450 hover:text-slate-100"
                      }`}
                    >
                      Website Forms
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Website CMS Dropdown */}
            {hasPermission("settings") && (
              <div className="space-y-1">
                <button
                  onClick={() => setCmsOpen(!cmsOpen)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all border ${
                    router.pathname.includes("/gallery") ||
                    router.pathname.includes("/about") ||
                    router.pathname.includes("/services") ||
                    router.pathname.includes("/industries")
                      ? "bg-slate-900/40 border-slate-800 text-emerald-400"
                      : "text-slate-400 hover:text-slate-100 hover:bg-slate-900/50 border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <Globe className="w-4 h-4" />
                    <span>Website CMS</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-250 ${
                      cmsOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {cmsOpen && (
                  <div className="pl-8 pr-2 py-1 space-y-1 bg-slate-950/20 rounded-xl">
                    <Link
                      href="/admin/gallery"
                      onClick={() => setSidebarOpen(false)}
                      className={`block px-4 py-2.5 rounded-lg text-xs font-semibold transition ${
                        router.pathname === "/admin/gallery"
                          ? "text-emerald-400 font-bold bg-emerald-950/25"
                          : "text-slate-450 hover:text-slate-100"
                      }`}
                    >
                      Media Gallery
                    </Link>
                    <Link
                      href="/admin/about"
                      onClick={() => setSidebarOpen(false)}
                      className={`block px-4 py-2.5 rounded-lg text-xs font-semibold transition ${
                        router.pathname === "/admin/about"
                          ? "text-emerald-400 font-bold bg-emerald-950/25"
                          : "text-slate-450 hover:text-slate-100"
                      }`}
                    >
                      About Us Section
                    </Link>
                    <Link
                      href="/admin/services"
                      onClick={() => setSidebarOpen(false)}
                      className={`block px-4 py-2.5 rounded-lg text-xs font-semibold transition ${
                        router.pathname === "/admin/services"
                          ? "text-emerald-400 font-bold bg-emerald-950/25"
                          : "text-slate-450 hover:text-slate-100"
                      }`}
                    >
                      Services CMS
                    </Link>
                    <Link
                      href="/admin/industries"
                      onClick={() => setSidebarOpen(false)}
                      className={`block px-4 py-2.5 rounded-lg text-xs font-semibold transition ${
                        router.pathname === "/admin/industries"
                          ? "text-emerald-400 font-bold bg-emerald-950/25"
                          : "text-slate-450 hover:text-slate-100"
                      }`}
                    >
                      Industries CMS
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Settings Dropdown */}
            {hasPermission("settings") && (
              <div className="space-y-1">
                <button
                  onClick={() => setSettingsOpen(!settingsOpen)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all border ${
                    router.pathname.includes("/settings/")
                      ? "bg-slate-900/40 border-slate-800 text-emerald-400"
                      : "text-slate-400 hover:text-slate-100 hover:bg-slate-900/50 border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-250 ${
                      settingsOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {settingsOpen && (
                  <div className="pl-8 pr-2 py-1 space-y-1 bg-slate-950/20 rounded-xl">
                    <Link
                      href="/admin/settings/profile"
                      onClick={() => setSidebarOpen(false)}
                      className={`block px-4 py-2.5 rounded-lg text-xs font-semibold transition ${
                        router.pathname === "/admin/settings/profile"
                          ? "text-emerald-400 font-bold bg-emerald-950/25"
                          : "text-slate-450 hover:text-slate-100"
                      }`}
                    >
                      Admin Profile
                    </Link>
                    <Link
                      href="/admin/settings/roles"
                      onClick={() => setSidebarOpen(false)}
                      className={`block px-4 py-2.5 rounded-lg text-xs font-semibold transition ${
                        router.pathname === "/admin/settings/roles"
                          ? "text-emerald-400 font-bold bg-emerald-950/25"
                          : "text-slate-450 hover:text-slate-100"
                      }`}
                    >
                      Role Permissions
                    </Link>
                    <Link
                      href="/admin/settings/contact"
                      onClick={() => setSidebarOpen(false)}
                      className={`block px-4 py-2.5 rounded-lg text-xs font-semibold transition ${
                        router.pathname === "/admin/settings/contact"
                          ? "text-emerald-400 font-bold bg-emerald-950/25"
                          : "text-slate-450 hover:text-slate-100"
                      }`}
                    >
                      Contact Details
                    </Link>
                  </div>
                )}
              </div>
            )}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-slate-900 bg-slate-950/30">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl text-sm font-bold text-rose-400 hover:text-white bg-rose-950/15 border border-rose-900/10 hover:bg-rose-600 transition duration-200 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Logout System
          </button>
        </div>
      </aside>

      {/* Main Workspace Frame */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        
        {/* Sleek Top Banner Bar */}
        <header className="h-20 border-b border-slate-800/40 bg-slate-900/80 backdrop-blur-md px-6 md:px-8 flex items-center justify-between select-none">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Live Core Environment
            </span>
          </div>
          <div className="text-xs font-bold text-slate-450 font-mono hidden md:block bg-slate-950/30 px-3.5 py-1.5 rounded-lg border border-slate-800/40">
            Node Server Status: <span className="text-emerald-400">Online</span>
          </div>
        </header>

        {/* Content canvas container */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto max-w-7xl w-full mx-auto select-text text-slate-100">
          {(() => {
            const reqPerm = getRequiredPermission(router.pathname);
            const authorized = !reqPerm || hasPermission(reqPerm.module, reqPerm.type);
            if (authorized) {
              return children;
            }
            return (
              <div className="bg-slate-950 border border-red-500/20 rounded-2xl p-10 text-center max-w-2xl mx-auto mt-16 shadow-2xl animate-popIn">
                <ShieldAlert className="w-16 h-16 text-rose-500 mx-auto mb-5" />
                <h2 className="text-2xl font-black text-slate-100 mb-3 tracking-wide">ACCESS RESTRICTED</h2>
                <p className="text-slate-400 mb-8 leading-relaxed">
                  Your credentials (<strong>{user.role}</strong>) lack authority to access the requested module. Contact System Security.
                </p>
                <Link
                  href="/admin"
                  className="inline-block py-3 px-8 bg-emerald-600 hover:bg-emerald-700 text-slate-900 font-bold rounded-xl text-xs uppercase tracking-wider shadow-lg transition active:scale-95"
                >
                  Return to Control Deck
                </Link>
              </div>
            );
          })()}
        </main>
      </div>
    </div>
  );
}
