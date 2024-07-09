"use client"
import { useEffect } from 'react';
import { useRouter} from 'next/navigation';
import { useSession } from 'next-auth/react';
import BannerHome from "@/components/ui/home/BannerHome";
import OurProgram from "@/components/ui/home/ourprogram/OurProgram";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      console.log('Refreshing router...');
    } else {
      console.log('User is not authenticated');
    }
  }, [router, session, status]);

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between z-auto">
        <BannerHome/>
        <OurProgram/>
      </main>
    </>
  );
}
