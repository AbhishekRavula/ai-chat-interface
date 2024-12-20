import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum Role {
  USER = "user",
  AI = "assistant",
}

export interface Message {
  id: string;
  content: string;
  role: Role;
  timestamp: number;
}

interface ChatState {
  messages: Message[];
  isAiTyping: boolean;
  error: string | null;
}

const initialState: ChatState = {
  messages: [],
  isAiTyping: false,
  error: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
    setAiTyping: (state, action: PayloadAction<boolean>) => {
      state.isAiTyping = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    updateLastMessage: (state, action: PayloadAction<string>) => {
      if (state.messages.length > 0) {
        state.messages[state.messages.length - 1].content = action.payload;
      }
    },
  },
});

export const { addMessage, setAiTyping, setError, updateLastMessage } =
  chatSlice.actions;

export const store = configureStore({
  reducer: {
    chat: chatSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
