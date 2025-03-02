"use client";

import { usePathname, useRouter } from "../i18n/navigation";

export default function LanguageSwitch({ locale }) {
    const pathname = usePathname();
    const router = useRouter();

    const switchLocale = (locale: string) => {
        if (locale == "bg") {
            router.replace(pathname, { locale: 'en' })
        }
        if (locale == "en") {
            router.replace(pathname, { locale: 'bg' })
        }
    }

    return (
        <div style={{display: 'flex', justifyContent: "flex-end"}}>
            <button onClick={() => {switchLocale(locale)}}>{locale == "bg" ? "English" : "Български"}</button>
            {/* <button onClick={() => {switchLocale('bg')}}>Български</button> */}
        </div>
    )
}
