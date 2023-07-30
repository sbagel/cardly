import LoginHeader from "../components/login/LoginHeader";
import useUsersFacade from "../facades/useUsersFacade";

export default function Home() {
  const { user } = useUsersFacade();

  return (
    !user &&
    <div>
      <LoginHeader/>
      home
    </div>
  )
}
