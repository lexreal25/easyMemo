import { getMemo, getMemoSuccess, getMemoFailure } from "./memoRedux";
import { publicRequest } from "./requestMethods";
import { loginFailure, loginStart, loginSuccess } from "./userRedux";

export const getAllMemo = async (dispatch) => {
  dispatch(getMemo());
  try {
    const res = await publicRequest.get("http://localhost:4000/api/memo/");
    dispatch(getMemoSuccess(res.data));
  } catch (err) {
    dispatch(getMemoFailure(err));
  }
};

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post(
      "http://localhost:4000/api/auth/login",
      user
    );
    dispatch(loginSuccess(res.data));
    localStorage.setItem("userDetails", JSON.parse(JSON.stringify(res.data.accessToken)));
  } catch (err) {
    dispatch(loginFailure(err));
  }
};
