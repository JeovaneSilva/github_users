import { UserProps,Repo } from "../types/user";
import Search from "../components/Search";
import User from "../components/User";
import Error from "../components/Error";
import { useState } from "react";

const Home = () => {
  const [user, setUser] = useState<UserProps | null>(null);
  const [repo, setRepo] = useState<Repo[]>([]);
  const [error, setError] = useState(false);

  console.log(import.meta.env.VITE_GITUB_TOKEN);
  


  const loadUser = async (username: string) => {
    const token = import.meta.env.VITE_GITUB_TOKEN;
    
    setError(false);
    setUser(null);
  
    const res = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `token ${token}`
      }
    });
    
    const resRepo = await fetch(`https://api.github.com/users/${username}/repos`, {
      headers: {
        Authorization: `token ${token}`
      }
    });
  
    const data = await res.json();
    const dataRepo = await resRepo.json();
  
    if (res.status === 404) {
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
  
    const repos: Repo[] = Array.isArray(dataRepo) ? dataRepo : [];
  
    setUser(userData);
    setRepo(repos);
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
