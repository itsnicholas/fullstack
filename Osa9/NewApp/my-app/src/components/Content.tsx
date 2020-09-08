import React from "react";
import Part from "./Part";
import { CourseParts } from "../types";

const Content: React.FC<CourseParts>  = (props) => {

  interface Key {
    key: string;
  }

  return (
    <div>
      {props.courseParts.map((part, i) => 
        <Part key={i} part={part} />
      )}
    </div>
  );
};
    
export default Content;