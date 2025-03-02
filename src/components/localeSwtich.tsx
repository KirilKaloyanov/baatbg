"use client";

import { usePathname, useRouter } from "../i18n/navigation";

export default function LanguageSwitch() {
    const pathname = usePathname();
    const router = useRouter();

    const switchLocale = (locale: string) => {
        router.replace(pathname, { locale })
    }

    return (
        <div style={{display: 'flex', justifyContent: "flex-end"}}>
            <button onClick={() => {switchLocale('en')}}>English</button>
            <button onClick={() => {switchLocale('bg')}}>Български</button>
        </div>
    )
}
