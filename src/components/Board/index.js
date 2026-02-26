import { useContext, useEffect, useLayoutEffect, useRef } from "react";
import rough from "roughjs";
import boardContext from "../../store/board-context";
import { TOOL_ITEMS } from "../../constants";
import toolboxContext from "../../store/toolbox-context";

function Board() {
  const canvasRef = useRef();
  const { elements,handleMouseDown, handleMouseMove, handleMouseUp } = useContext(boardContext);
  const { toolboxState } = useContext(toolboxContext);

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
        switch (element.type) {
            case TOOL_ITEMS.LINE: 
            case TOOL_ITEMS.RECTANGLE:
            case TOOL_ITEMS.CIRCLE:
            case TOOL_ITEMS.ARROW:
                roughCanvas.draw(element.roughEle);
                break;
            case TOOL_ITEMS.BRUSH:
                context.fillStyle = element.stroke;
                context.fill(element.path);
                context.restore();
                break;
            default:
                throw new Error("Type not recognized")
        }
    });

    return () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [elements]);

  const handleBoardMouseDown = (event) => {
    handleMouseDown(event, toolboxState);
  };

  const handleBoardMouseMove = (event) => {
    handleMouseMove(event);
  };

  const handleBoardMouseUp = (event) => {
    handleMouseUp(event, toolboxState);
  }

  return (
    <div>
      <canvas id="canvas" ref={canvasRef} onMouseDown={handleBoardMouseDown} onMouseMove={handleBoardMouseMove} onMouseUp={handleBoardMouseUp}/>
    </div>
  );
};

export default Board;