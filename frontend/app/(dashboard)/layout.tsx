import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PrivateRoute } from "@/components/privateRoute";


export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
            <PrivateRoute>
                <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-80">
                    <Sidebar />
                </div>
                <main className="md:pl-72 h-full bg-background overflow-hidden">
                    <Header />
                    <div className="p-8 h-[calc(100vh-4rem)] overflow-y-auto main-content-scroll">
                        {children}
                        <ReactQueryDevtools initialIsOpen={false} />
                    </div>
                </main>
            </PrivateRoute>
    );
}
