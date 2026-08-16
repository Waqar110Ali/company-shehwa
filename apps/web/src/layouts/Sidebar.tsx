import SidebarPanel from "./SidebarPanel";

export default function Sidebar() {
  return (
    <aside className="hidden h-screen w-72 flex-col border-r border-white/10 bg-slate-950/50 backdrop-blur-3xl lg:flex">
      <SidebarPanel />
    </aside>
  );
}