// "use client";

import Image from 'next/image';
import Menu from "./menu"

import LanguageSwitch from "./localeSwtich";

import { getMenuItems } from "@services/menuService";
import { getAllPostsMetaData } from '@/services/postsService';

import { MenuDTO } from '@/interfaces/admin/MenuDTO';
import { PostsMetaDTO } from '@/interfaces/admin/PostsDTO';

import logo from '@images/logo/logo_baat.png'
import CustomLink from './customLink';

export default async function Header({ locale }) {

  const items: MenuDTO[] | null = await getMenuItems();
  const subItems: PostsMetaDTO[] | null = await getAllPostsMetaData();

  return (
    <header className="container m-auto flex justify-between items-center mb-10">

      <CustomLink href={'/' + locale}>
        <Image src={logo} alt='Logo image of BAAT' height={60}/>
      </CustomLink>

      <div className='flex gap-3'>
        <LanguageSwitch locale={locale} />
        <Menu items={items} subItems={subItems} locale={locale}/>
      </div>
    </header>
  );
}
