import { createAsyncThunk } from "@reduxjs/toolkit";
import { goItApi } from "../../config/goItApi";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Howl } from "howler";

const successSound = new Howl({
  src: ["/sounds/success.mp3"],
});

const errorSound = new Howl({
  src: ["/sounds/error.mp3"],
});

const toastStyle = {
  width: "auto",
  maxWidth: "250px",
  textAlign: "center",
  borderRadius: "10px",
  padding: "10px",
  backgroundColor: "#FFFFFF",
  marginTop: "100px",
  marginLeft: "60px",
};

export const showToast = (message, type, sound) => {
  toast[type](message, {
    autoClose: 1500,
    style: toastStyle,
    onOpen: () => {
      sound.play();
    },
  });
};

const showSuccessToast = (message) => {
  showToast(message, "success", successSound);
};

const showErrorToast = (message) => {
  showToast(message, "error", errorSound);
};

export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, thunkAPI) => {
    try {
      const { data } = await goItApi.get("/contacts");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (contact, thunkAPI) => {
    try {
      const { data } = await goItApi.post("/contacts", contact);
      showSuccessToast("Successfully added");
      return data;
    } catch (error) {
      showErrorToast("Something went wrong...");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk("id", async (id, thunkAPI) => {
  try {
    const { data } = await goItApi.delete(`/contacts/${id}`);
    showSuccessToast("Successfully deleted");
    return data.id;
  } catch (error) {
    showErrorToast("Something went wrong...");
    return thunkAPI.rejectWithValue(error.message);
  }
});
