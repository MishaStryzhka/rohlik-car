import {
  addContact,
  fetchContacts,
  fetchUpdateContact,
  removeContact,
} from 'redux/contacts/operations';

const { createSlice } = require('@reduxjs/toolkit');

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [],
    isLoading: false,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.contacts = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchUpdateContact.fulfilled, (state, action) => {
        const index = state.contacts.findIndex(
          task => task.id === action.payload.id
        );
        state.contacts.splice(index, 1);
        state.contacts.push(action.payload);
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.error = null;
        state.contacts.push(action.payload);
      })
      .addCase(addContact.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(removeContact.fulfilled, (state, action) => {
        state.error = null;
        const index = state.contacts.findIndex(
          task => task.id === action.payload.id
        );
        state.contacts.splice(index, 1);
      })
      .addCase(removeContact.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const contactsReducer = contactsSlice.reducer;
