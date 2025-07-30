export {};

declare global {
  interface Window {
    //Proven to work in renderer process
    versions: {
      node: () => string;
      chrome: () => string;
      electron: () => string;
    };
    electron: {
      shell: {
        openExternal: (url: string) => void;
      };
    };
    databaseAPI: any; // Optional, refine this if needed
  }
}
