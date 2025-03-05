"use client";

import { usePathname } from "next/navigation";
import {
  useContext,
  useEffect,
  useState,
  createContext,
  useTransition,
} from "react";

const LoaderContext = createContext({
  isLoading: false,
  startNavigation: (callback: () => void) => {},
});

export function LoaderProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();

  useEffect(() => {
    setIsLoading(false);
  }, [pathname]);

  const startNavigation = (callback: () => void) => {
    setIsLoading(true);
    startTransition(() => {
      callback();
    });
  };

  return (
    <LoaderContext.Provider
      value={{ isLoading: isLoading || isPending, startNavigation }}
    >
      {children}
    </LoaderContext.Provider>
  );
}

export function useLoader() {
  return useContext(LoaderContext);
}
