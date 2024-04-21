import React, { createContext, useContext, useMemo, useState } from "react";

export type File = {
  path: string;
  contents: string;
};

export const workspaceContext = createContext<{
  activeFile?: File;
  activateFile: React.Dispatch<React.SetStateAction<string>>;
  files: File[];
}>({
  activeFile: null,
  activateFile: () => {},
  files: [],
});

export const WorkspaceProvider: React.FC<{ files: File[] }> = ({
  files,
  children,
}) => {
  const [activeFilePath, setActiveFilePath] = useState<string>(null);

  const activeFile = useMemo(() => {
    const foundFile = files.find((f) => f.path === activeFilePath);
    return foundFile || files[0];
  }, [activeFilePath]);

  const ctxVal = {
    activeFile,
    activateFile: setActiveFilePath,
    files,
  };

  return (
    <workspaceContext.Provider value={ctxVal}>
      {children}
    </workspaceContext.Provider>
  );
};

export function useWorkspaceContext() {
  return useContext(workspaceContext);
}
