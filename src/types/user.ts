export type UserProps = {
  avatar_url: string;
  login: string;
  location: string;
  bio: string;
  followers: number;
  following: number;
};

export type Repo = {
  name: string;
  description: string;
  language: string;
  id: number;
};
