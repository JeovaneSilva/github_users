type SearchProps = {
  loadUser: (userName: string) => Promise<void>;
};

import { useState,KeyboardEvent } from "react";

import { BsSearch } from "react-icons/bs";

const Search = ({ loadUser }: SearchProps) => {
  const [userName, setUserName] = useState("");

  const handleKeyDown = (e: KeyboardEvent) => {
    if(e.key == "Enter"){
        loadUser(userName)
        setUserName('')
    }
  }

  return (
    <div className=" p-6 rounded-2xl flex flex-col justify-center items-center gap-4">
      <div className="flex gap-2">
        <input
          className="p-[0.6rem] w-[200px] h-[35px] rounded-[3px] border-none text-[#2b3566] sm:w-auto sm:h-auto "
          type="text"
          placeholder="Nome do usuário"
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
          onKeyDown={handleKeyDown}
        />
        <button className="w-10 h-[36px] flex justify-center items-center p-[0.6rem] rounded-[3px] border-none text-[#2b3566] bg-[#0e1129] pointer sm:h-auto" onClick={() => {loadUser(userName)
            setUserName('')
        }}>
          <BsSearch className="fill-white" />
        </button>
      </div>
    </div>
  );
};

export default Search;
