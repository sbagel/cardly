import useUsersStore from "../../stores/useUsersStore"

import { shallow } from "zustand/shallow"

const useUsersFacade = () => {
  const { user, loading, error, fetchUser, addUser, updateUser, deleteUser, login, logout } = useUsersStore(
    (state) => ({
      user: state.user,
      loading: state.loading,
      error: state.error,
      fetchUser: state.fetchUser,
      addUser: state.addUser,
      updateUser: state.updateUser,
      deleteUser: state.deleteUser,
      login: state.login,
      logout: state.logout
    }),
    shallow
  )

  return { user, loading, error, fetchUser, addUser, updateUser, deleteUser, login, logout }
}

export default useUsersFacade