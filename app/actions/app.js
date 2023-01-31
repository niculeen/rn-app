import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {
  LOGIN_SUCCESS,
  FORGOT_PASSWORD_USER,
  BASEURL,
  API_URL,
  ADD_TO_CART,
  REMOVE_USER_DATA,
} from "@constants";

const httpAPIRequest = async (action_page, method = "get", data = null, headers = {}) => {
  var url = API_URL + action_page;
  headers = { ...headers, authorization: await AsyncStorage.getItem("token") }
  console.log({ headers })
  return axios({ method, url, data, headers })
    .then((response) => response)
    .catch((error) => {
      console.log("Request error: ", JSON.stringify(error.response.data));
      // reject(err);  
      const errResponse = (error && error.response && error.response.data)
        || (error && error.message);
      return { data: { error: errResponse } }
    });
};

export const getUser = (payload) => ({ type: LOGIN_SUCCESS, payload });

export const loginSuccess = (user) => (dispatch) => {
  dispatch({ type: LOGIN_SUCCESS, data: user });
};

export const logoutAction = () => (dispatch) => {
  dispatch({ type: LOGIN_SUCCESS, data: {} });
};

export const login = (email, password, callback) => async (dispatch) => {
  const params = {
    email: email,
    password: password,
  };

  httpAPIRequest("auth/signin", "POST", params)
    .then(async (res) => {
      if (res && res.data) {
        var data = res.data;
        await AsyncStorage.setItem('token', data.accessToken)
        dispatch({ type: LOGIN_SUCCESS, data });
        if (callback) {
          return callback(data);
        }
      }
    })
    .catch((err) => {
      var data = { error: err };
      dispatch({ type: LOGIN_SUCCESS, data });

      if (callback) {
        return callback(data);
      }
    });
};

export const signup = ({ email, password, role, firstName, lastName, wishlist }, callback) =>
  (dispatch) => {
    const params = {
      email,
      password,
      role,
      firstName,
      lastName,
      wishlist,
    };
    httpAPIRequest("auth/signup", "POST", params)
      .then((res) => callback(res))
      .catch(err => callback(err));
  };
export const updateAvatar = (formdata, callback) => dispatch => {
  httpAPIRequest("user/avatar", "POST", formdata, {
    Accept: "application/json",
    "Content-Type": "multipart/form-data",
  }).then(res => {
    dispatch({ type: "UPDATE_AVATAR", data: res.data.url })
    callback(res.data)
  }).catch(err => {
    callback(err)
  })
}

export const updateProfile = (data, callback) =>
  (dispatch) => {
    httpAPIRequest("user/profile", "POST", data)
      .then((res) => {
        console.log(res.data)
        dispatch({ type: "UPDATE_PROFILE", data: res.data.data })
        callback(res.data)
      })
      .catch(err => callback(err));
  };

export const getUserById = (user_id, callback) => (dispatch) => {
  const params = {
    func: "fetchUser_id",
    id: user_id,
  };
  httpAPIRequest("users.php", params).then((res) => {
    if (res && res.data) {
      var data = res.data;
      let user = {};
      for (let i in data) {
        if (i === "0") {
          user = data[i];
        }
      }
      // if (data.error) {
      //   dispatch({type: LOGIN_SUCCESS, data: {}});
      // } else {
      //   dispatch({type: LOGIN_SUCCESS, data: {user}});
      // }
      if (callback) {
        callback(data);
      }
    }
  });
};
export const optConfirm = (email, otp, callback) => (dispatch) => {
  const params = {
    email, otp
  };
  httpAPIRequest("otp", params)
    .then((res) => {
      if (res && res.data) {
        var data = res.data;
        if (!data.error) {
          dispatch({ type: FORGOT_PASSWORD_USER, data: { email } });
        } else {
          dispatch({ type: FORGOT_PASSWORD_USER, data: {} });
        }
        callback(res);
      }
    })
    .catch(callback());
}
export const forgotPassword = (email, callback) => (dispatch) => {
  const params = {
    func: "forgot_password_one",
    email: email,
  };
  httpAPIRequest("users.php", params)
    .then((res) => {
      if (res && res.data) {
        var data = res.data;
        if (!data.error) {
          dispatch({ type: FORGOT_PASSWORD_USER, data: { email } });
        } else {
          dispatch({ type: FORGOT_PASSWORD_USER, data: {} });
        }
        callback(res);
      }
    })
    .catch(callback());
};

export const forgotPassword2 = (email, code, callback) => (dispatch) => {
  const params = {
    func: "forgot_password_second",
    email: email,
    code: code,
  };
  httpAPIRequest("users.php", params)
    .then((res) => callback(res))
    .catch(callback());
};

export const emailVerify = (email, code, callback) => (dispatch) => {
  const params = {
    func: "email_verify",
    email: email,
    code: code,
  };
  httpAPIRequest("users.php", params)
    .then((res) => callback(res))
    .catch(callback());
};

export const forgotPassword3 = (email, password, callback) => (dispatch) => {
  const params = {
    func: "forgot_password_third",
    email: email,
    password: password,
  };
  httpAPIRequest("users.php", params)
    .then((res) => callback(res))
    .catch(callback());
};

export const getAllPost = (user_id, callback) => (dispatch) => {
  const params = {
    func: "posts",
    user_id: user_id,
  };
  httpAPIRequest("posts.php", params)
    .then((res) => callback(res))
    .catch((err) => console.log(err));
};

export const addPost = (user_id, content, tags, callback) => (dispatch) => {
  const params = {
    func: "new_post",
    user_id: user_id,
    content: content,
    tags: tags,
  };
  httpAPIRequest("posts.php", params)
    .then((res) => callback(res))
    .catch((err) => console.log(err));
};

export const deletePost = (post_id, callback) => (dispatch) => {
  const params = {
    func: "delete_post",
    id: post_id,
  };
  httpAPIRequest("posts.php", params)
    .then((res) => callback(res))
    .catch((err) => console.log(err));
};

export const getPostById = (post_id, callback) => (dispatch) => {
  const params = {
    func: "fetch_post_id",
    id: post_id,
  };
  httpAPIRequest("posts.php", params)
    .then((res) => callback(res))
    .catch((err) => console.log(err));
};

export const fetchFollowers = (user_id, callback) => (dispatch) => {
  const params = {
    func: "fetch_followers",
    user_id: user_id,
  };
  httpAPIRequest("users.php", params)
    .then((res) => callback(res))
    .catch((err) => console.log(err));
};

export const fetchFriends = (user_id, callback) => (dispatch) => {
  const params = {
    func: "fetch_friends",
    user_id: user_id,
  };
  httpAPIRequest("users.php", params)
    .then((res) => callback(res))
    .catch((err) => console.log(err));
};

export const updateLikes =
  (user_id, post_id, likes, callback) => (dispatch) => {
    const params = {
      func: "update_likes",
      user_id: user_id,
      post_id: post_id,
      likes: likes,
    };
    httpAPIRequest("posts.php", params)
      .then((res) => callback(res))
      .catch((err) => console.log(err));
  };

export const updateBookmark =
  (user_id, post_id, bookmark, callback) => (dispatch) => {
    const params = {
      func: "update_bookmark",
      user_id: user_id,
      post_id: post_id,
      bookmark: bookmark,
    };
    httpAPIRequest("posts.php", params)
      .then((res) => callback(res))
      .catch((err) => console.log(err));
  };

export const postComment =
  (user_id, post_id, lcb, data, callback) => (dispatch) => {
    console.log("LCB data==>>>", user_id, post_id, lcb, data);
    const params = {
      func: "insert_user_lcb",
      user_id: user_id,
      post_id: post_id,
      likes: lcb === "like" ? data : "",
      bookmark: lcb === "bookmark" ? data : "",
      comment: lcb === "comment" ? data : "",
    };
    httpAPIRequest("posts.php", params)
      .then((res) => callback(res))
      .catch((err) => console.log(err));
  };

export const fetchUserNotifications = (user_id, callback) => (dispatch) => {
  const params = {
    func: "fetch_user_notifications",
    user_id: user_id,
  };
  httpAPIRequest("users.php", params)
    .then((res) => callback(res))
    .catch((err) => console.log(err));
};

export const getPages = (callback) => (dispatch) => {
  const params = {
    func: "pages",
  };
  httpAPIRequest("pages.php", params)
    .then((res) => callback(res))
    .catch((err) => console.log(err));
};

export const addToCart = async (dispatch, data) => {
  dispatch({ type: ADD_TO_CART, payload: data });
};

export const removeUserData = async (dispatch) => {
  // console.log('removeItem', JSON.parse(AsyncStorage.getItem('whsnxt_user_data')));
  try {
    await AsyncStorage.removeItem("whsnxt_user_data");
  } catch (e) {
    console.log(e);
  }
  dispatch({ type: REMOVE_USER_DATA, payload: {} });
};
