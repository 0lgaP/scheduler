import React, {useState} from 'react';

export default function useVisualMode(firstMode){
  const [mode, setMode] = useState(firstMode);
  const [history, setHistory] = useState([firstMode]); 
  //const setDay = day => setState({...state, day});
  // const setDays = days => setState(prev => ({ ...prev, days }));

  const transition = (newMode, replace = false) => {
    //set mode to variable
    setMode(newMode);
    //add mode to history array
    if(replace){
      setHistory((prev) => [ ...prev.slice(0, -1), newMode])
    } else {
      setHistory((prev) => [...prev, newMode]);
    }
    }
  
  
  const back = () => {
    //set mode to the length of the array 
    //-1 because array starts at 0, 
    //-1 because we want to set it to the previous value in array
    setMode(history[history.length - 2]);
    //slice(start, end)
    //(start at history[0], slice off history[-1])
    setHistory((prev) => [...prev.slice(0, -1)]);
  }

  return {transition, back, mode};
  
};
  
  
  
