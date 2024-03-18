import React from "react";
import { View, Image, Modal } from "react-native";
import { Colors } from "../../theme/colors";
import { styles } from "./styles";
import BPSText from "../../components/BPSText";

const SplashLayout = () => {
  return (
    <View style={styles.container}>
      {/* <Image source={Icons.logo} style={styles.logo} resizeMode={"contain"} /> */}
      <BPSText text="BPS" fontWeight="700" fontSize={40} />
    </View>
  );
};
export default SplashLayout;