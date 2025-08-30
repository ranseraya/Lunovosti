import AuthProvider from "@/components/AuthProvider";

export const metadata = {
  title: "Dashboard - Lunovosti",
  description: "Content Management Dashboard",
};

export default function DashboardLayout({ children }) {
  return (
    <AuthProvider>
      <div className="flex h-screen bg-gray-100">
        {children}
      </div>
    </AuthProvider>
  );
}