import React from "react";

interface HeaderProps {
  courseName: string;
}

const Header: React.FC<HeaderProps> = (props) => {

  return (
    <div>
      <h1>{props.courseName}</h1>
    </div>
  );
};
  
export default Header;