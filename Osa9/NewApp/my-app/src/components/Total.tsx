import React from "react";
import { CourseParts } from "../types";

const Total: React.FC<CourseParts> = (props) => {

  return (
    <div>
      <p>
        Number of exercises{" "}
        {props.courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </div>
  );
};
      
export default Total;