import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {
  let dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  });

  const formatSpots = (x) => {
    let statement = "";
    if (x === 0) {
      statement += "no spots remaining";
    }
    if (x === 1) {
      statement += "1 spot remaining";
    }
    if (x > 1) {
      statement += `${x} spots remaining`;
    }
    return statement;
  };

  return (
    <li
      onClick={() => {
        props.setDay(props.name);
      }}
      className={dayClass}
      selected={props.selected}
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}
