import MainHeader from "@/components/MainHeader";
import MainFooter from "@/components/MainFooter";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <MainHeader />
      <div className="flex-grow">
        {children}
      </div>
      <MainFooter />
    </div>
  );
}
