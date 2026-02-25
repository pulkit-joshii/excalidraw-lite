import { useContext, useEffect, useLayoutEffect, useRef } from "react";
import rough from "roughjs";
import boardContext from "../../store/board-context";
import { TOOL_ACTION_TYPES } from "../../constants";

function Board() {
  const canvasRef = useRef();
  const { elements,handleMouseDown, handleMouseMove, handleMouseUp, toolActionType } = useContext(boardContext);
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, []);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const roughCanvas = rough.canvas(canvas);
    const context = canvas.getContext("2d");
    elements.forEach(element => {
        roughCanvas.draw(element.roughEle);
    });

    return () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [elements]);

  const handleBoardMouseDown = (event) => {
    handleMouseDown(event);
  };

  const handleBoardMouseMove = (event) => {
    if(toolActionType === TOOL_ACTION_TYPES.DRAWING) {
        handleMouseMove(event);
    }
  };

  const handleBoardMouseUp = (event) => {
    handleMouseUp(event);
  }

  return (
    <div>
      <canvas ref={canvasRef} onMouseDown={handleBoardMouseDown} onMouseMove={handleBoardMouseMove} onMouseUp={handleBoardMouseUp}/>
    </div>
  );
}

export default Board;