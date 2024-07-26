import { useState, useEffect } from "react";
import { Repo } from "../types/user";

type RepoCardProps = {
  repo: Repo;
  login: string;
};

const RepoCard = ({ repo, login }: RepoCardProps) => {
  const [languages, setLanguages] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const fetchLanguages = async () => {
      const res = await fetch(
        `https://api.github.com/repos/${login}/${repo.name}/languages`
      );
      const data = await res.json();
      setLanguages(data);
    };

    fetchLanguages();
  }, [login, repo.name]);

  const getIconSrc = (language: string) => {
    if (language === "HTML") {
      return `https://cdn.simpleicons.org/${language}5`;
    } else if (language === "CSS") {
      return `https://cdn.simpleicons.org/${language}3`;
    } else {
      return `https://cdn.simpleicons.org/${language}`;
    }
  };

  return (
    <div
      key={repo.id}
      className="w-[350px] h-[360px] flex flex-col items-center justify-around bg-white rounded-[15px]"
    >
      <h3 className="text-xl font-bold">{repo.name}</h3>
      <p className="max-w-[300px] text-center font-semibold opacity-[.7]">
        {repo.description}
      </p>
      <div className="flex gap-10 items-center ">
        <div className="flex">
          {Object.keys(languages).map((lang) => (
            <img
            key={lang}
              height="32"
              width="32"
              src={getIconSrc(lang)}
              alt={`${repo.language} Icon`}
            />
          ))}
        </div>
        <button className="">ver projeto</button>
      </div>
    </div>
  );
};

export default RepoCard;
