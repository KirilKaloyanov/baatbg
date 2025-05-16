import Image from 'next/image';

import Header from "../../components/navigation/header";
import Loader from "@/components/navigation/loader";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { LoaderProvider } from "@context/LoaderContext";

import { getMenuItems } from "@services/menuService";
import { getAllPostsMetaData } from "@/services/postsService";

import { MenuDTO } from "@/interfaces/admin/MenuDTO";
import { PostsMetaDTO } from "@/interfaces/admin/PostsDTO";

import fbLogo from '@icons/fb.svg'
import ytLogo from '@icons/youtube.svg'

import '../globals.css'

export const metadata = {
  title: "BAAT application",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages({ locale });

  const items: MenuDTO[] | null = await getMenuItems();
  const subItems: PostsMetaDTO[] | null = await getAllPostsMetaData();

  return (
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300..700;1,300..700&family=Raleway:ital,wght@0,100..900;1,100..900&family=Oswald:wght@200..700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,1,0" />  
      </head>
      <body className='min-h-screen flex flex-col'>
          <NextIntlClientProvider messages={messages}>
            <LoaderProvider>
              <Loader />
              <Header locale={locale} items={items} subItems={subItems} />

              <main className="container mx-auto mt-25 grow-1">
                {children}
              </main>

              <footer className="h-[30vh] bg-foreground text-background flex justify-center items-center">
                <Image src={fbLogo} alt='Icon' className='text-primary' height={20}/>
                <Image src={ytLogo} alt='Icon' className='text-primary' height={20}/>
              </footer>
            </LoaderProvider>
          </NextIntlClientProvider>
      </body>
    </html>
  );
}
