import { View } from "react-native";
import StorybookUIRoot from "../.rnstorybook"


export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <StorybookUIRoot />
    </View>
  );
}