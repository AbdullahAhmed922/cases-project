import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="h-full relative">
            <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-80 bg-[#0b1223] text-slate-100 border-r border-white/5">
                <Sidebar />
            </div>
            <main className="md:pl-72 h-full app-surface overflow-hidden">
                <Header />
                <div className="p-8 h-[calc(100vh-4rem)] overflow-y-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
