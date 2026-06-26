// apps/app/src/App.tsx
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import FeedScreen from "./FeedScreen";

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <FeedScreen />
      <StatusBar style="auto" />
    </View>
  );
}
