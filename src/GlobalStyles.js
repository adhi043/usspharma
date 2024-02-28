import { PixelRatio } from "react-native";



const fontSize = (size) => {
  const fontScale = PixelRatio.getFontScale();
  return size / fontScale;
}





/* fonts */
export const FontFamily = {
  pxRegular: "Roboto-BoldItalic",
  sFProText: "SF Pro Text",
};



/* font sizes */
export const FontSize = {
  pxRegular_size: fontSize(16),
  font_size: fontSize(14),
  headline3_size: fontSize(18),
  font1_size: fontSize(11),
  font2_size: fontSize(13),
  size_3xs: fontSize(10),
  size_mini: fontSize(15),
  headline_size: fontSize(34),
  headline2_size: fontSize(24),
};


/* Colors */
export const Color = {
  gray: "#333333",
  prgray: "#EDEDED",
  black: "#222",
  blue: "#0056FF",
  colorGray_100: "rgba(0, 0, 0, 0.2)",
  colorwhite_200: "rgba(255, 255, 255, 0.7)",
  colorwhite_100: "rgba(255, 255, 255, 0.5)",
  colorwhite_50: "rgba(255, 255, 255, 0.2)",
  danger: "rgba(255, 0, 0, 0.6)",
  success: "rgba(0, 255, 0, 0.6)",
  white: "#fff",
  primary: "#FF6F61",
  background: "#E0F4FB",
  background2: "#2EADC8",
  colorBlack: "#000",
  colorDarkslategray: "#2d2d2d",
  error: "#f01f0e",
  colorMediumseagreen: "#2aa952",
  gray2: "#4f4f4f",
};
/* border radiuses */
export const Border = {
  br_5xs: 8,
  br_10xs: 3,
  br_6xl: 25,
  br_15xl: 34,
  br_10xl: 29,
  br_9xs: 4,
  br_4xl: 23,
  br_5xl: 24,
  br_xs: 12,
  br_16xl: 35,
  br_mini: 15,
};



export const baseUrl='https://test.yumhubb.com/pharmacy'
// export const baseUrl='http://192.168.100.29:8000/pharmacy'
// export const baseUrl='http://192.168.35.50:8000/pharmacy'
export const googleKey='AIzaSyA0ezzOFq6lTHs4i4DlmMPJpV48LAWMx7o'
