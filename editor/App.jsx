import React, { useRef, useCallback, useState } from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  useReactFlow,
  Background,
  Panel
} from '@xyflow/react';
 
import '@xyflow/react/dist/style.css';
 
 
import Sidebar from './Sidebar';
import { DnDProvider, useDnD } from './DnDContext';

import ContactNode from './ContactNode';
 
const initialNodes = [
  { id: '1', type: 'contact', position: { x: 100, y: 100 }, data: { label: '1' }},
  { id: '2', type: 'contact', position: { x: 300, y: 100 }, data: { label: '2' } },
  { id: '3', type: 'contact', position: { x: 500, y: 100 }, data: { label: '3' } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2', type: 'step'}];

const nodeTypes = { contact: ContactNode };

let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const reactFlowWrapper = useRef(null);
  const { screenToFlowPosition } = useReactFlow();
  const [type] = useDnD();

  const [rfInstance, setRfInstance] = useState(null);
  const [text, setText] = useState(null);

  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      setText(JSON.stringify(flow.edges));
    }
  }, [rfInstance]);
 
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [],
  );
 
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);
 
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
 
      // check if the dropped element is valid
      if (!type) {
        return;
      }
 
      // project was renamed to screenToFlowPosition
      // and you don't need to subtract the reactFlowBounds.left/top anymore
      // details: https://reactflow.dev/whats-new/2023-11-10
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type: 'contact',
        position,
        data: { label: `${type} node` },
      };
 
      setNodes((nds) => nds.concat(newNode));
      console.log();
    },
    [screenToFlowPosition, type],
  );
 
 
  return (
    <div className="dndflow" style={{ width: '700px', height: '300px' }}>
      <div className="reactflow-wrapper" ref={reactFlowWrapper}>
        <ReactFlow
          colorMode='dark'
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onInit={setRfInstance}
          fitView
          style={{ backgroundColor: "#F7F9FB" }}
          nodeTypes={nodeTypes}
        >
          <Controls />
          <Background />
          <Panel position="top-right">
            <button onClick={onSave}>save</button>
          </Panel>
        </ReactFlow>
      </div>
      <Sidebar />
      <code>{text}</code>
    </div>
  );
};
 
export default () => (
  <ReactFlowProvider>
    <DnDProvider>
      <DnDFlow />
    </DnDProvider>
  </ReactFlowProvider>
);