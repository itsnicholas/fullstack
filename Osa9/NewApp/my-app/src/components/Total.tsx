import React from "react";

interface CoursePart {
    name: string;
    exerciseCount: number;
  }
  
  interface CourseParts {
      courseParts: CoursePart[];
  }

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