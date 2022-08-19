import NavigationScreen from "./src/router";
import React from "react";
import { Provider } from "react-redux";
import { store } from "./src/redux/reducer/store";


const App=()=>{
  return(
   
    //   <NavigationScreen/>
    //   <Provider store={store}> 
   
    // </Provider>
    <Provider
    store={store}>
      <NavigationScreen/>

    </Provider>
  
  )
}
export default App;
