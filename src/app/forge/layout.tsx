import ForgeHeader from "@/components/ForgeHeader";

export default function ForgeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen">
      <ForgeHeader />
      {children}
    </div>
  );
}
