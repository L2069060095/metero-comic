import React from "react";

import { useLocation } from 'react-router-dom'
function Test() {

    
const location = useLocation()
const { state } = location
console.log(location, state,'sdasdasdas');
  return (<div>1111</div>)
}

export default Test;
