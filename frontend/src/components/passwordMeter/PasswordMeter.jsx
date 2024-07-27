import React from "react";

function PasswordMeter({ passStrength, feedback }) {
  const getBarColor = (barIndex) => {
    if (passStrength >= barIndex) {
      switch (passStrength) {
        case 1:
          return "bg-red-500";
        case 2:
          return "bg-orange-500";
        case 3:
          return "bg-yellow-500";
        case 4:
          return "bg-green-500";
        default:
          return "bg-slate-300";
      }
    }
    return "bg-slate-300";
  };
  return (
    <>
      <div className="mt-2 flex w-full">
        <div
          id="bar1"
          className={`mx-1 h-1 w-1/4 rounded bg-slate-300 ${getBarColor(1)}`}
        ></div>
        <div
          id="bar2"
          className={`mx-1 h-1 w-1/4 rounded bg-slate-300 ${getBarColor(2)}`}
        ></div>
        <div
          id="bar3"
          className={`mx-1 h-1 w-1/4 rounded bg-slate-300 ${getBarColor(3)}`}
        ></div>
        <div
          id="bar4"
          className={`mx-1 h-1 w-1/4 rounded bg-slate-300 ${getBarColor(4)}`}
        ></div>
      </div>
      <div className="my-2 text-xs text-red-500">{feedback}</div>
    </>
  );
}

export default PasswordMeter;
