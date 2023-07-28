import useUsersStore from "../../stores/useUsersStore"

import { shallow } from "zustand/shallow"

const useUsersFacade = () => {
  const { user, loading, error, fetchUsers } = useUsersStore(
    (state) => ({
      user: state.user,
      loading: state.loading,
      error: state.error,
      fetchUsers: state.fetchUsers,
    }),
    shallow
  )

  return { user, loading, error, fetchUsers }
}

export default useUsersFacade