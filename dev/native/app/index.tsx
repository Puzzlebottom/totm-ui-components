import { Text } from "react-native";
import { View } from "components/view";
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