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

  const languageKeys = Object.keys(languages);
  const languagesToShow = languageKeys.slice(0, 4);
  const remainingLanguagesCount = languageKeys.length - languagesToShow.length;

  return (
    <div
      key={repo.id}
      className="w-[150px] h-[180px] flex flex-col items-center justify-around bg-white rounded-[15px] sm:w-[370px] sm:h-[370px]"
    >
      <h3 className="text-[9px] font-bold sm:text-xl">{repo.name}</h3>
      <p className="max-w-[120px] text-[9px] text-center font-semibold opacity-[.7] sm:text-xl sm:max-w-[300px]">
        {repo.description
          ? repo.description
          : "Este repositório não possui descrição."}
      </p>
      <div className="w-[90%] flex items-center justify-between">
        <div className="flex justify-center items-center gap-[2px] sm:gap-[6px] ">
          {languagesToShow.map((lang) => (
            <img
              className="w-[16px] h-[16px] sm:w-[35px] sm:h-[35px]"
              key={lang}
              src={getIconSrc(lang)}
              alt={`${lang} Icon`}
            />
          ))}
          {remainingLanguagesCount > 0 && (
            <span className="text-[8px] w-5 h-5 font-semibold border border-black flex items-center justify-center rounded-full p-2 ml-1 sm:text-sm sm:w-10 sm:h-10 sm:border-2">
              +{remainingLanguagesCount}
            </span>
          )}
        </div>
        <a
          className="w-8 h-5 bg-[#03A64A] p-2 flex items-center justify-center rounded-[15px] sm:w-20 sm:h-auto"
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
