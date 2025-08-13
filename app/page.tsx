import Image from "next/image";
import { AppShell } from '@mantine/core';
import Header from '@/components/Header'
import Filter from '@/components/Filter'
export default function Home() {
  return (
    <AppShell>
      <Header/>
      <Filter/>
    </AppShell>
  );
}
