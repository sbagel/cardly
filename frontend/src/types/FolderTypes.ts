export interface Folder {
  id: number;
  userID: number;
  folderName: string;
  bookmarked: boolean;
}

export interface FoldersState {
  folders: Folder[];
  loading: boolean;
  error: string;
  fetchFolders: (deckId: number) => Promise<void>;
  addFolder: (folder: Folder) => Promise<void>;
  updateFolder: (folder: Folder) => Promise<void>;
  deleteFolder: (id: number) => Promise<void>;
}