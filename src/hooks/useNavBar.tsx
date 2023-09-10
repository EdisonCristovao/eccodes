"use client";
import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

type NavBarContextProps = {
  currentPage: string;
  setCurrentPage: Dispatch<SetStateAction<string>>;
};
const NavBarContext = createContext({} as NavBarContextProps);

export function NavBarProvider({ children }: { children: React.ReactNode }) {
  const [currentPage, setCurrentPage] = useState<string>("/");

  return (
    <NavBarContext.Provider value={{ currentPage, setCurrentPage }}>
      {children}
    </NavBarContext.Provider>
  );
}

export function useNavBar(): NavBarContextProps {
  return useContext(NavBarContext);
}
