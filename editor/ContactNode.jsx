import { useCallback, useRef, useEffect } from 'react';
import { Handle, Position } from '@xyflow/react';
 
const handleStyle = { left: 0 };
 
function TextUpdaterNode({ data, isConnectable }) {
  const canvas = useRef(null);

  useEffect(() => {
    const ctx = canvas.current.getContext("2d");
    const delta = 10;
    ctx.strokeStyle = "white";
    ctx.moveTo(0, 25);
    ctx.lineTo(10+delta, 25);
    ctx.moveTo(10+delta, 15);
    ctx.lineTo(10+delta, 35);
    ctx.moveTo(30+delta, 15);
    ctx.lineTo(30+delta, 35);
    ctx.moveTo(30+delta, 25);
    ctx.lineTo(40+2*delta, 25);
    ctx.stroke();
  }, []);

  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);
 
  return (
    <div className="text-updater-node">
      <Handle
        type="target"
        position={Position.Left}
        id="a"
        style={handleStyle}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="b"
        isConnectable={isConnectable}
      />
      <canvas ref={canvas} width='65px' height='50px'></canvas>
    </div>
  );
}
 
export default TextUpdaterNode;