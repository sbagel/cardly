import useFoldersStore from "../../stores/useFoldersStore";
import { shallow } from "zustand/shallow";

const useFoldersFacade = () => {
  const { folders, loading, error, fetchFolders, addFolder, addDeckToFolder, updateFolder, deleteFolder } =
    useFoldersStore(
      (state) => ({
        folders: state.folders,
        loading: state.loading,
        error: state.error,
        fetchFolders: state.fetchFolders,
        addFolder: state.addFolder,
        addDeckToFolder: state.addDeckToFolder,
        updateFolder: state.updateFolder,
        deleteFolder: state.deleteFolder,
      }),
      shallow
    );

  return { folders, loading, error, fetchFolders, addFolder, addDeckToFolder, updateFolder, deleteFolder };
};

export default useFoldersFacade;