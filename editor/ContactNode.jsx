import { useCallback, useRef, useEffect } from 'react';
import { Handle, Position } from '@xyflow/react';
 
const handleStyle = { left: 0 };
 
function TextUpdaterNode({ data, isConnectable }) {
  const canvas = useRef(null);

  useEffect(() => {
    const ctx = canvas.current.getContext("2d");
    ctx.strokeStyle = "white";
    ctx.moveTo(0, 25);
    ctx.lineTo(10, 25);
    ctx.moveTo(10, 10);
    ctx.lineTo(10, 40);
    ctx.moveTo(40, 10);
    ctx.lineTo(40, 40);
    ctx.moveTo(40, 25);
    ctx.lineTo(50, 25);
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
      <canvas ref={canvas}></canvas>
    </div>
  );
}
 
export default TextUpdaterNode;