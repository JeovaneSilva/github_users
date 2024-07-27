import { useState, useEffect } from "react";
import { Repo } from "../types/user";
import { FaArrowRight } from "react-icons/fa6";

type RepoCardProps = {
  repo: Repo;
  login: string;
};

const RepoCard = ({ repo, login }: RepoCardProps) => {
  const [languages, setLanguages] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const fetchLanguages = async () => {
      const token = import.meta.env.VITE_GITUB_TOKEN;

      const res = await fetch(
        `https://api.github.com/repos/${login}/${repo.name}/languages`,
        {
          headers: {
            Authorization: `token ${token}`,
          },
        }
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
      className="w-[170px] h-[200px] flex flex-col items-center justify-around bg-white rounded-[15px] sm:w-[370px] sm:h-[370px]"
    >
      <h3 className="text-[10px] font-bold sm:text-xl">{repo.name}</h3>
      <p className="max-w-[150px] text-[10px] text-center font-semibold opacity-[.7] sm:text-xl sm:max-w-[300px]">
        {repo.description
          ? repo.description
          : "Este repositório não possui descrição."}
      </p>
      <div className="w-[85%] flex gap-10 items-center justify-between">
        <div className="flex gap-[6px] ">
          {Object.keys(languages).map((lang) => (
            <img
            className="w-[15px] h-[15px] sm:w-[38px] sm:h-[38px]"
              key={lang}
              src={getIconSrc(lang)}
              alt={`${repo.language} Icon`}
            />
          ))}
        </div>
        <a
          className="w-12 bg-[#03A64A] p-2 flex items-center justify-center rounded-[15px] sm:w-20"
          href={`https://github.com/${login}/${repo.name}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaArrowRight className="text-xs sm:text-2xl" />
        </a>
      </div>
    </div>
  );
};

export default RepoCard;
