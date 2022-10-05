import { getMemo, getMemoSuccess, getMemoFailure } from "./memoRedux";
import { publicRequest } from "./requestMethods";
import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { allComments } from "./commentRedux"

export const getAllMemo = async (dispatch) => {
  dispatch(getMemo());
  try {
    const res = await publicRequest.get(`${process.envREACT_APP_BASE_URI}/memo/`);
    dispatch(getMemoSuccess(res.data));
  } catch (err) {
    dispatch(getMemoFailure(err));
  }
};

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post(
      `${process.env.REACT_APP_BASE_URI}/auth/login`,
      user
    );
    dispatch(loginSuccess(res.data));
    localStorage.setItem("userDetails", JSON.parse(JSON.stringify(res.data.accessToken)));
  } catch (err) {
    dispatch(loginFailure(err.response.message));
  }
};

export const getComments = async (dispatch) =>{
  try {
    const res = await publicRequest.get(`${process.env.REACT_APP_BASE_URI}/comment/`)
    dispatch(allComments(res.data))
  } catch (error) {
      console.log(error.message)    
  }
}