import React, { FC } from "react";
interface HeaderProps {
  name: string;
}
const Header: FC<HeaderProps> = ({ name }) => {
  return <h1 className="text-2xl font-semibold text-gray-700">{name}</h1>;
};

export default Header;
