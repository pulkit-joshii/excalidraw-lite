import React, { useReducer } from 'react'
import boardContext from "./board-context"
import { TOOL_ACTION_TYPES, TOOL_ITEMS, BOARD_ACTION } from '../constants';
import { createRoughElement } from '../utils/element';

const boardReducer = (state, action) => {
    switch (action.type) {
        case BOARD_ACTION.CHANGE_TOOL: {
            return {
                ...state,
                activeToolItem: action.payload.tool,
            };
        }
        case BOARD_ACTION.DRAW_DOWN: {
            const {clientX, clientY} = action.payload;
            const newElement = createRoughElement(state.elements.length, clientX, clientY, clientX, clientY, { type: state.activeToolItem })
            
            const prevElements = state.elements;
            return {
                ...state,
                toolActionType: TOOL_ACTION_TYPES.DRAWING,
                elements: [...prevElements, newElement],
            };
        }
        case BOARD_ACTION.DRAW_MOVE: {
            const {clientX, clientY} = action.payload;
            const newElements = [...state.elements];
            const index = state.elements.length - 1;
            const { x1, y1 } = newElements[index];
            // newElements[index].x2 = clientX;
            // newElements[index].y2 = clientY;
            // newElements[index].roughEle = gen.line(newElements[index].x1, newElements[index].y1, clientX, clientY);
            const newElement = createRoughElement(index, x1, y1, clientX, clientY, { type: state.activeToolItem });
            newElements[index] = newElement;
            return {
                ...state,
                elements: newElements,
            };
        }
        case BOARD_ACTION.DRAW_UP: {
            return {
                ...state,
                toolActionType: TOOL_ACTION_TYPES.NONE,
            }
        }
        default:
            return state;
    }
};

const initialBoardState = {
    activeToolItem: TOOL_ITEMS.LINE,
    elements: [],
    toolActionType: TOOL_ACTION_TYPES.NONE,
}

const BoardProvider = ({ children }) => {
    const [boardState, dispatchBoardAction] = useReducer(
        boardReducer,
        initialBoardState
    );
    // const [activeToolItem, setActiveToolItem] = useState("");

    const handleToolItemClick = (tool) => {
        dispatchBoardAction({
            type: BOARD_ACTION.CHANGE_TOOL,
            payload: {
                tool,
            }
        })
    };

    const handleMouseDown = (event) => {
        const {clientX, clientY} = event;
        dispatchBoardAction({
            type: BOARD_ACTION.DRAW_DOWN,
            payload: {
                clientX,
                clientY,
            }
        })
    };

    const handleMouseMove = (event) => {
        const {clientX, clientY} = event;
        dispatchBoardAction({
            type: BOARD_ACTION.DRAW_MOVE,
            payload: {
                clientX,
                clientY,
            }
        })
    };

    const handleMouseUp = (event) => {
        dispatchBoardAction({
            type: BOARD_ACTION.DRAW_UP,
        })
    };

    const boardContextValue = {
        activeToolItem: boardState.activeToolItem,
        elements: boardState.elements,
        toolActionType: boardState.toolActionType,
        handleToolItemClick,
        handleMouseDown,
        handleMouseMove,
        handleMouseUp
    };
  return (
    <boardContext.Provider value={boardContextValue}>
        {children}
    </boardContext.Provider>
  )
}

export default BoardProvider;