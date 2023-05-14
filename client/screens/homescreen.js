import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import Parametres from "./parametres";
import Map from "./map";
import Balises from "./balises";
import Commentaire from "./commentaires";
const tab = createBottomTabNavigator();

export default function Homescreen() {
  return (
    <NavigationContainer independent={true}>
      <tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name == "Carte") {
              iconName = "map-outline";
            } else if (route.name == "Paramètres") {
              iconName = "settings-outline";
            } else if (route.name == "Balises") {
              iconName = "location-outline";
            } else if (route.name == "Commentaires") {
              iconName = "chatbox-outline";
            }
            return <Ionicons name={iconName} size={25} />;
          },
        })}
      >
        <tab.Screen name="Balises" component={Balises} />
        <tab.Screen name="Carte" component={Map} />
        <tab.Screen name="Commentaires" component={Commentaire} />
        <tab.Screen name="Paramètres" component={Parametres} />
      </tab.Navigator>
    </NavigationContainer>
  );
}
