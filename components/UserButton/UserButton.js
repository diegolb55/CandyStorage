import { useUser } from "../../context/UserContext";

const UserButton = () => {
  const user = useUser();
  console.log("user", user)

  return (
  

    <div>
        <h3>button user</h3>
    </div>
  );
}

export default UserButton;
