import BannerHome from "@/components/ui/home/BannerHome";
import OurProgram from "@/components/ui/home/ourprogram/OurProgram";

export default function Home() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between">
        <BannerHome/>
        <OurProgram/>
      </main>
    </>
  );
}
