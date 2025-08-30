import AuthProvider from "@/components/AuthProvider";
import Sidebar from "@/components/dashboard/Sidebar";

export const metadata = {
  title: "Dashboard - Lunovosti",
  description: "Content Management Dashboard",
};

export default function DashboardLayout({ children }) {
  return (
    <AuthProvider>
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </AuthProvider>
  );
}