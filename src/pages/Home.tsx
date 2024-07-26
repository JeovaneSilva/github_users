import { UserProps } from "../types/user";
import Search from "../components/Search";
import User from "../components/User";
import Error from "../components/Error";
import { useState } from "react";

const Home = () => {
  const [user, setUser] = useState<UserProps | null>(null);
  const [repo, setRepo] = useState([]);
  const [error, setError] = useState(false);

  const loadUser = async (username: string) => {
    setError(false)
    setUser(null)

    const res = await fetch(`https://api.github.com/users/${username}`);
    const resRepo = await fetch(`https://api.github.com/users/${username}/repos`)

    const data = await res.json();
    const dataRepo = await resRepo.json()

    if(res.status === 404){
        setError(true);
        return;
    }

    console.log(data);
    console.log(dataRepo);
    

    const { avatar_url, login, location, followers, following, bio } = data;

    const userData: UserProps = {
      avatar_url,
      login,
      location,
      followers,
      following,
      bio,
    };

    setUser(userData);
    setRepo(dataRepo);
  };

  return (
    <div>
      <Search loadUser={loadUser} />
      {user && <User repos={repo} {...user} />}
      {error && <Error/>}
    </div>
  );
};

export default Home;
