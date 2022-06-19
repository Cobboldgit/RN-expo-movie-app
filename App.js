
import { View, LogBox, Platform, UIManager,StatusBar } from "react-native";
import Screens from "./routes/Screens";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";
import {appColor} from "./constants"


const App = () => {
  return (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        <StatusBar style="light" backgroundColor={appColor.red} />
        <Screens />
      </View>
    </Provider>
  );
};

export default App;
