import { getDeviceWidth } from "@utils"
import { BaseColor } from "@config"
import { StyleSheet } from "react-native"
import { Fonts } from "@assets"
export const colors = {
  primary: "#6C99FF",
  light: "#AAC5FE",
  danger: "#FF5020",
  indigo: "#BF8FE4",
  yellow: "#E1FC2C",
  bgColor: "rgba(255,249,232,0.7)",
  bgPrimary: "#005DE3",
}

export default StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'column',
    // width: '100%',
    // color: "black",
    // backgroundColor: "white",
    // padding: 0,
  },
  profileContainer: {
    display: "flex",
    flexDirection: "column",
    padding: 10,
    backgroundColor: "rgba(255,255,255,1)",
    height: "100%",
    alignItems: "center",
  },
  profileHeaderContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
    shadowOffset: { width: 10, height: -10 },
    shadowColor: '#171717',
    shadowRadius: 3,
    shadowOpacity: 1,
    elevation: 25,
  },
  headerContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    padding: 15,
    elevation: 5,
    backgroundColor: "white"
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.light,
    width: "90%",
    borderRadius: 2,
    paddingHorizontal: 10,
  },
  inputLabel: {
    position: "absolute",
    backgroundColor: "white",
    top: -15,
    left: 15,
    fontSize: 12,
    // fontFamily: ,
    fontWeight: "400",
    color: colors.primary,
    // height: 50,
    zIndex: 2,
  },
  mainContainer: {
    // flex: 1,
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: colors.bgColor,
    // backgroundColor: '#1455F5',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    width: "100%",
    marginTop: 30,
    paddingTop: 20,
    paddingLeft: 15,
    paddingRight: 15,
  },
  subContainer: {
    alignItems: "center",
    flexDirection: "column",
    // backgroundColor: '#1455F5',
    width: "100%",
    padding: 15,
  },
  image_banner: {
    resizeMode: "contain",
    width: "100%",
    height: "100%",
  },
  text: {
    // alignItems: 'center',
    fontSize: 12,
  },
  text_primary: {
    color: colors.primary,
  },
  text_color_white: {
    color: "white",
  },
  text_color_black: {
    color: "black",
  },
  text_banner: {
    fontSize: 18,
    // paddingBottom: 40,
  },
  text_bold: {
    fontWeight: "bold",
  },
  text_small: {
    color: "gray",
    fontSize: 11,
  },
  text_align_left: {
    textAlign: "left",
    alignSelf: "flex-start",
  },
  text_align_right: {
    textAlign: "right",
    alignSelf: "flex-end",
  },
  text_error: {
    color: "#b30000",
  },
  tf14: {
    fontSize: 14,
  },
  button: {
    backgroundColor: colors.danger,
    width: "100%",
    height: 53,
    color: "white",
    padding: 12,
    marginTop: 30,
    marginBottom: 13,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    borderWidth: 1,
    // borderColor: '#005DE3',
    borderStyle: "solid",
  },
  button1: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "white",
    width: "100%",
    height: 53,
    color: "black",
    padding: 12,
    marginBottom: 10,
    alignItems: "center",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#005DE3",
    borderStyle: "solid",
  },
  active: {
    backgroundColor: "#005DE3",
  },
  input: {
    // margin: 15,
    // padding: 10,
    // paddingLeft: 20,
    width: "100%",
    borderBottomWidth: 2,
    borderColor: "#ddd",
    backgroundColor: "transparent",
    // lineHeight: 40,
    // height: 40,
    // fontSize: 14
  },
  input_otp: {
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 10,
    padding: 10,
    marginTop: 15,
    height: 55,
    width: 55,
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
  select: {
    margin: 15,
    padding: 10,
    height: 45,
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 50,
    backgroundColor: "#005DE3",
    width: "30%",
    fontSize: Fonts.defaultFontSize,
  },
  select_sign_up: {
    width: "30%",
  },

  loginFormLogo: {
    width: 100,
    height: 40,
    marginBottom: 10,
    alignSelf: "center",
  },

  loginForm: {
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
    padding: 20,
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: "rgba(0, 0, 0, 0.7)",

  },

  formLabel: {
    textAlign: "left",
    alignSelf: "flex-start",
    marginTop: 10,
    color: "#aaa",
  },

  formInput: {
    width: "100%",
    color: "white",
    backgroundColor: "transparent",
    border: "none",
    borderTopWidth: 0,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    borderRadius: 0,
    // height: 40,
    paddingLeft: 0,
    fontSize: 14,
    marginBottom: 10
  },

  textLeft: {
    textAlign: "left",
    alignSelf: "flex-start",
  },

  textRight: {
    textAlign: "right",
    alignSelf: "flex-end",
  },

  textCenter: {
    textAlign: "center",
    alignSelf: "center",
  },

  textBold: {
    fontWeight: "bold",
  },

  textRed: {
    color: "#f32322",
  },

  textOrange: {
    color: "#d65a38",
  },

  round: {
    borderRadius: "50%",
  },
  bgRed: {
    backgroundColor: "#f32322",
  },

  bgOrange: {
    backgroundColor: "#d65a38",
  },

  bgBlue: {
    backgroundColor: "#1e32fa",
  },
  bgFacebook: {
    backgroundColor: "#3b5999",
  },
  bgPinterest: {
    backgroundColor: "#bd081c",
  },
  btnPrimar: {
    color: "#fff",
    backgroundColor: "#0069d9",
    borderColor: "#0062cc",
  },
  btnPrimary: {
    color: "#fff",
    backgroundColor: "#007bff",
    borderColor: "#007bff",
  }
})
