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
      <div className="text-white w-[85vw] flex items-center mt-6 pb-10 gap-5 border-b-2 sm:gap-14 sm:pl-10 sm:mt-14 sm:pb-16">
        <img
          className="w-[100px] h-[100px]  rounded-full sm:w-[200px] sm:h-[200px] "
          src={avatar_url}
          alt={login}
        />
        <div className="flex flex-col gap-[7px] sm:gap-[20px]">
          <h2 className="text-base sm:text-3xl">{login}</h2>
          <div className="flex gap-4 text-[10px] sm:text-xl sm:gap-10">
            <p className="flex flex-col text-center sm:gap-2 sm:flex-row">{`${repos.length}`} <span>Repositórios</span></p>
            <p className="flex flex-col text-center sm:gap-2 sm:flex-row">{`${followers}`} <span> Seguidores</span></p>
            <p className="flex flex-col text-center sm:gap-2 sm:flex-row">{`${following}`}<span>Seguindo</span></p>
          </div>
          <div>
            <p className="text-[10px] text-justify max-w-[600px] sm:text-xl">{bio}</p>
          </div>
          {location && (
            <p className="flex items-center gap-2">
              <MdLocationPin className="fill-white text-base sm:text-2xl" />
              <span className="text-[#03A64A] text-[10px] font-bold sm:text-xl">{location}</span>
            </p>
          )}
        </div>
      </div>

      <div className="w-[85vw] grid grid-cols-2 place-items-center my-12 gap-12 sm:grid-cols-3">
        {repos.filter(e => (e.name != login)).map((repo) => (
          <RepoCard key={repo.id} repo={repo} login={login} />
        ))}
      </div>
    </section>
  );
};

export default User;
