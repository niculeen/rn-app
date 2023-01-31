export const HOST = "alb-privy-1843694347.us-east-1.elb.amazonaws.com";
export const PORT = 80;
export const BASEURL = `http://${HOST}:${PORT}/`;
export const API_URL = BASEURL + "api/";

export const paypalToken = {
  sandbox: "sandbox_x6rhtrj9_7vmbxf7bq8rqp8wx",
  product: "",
};

export const REACT_APP_PAYPAL_CLIENT_ID =
  "AT2vGDoMeFvF2icC2IXcftrRwkgBBUmEkjn6Fz0VP4Xm23z-LI8L9NYqvxvRPZyoY6thXXncsDo-Drgf";
export const REACT_APP_PAYPAL_CLIENT_SECRET =
  "EPXZrd8Ruv542qbJ3Gs826u15nG08wfMMWsMa6pYl-Zmq4M2Neomi2bhQ0YjBXlGc0yj7L_po1Gr0Fxo";

// redux
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const FORGOT_PASSWORD_USER = "FORGOT_PASSWORD_USER";
export const SET_USER_DATA = "SET_USER_DATA";
export const CURRENT_USER = "CURRENT_USER";
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const ADD_QUANTITY = "ADD_QUANTITY";
export const SUB_QUANTITY = "SUB_QUANTITY";
export const EMPTY_CART = "EMPTY_CART";
export const REMOVE_USER_DATA = "REMOVE_USER_DATA";
