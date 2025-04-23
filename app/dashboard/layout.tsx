import SideBar from '../ui/dashboard/sidebar';

export const experimental_ppr = true;

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideBar />
      </div>
      {/* <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div> */}
      <main className="pt-16 md:pt-6  p-6 transition-all duration-300">
        {children}
      </main>
    </div>
  );
}
