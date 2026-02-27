import { createContext } from "react";

const boardContext = createContext({
    activeToolItem: "",
    toolActionType: "",
    elements: [],
    history: [[]],
    index: 0,
    handleToolItemClick: () => {},
    handleMouseDown: () => {},
    handleMouseMove: () => {},
    handleMouseUp: () => {},
    handleTextAreaBlur: () => {},
});

export default boardContext;