'use client';

import { supabase } from '@/supabase/lib/supabaseClient';
import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';


export default function ClientWrapper({ children }: { children: ReactNode }) {
    const router = useRouter();

    useEffect(() => {
        const checkUser = async () => {
          const { data: { session } } = await supabase.auth.getSession();
          if (!session) {
            router.push('/auth');
          }
        };
      
        const timeout = setTimeout(() => {
          checkUser();
        }, 1000);
      
        return () => clearTimeout(timeout);
      }, [router]);
      

  return <>{children}</>;
}
