import { Dimensions } from "react-native";
import { horizontalScale, moderateScale, verticalScale } from "../Metrics";
const { width, height } = Dimensions.get("window");

export const COLORS = {
  grey: "#5A6780",

  transparentBlack1: "rgba(2, 2, 2, 0.1)",
  transparentBlack3: "rgba(2, 2, 2, 0.3)",
  transparentBlack5: "rgba(2, 2, 2, 0.5)",
  transparentBlack7: "rgba(2, 2, 2, 0.7)",
  transparentBlack9: "rgba(2, 2, 2, 0.9)",

  transparentGray: "rgba(77,77,77, 0.8)",
  transparentDarkGray: "rgba(20,20,20, 0.9)",

  transparent: "transparent",
};

export const TEXTS = {
  titleText: {
    fontSize: moderateScale(35),
    fontWeight: "bold",
    color: "#172b4d",
    marginBottom: verticalScale(30),
    marginTop: verticalScale(10),
  },
  titleText2: {
    fontSize: moderateScale(20),
    fontWeight: "bold",
    color: "#172b4d",
    marginBottom: verticalScale(10),

    marginTop: verticalScale(5),
    marginLeft: moderateScale(20),
  },
  titleText3: {
    fontSize: moderateScale(15),
    fontWeight: "bold",
    color: "#172b4d",
    marginTop: verticalScale(5),
    width: moderateScale(200),
  },
  infoText: {
    color: "#5A6780",
    lineHeight: 20,
    fontSize: moderateScale(15),
  },
};

export const BODY = {
  middleSection: {
    margin: horizontalScale(30),
  },
  picture: {
    height: moderateScale(180),
    marginTop: verticalScale(50),
    justifyContent: "center",
    alignItems: "center",
  },
};

const appTheme = { COLORS, TEXTS, BODY };

export default appTheme;
