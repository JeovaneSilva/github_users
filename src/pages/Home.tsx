import { UserProps, Repo } from "../types/user";
import Search from "../components/Search";
import User from "../components/User";
import Error from "../components/Error";
import Loading from "../components/Loading"; // Import the Loading component
import { useState } from "react";

const Home = () => {
  const [user, setUser] = useState<UserProps | null>(null);
  const [repo, setRepo] = useState<Repo[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state

  const loadUser = async (username: string) => {
    const token = import.meta.env.VITE_GITUB_TOKEN;

    setError(false);
    setUser(null);
    setLoading(true); // Set loading to true when the request starts

    try {
      const res = await fetch(`https://api.github.com/users/${username}`, {
        headers: {
          Authorization: `token ${token}`,
        },
      });

      const resRepo = await fetch(`https://api.github.com/users/${username}/repos`, {
        headers: {
          Authorization: `token ${token}`,
        },
      });

      if (res.status === 404) {
        setError(true);
        setLoading(false); // Set loading to false if there's an error
        return;
      }

      const data = await res.json();
      const dataRepo = await resRepo.json();

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
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false); // Always set loading to false when the request completes
    }
  };

  return (
    <div>
      <Search loadUser={loadUser} />
      {loading && <Loading />} {/* Show Loading component when loading is true */}
      {!loading && user && <User repos={repo} {...user} />}
      {!loading && error && <Error />}
    </div>
  );
};

export default Home;
