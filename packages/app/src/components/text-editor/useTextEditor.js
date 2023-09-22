import { useContext } from "react";
import context from "./context";

// Hook
export default function useTextEditor() {
    return useContext(context);
}
