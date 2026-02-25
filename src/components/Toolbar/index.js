import classes from "./index.module.css"
import cx from "classnames"
import { useContext } from "react"
import { LuRectangleHorizontal } from "react-icons/lu"
import { FaSlash, FaRegCircle } from "react-icons/fa"
import "../../constants"
import { TOOL_ITEMS } from "../../constants"
import boardContext from "../../store/board-context"

const Toolbar = () => {
  const { activeToolItem, handleToolItemClick } = useContext(boardContext);
  return (
    <div className={classes.container}>
      <div className={
          cx(classes.toolItem, {[classes.active]: activeToolItem === TOOL_ITEMS.LINE})
        } onClick={() => handleToolItemClick(TOOL_ITEMS.LINE)}><FaSlash /></div>
      <div className={
          cx(classes.toolItem, {[classes.active]: activeToolItem === TOOL_ITEMS.RECTANGLE})
        } onClick={() => handleToolItemClick(TOOL_ITEMS.RECTANGLE)}><LuRectangleHorizontal /></div>
      <div className={
          cx(classes.toolItem, {[classes.active]: activeToolItem === TOOL_ITEMS.CIRCLE})
        } onClick={() => handleToolItemClick(TOOL_ITEMS.CIRCLE)}><FaRegCircle /></div>
    </div>
  )
}

export default Toolbar;