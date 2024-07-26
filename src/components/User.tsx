import { UserProps,Repo } from "../types/user";
import { MdLocationPin } from "react-icons/md";
import RepoCard from "./RepoCard"; // Importe o componente RepoCard

type RepoProps = {
  repos: Repo[];
};

const User = ({
  login,
  avatar_url,
  location,
  followers,
  following,
  bio,
  repos
}: UserProps & RepoProps) => {


  return (
    <section className="flex flex-col w-full items-center">
      <div className="text-white w-[85vw] flex items-center pl-10 mt-14 pb-16 gap-14 border-b-2">
        <img
          className="w-[200px] h-[200px] rounded-full"
          src={avatar_url}
          alt={login}
        />
        <div className="flex flex-col gap-[20px]">
          <h2 className="text-3xl">{login}</h2>
          <div className="flex gap-10 text-xl">
            <p>{`${repos.length} Repositórios`}</p>
            <p>{`${followers} Seguidores`}</p>
            <p>{`${following} Seguindo`}</p>
          </div>
          <div>
            <p className="text-xl max-w-[600px]">{bio}</p>
          </div>
          {location && (
            <p className="flex items-center gap-2">
              <MdLocationPin className="fill-white text-2xl" />
              <span className="text-[#03A64A] text-xl font-bold">{location}</span>
            </p>
          )}
        </div>
      </div>

      <div className="w-[85vw] grid grid-cols-3 place-items-center mt-12 gap-12">
        {repos.map((repo) => (
          <RepoCard key={repo.id} repo={repo} login={login} />
        ))}
      </div>
    </section>
  );
};

export default User;
