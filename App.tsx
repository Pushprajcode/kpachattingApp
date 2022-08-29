import NavigationScreen from "./src/router";
import React from "react";
import { Provider } from "react-redux";
import { persistor, store } from "./src/redux/reducer/store";
import { PersistGate } from "redux-persist/integration/react";


const App=()=>{
  return(
   
    <Provider
    store={store}>
      <PersistGate persistor={persistor}>
      <NavigationScreen/>
      </PersistGate>

    </Provider>
  
  )
}
export default App;
