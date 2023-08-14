"use client";

import React, { createContext, useContext, useState } from "react";

type OpenFilesContextProps = {
  openFiles: string[];
  markFileAsOpen: (file: string) => void;
  closeFile: (file: string) => void;
};

const OpenFileContext = createContext({} as OpenFilesContextProps);

export function OpenFilesProvider({ children }: { children: React.ReactNode }) {
  const [openFiles, setOpenFiles] = useState<string[]>([]);

  const markFileAsOpen = (file: string) => {
    if (openFiles.includes(file)) return;

    setOpenFiles([...openFiles, file]);
  };

  const closeFile = (file: string) => {
    const filteredFiles = openFiles.filter((openedFile) => openedFile != file);
    setOpenFiles(filteredFiles);
  };

  return (
    <OpenFileContext.Provider value={{ openFiles, markFileAsOpen, closeFile }}>
      {children}
    </OpenFileContext.Provider>
  );
}

export function useOpenFiles(): OpenFilesContextProps {
  return useContext(OpenFileContext);
}
