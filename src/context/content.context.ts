import { useContext, createContext, Dispatch, SetStateAction } from "react";

// Define the type for the content state
export interface ContentState {
  _id: string;
  projectId: string;
  contentName: string;
  contentType: string;
  content: string;
}

// Define the context type
export interface ContentContextType {
  content: ContentState;
  setContent: Dispatch<SetStateAction<ContentState>>;
}

// Create the context with a default value
export const contentContext = createContext<ContentContextType>({
  content: {
    _id: "",
    projectId: "",
    contentName: "",
    contentType: "",
    content: "",
  }, // Default content state
  setContent: () => {}, // Default no-op function
});

export default function useContent() {
  return useContext(contentContext);
}
