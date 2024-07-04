import { createAsyncThunk } from "@reduxjs/toolkit";
import { clearToken, goItApi, setToken } from "../../config/goItApi";
import { Howl } from "howler";
import "react-toastify/dist/ReactToastify.css";
import { showToast } from "../contacts/operations";

const successAuthSound = new Howl({
  src: ["/sounds/authError.mp3"],
});

const errorAuthSound = new Howl({
  src: ["/sounds/authSuccess.mp3"],
});

const logoutSound = new Howl({
  src: ["/sounds/logout.mp3"],
});

const showErrorToast = (message) => {
  showToast(message, "error", errorAuthSound);
};

export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await goItApi.post("/users/signup", credentials);
      setToken(data.token);
      successAuthSound.play();
      return data;
    } catch (error) {
      showErrorToast("Something went wrong..");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await goItApi.post("/users/login", credentials);
      setToken(data.token);
      successAuthSound.play();
      return data;
    } catch (error) {
      showErrorToast("Something went wrong..");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await goItApi.post("/users/logout");
    clearToken();
    logoutSound.play();
  } catch (error) {
    thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const savedToken = thunkAPI.getState().auth.token;
    if (!savedToken) return thunkAPI.rejectWithValue("No token!");
    try {
      setToken(savedToken);
      const { data } = await goItApi.get("/users/current");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
