import { useState } from "react";

export function useMyCustomHook() {
  const [myData, setMyData] = useState("");

  function updateMyData(newData) {
    console.log(newData);
    setMyData(newData);
  }

  return { myData, updateMyData };
}
