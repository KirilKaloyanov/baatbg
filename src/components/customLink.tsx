"use client";

import { useLoader } from "../context/LoaderContext";
import { useRouter } from "next/navigation";
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

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    startNavigation(() => {
      router.push(href);
    });
  };

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
