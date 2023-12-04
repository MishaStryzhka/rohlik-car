import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/contacts');
      return response.data;
    } catch (e) {
      console.log(e);
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const fetchUpdateContact = createAsyncThunk(
  'contacts/fetchUpdateContact',
  async (user, thunkAPI) => {
    try {
      const response = await axios.patch(`/contacts/${user.id}`, {
        name: user.name,
        number: user.number,
      });
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (user, thunkAPI) => {
    try {
      const response = await axios.post('/contacts', { ...user });

      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const removeContact = createAsyncThunk(
  'contacts/removeContact',
  async (user, thunkAPI) => {
    try {
      const response = await axios.delete(`/contacts/${user}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
