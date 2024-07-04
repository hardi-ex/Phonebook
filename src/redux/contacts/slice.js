import { createSelector, createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  fetchContacts,
  addContact,
  deleteContact,
} from "../contacts/operations";
import { selectFilter } from "../filters/selectors";
import { selectContactsItems } from "./selectors";

const initialState = {
  contacts: {
    items: [],
    loading: false,
    error: null,
  },
};

const slice = createSlice({
  name: "contacts",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts.items = action.payload;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.items.push(action.payload);
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts.items = state.contacts.items.filter(
          (item) => item.id !== action.payload
        );
      })
      .addMatcher(
        isAnyOf(fetchContacts.pending, addContact.pending),
        (state) => {
          state.contacts.loading = true;
        }
      )
      .addMatcher(
        isAnyOf(fetchContacts.rejected, addContact.rejected),
        (state, action) => {
          state.contacts.loading = false;
          state.contacts.error = action.payload;
        }
      )
      .addMatcher(
        isAnyOf(fetchContacts.fulfilled, addContact.fulfilled),
        (state) => {
          state.contacts.loading = false;
          state.contacts.error = null;
        }
      );
  },
});

export const contactReducer = slice.reducer;

export const selectFilteredContacts = createSelector(
  [selectContactsItems, selectFilter],
  (contacts, filter) => {
    if (typeof filter !== "string") {
      return contacts;
    }
    if (!filter) return contacts;
    return contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(filter.toLowerCase()) ||
        contact.number.toLowerCase().includes(filter.toLowerCase())
    );
  }
);
