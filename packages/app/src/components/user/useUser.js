import { createContext, useContext } from "react";
export const context = createContext({
    status: 0
});

export default function useUser() {
    return useContext(context);
}