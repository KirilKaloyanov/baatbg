"use client";

import { useLoader } from "../context/LoaderContext";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

export default function CustomLink({
  href,
  children,
  ...props
}: {
  href: string;
  children: React.ReactNode;
}) {
  const { startNavigation } = useLoader();
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (pathname !== href) {
      startNavigation(() => {
        router.push(href);
      });
    }
    console.log(pathname, href)
  };

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
