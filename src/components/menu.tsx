'use client'

import { useEffect, useState } from 'react';
import Image from 'next/image';

import { AnimatePresence, motion } from 'framer-motion'

import hamburger from '@icons/hamburger.svg';
import CustomLink from './customLink';
import { PostsMetaDTO } from '@/interfaces/admin/PostsDTO';
import { MenuDTO } from '@/interfaces/admin/MenuDTO';

import logo from '@images/logo/logo_baat.png'
import { useLoader } from '@/context/LoaderContext';
import { usePathname } from 'next/navigation';


export default function Menu({ 
    items, subItems, locale 
} : {
    items: MenuDTO[] | null, subItems: PostsMetaDTO[] | null, locale: string
})  {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen((current)  => !current);

    const isLoading = useLoader();
    const pathname = usePathname();

    useEffect(() => {
        setIsOpen(false);
    }, [isLoading]);
    
    return (
        <div>
            <Image src={hamburger} alt='menu icon' className='cursor-pointer hover:bg-accent' onClick={toggleMenu}/>

            <AnimatePresence>
                {isOpen ? 
                    <motion.div 
                        className='pr-4 pl-2 md:pl-4 absolute left-0 top-0 w-full bg-foreground text-background z-10 overflow-hidden'
                        layout
                        initial={{ height: 0}}
                        animate={{ height: "auto"}}
                        exit={{ height: 0, transition: {duration: 0.1} }}
                        transition={{type: 'spring', stiffness: 700, damping: 30}}
                    >
                        <div className='mt-2 container m-auto flex justify-between items-center'>
                            <Image className='grayscale invert' src={logo} alt='Logo image of BAAT' height={60}/>
                            <span className='material-symbols-rounded text-white cursor-pointer ' onClick={toggleMenu}>
                                close
                            </span>
                        </div>
                        <nav className='pb-18 container m-auto text-right md:text-left md:grid md:grid-cols-4'>

                            { items &&
                                items.map((i: MenuDTO) => (
                                <div key={i.id} className='mt-10'>
                                    { pathname !== `/${locale}/${i.path}` ?
                                        
                                        <CustomLink href={`/${locale}/${i.path}`}>
                                            <h6 className='mb-4 hover:text-primary'>{i.label[locale]}</h6>
                                        </CustomLink>
                                    :     
                                        <h6 className='mb-4 text-primary'>{i.label[locale]}</h6>
                                }
                                    { subItems &&
                                        subItems
                                            .filter(si => si.menuPath === i.path)
                                            .map((si: PostsMetaDTO) => (
                                                <div key={si.id}>
                                                    {pathname !== `/${locale}/${si.menuPath}/${si.subMenuPath}` ?

                                                        <CustomLink  href={`/${locale}/${si.menuPath}/${si.subMenuPath}`} >
                                                            <span className="hover:text-primary">{si.heading[locale]}</span>
                                                        </CustomLink>
                                                    :
                                                        <span className="text-primary">{si.heading[locale]}</span>
                                                    }
                                                </div>
                                            ))  
                                    }

                                </div>
                                ))

                            }


                        </nav>
                        
                    </motion.div>
                    : null
                }
            </AnimatePresence>
            
        </div>
    )
}

