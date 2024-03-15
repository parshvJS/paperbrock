import React, { useCallback } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge, MiniMap, Controls } from 'reactflow';

import 'reactflow/dist/base.css';

import CustomeNode from '../CustomeNode';

const nodeTypes = {
  custom: CustomeNode,
};

const initNodes =  [
  {
    "id": "1",
    "type": "custom",
    "data": { "name": "File 2" },
    "position": { "x": 50, "y": 400 }
  },
  {
    "id": "2",
    "type": "custom",
    "data": { "name": "(a) Explain if-elif-else control structure in Python.", "total_marks": 3, "type": "theory" },
    "position": { "x": 300, "y": 200 }
  },
  {
    "id": "3",
    "type": "custom",
    "data": { "name": "(b) Explain type casting in Python.", "total_marks": 4, "type": "theory" },
    "position": { "x": 350, "y": 600 }
  },
  {
    "id": "4",
    "type": "custom",
    "data": { "name": "(c) Explain features of Python programming language.", "total_marks": 7, "type": "theory" },
    "position": { "x": 450, "y": 100 }
  }
]

const initEdges = [
  { "id": "e1-2", "source": "1", "sourceHandle": "source", "target": "2", "targetHandle": "target" },
  { "id": "e1-3", "source": "1", "sourceHandle": "source", "target": "3", "targetHandle": "target" },
  { "id": "e1-4", "source": "1", "sourceHandle": "source", "target": "4", "targetHandle": "target" }
]
const PracticePaper = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initEdges);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  return (
    <div className='w-full h-screen flex items-center justify-center'> {/* Center the flow horizontally */}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        style={{ width: '100%', height: '100%' }} // Ensure the flow fills the container
      >
      
      </ReactFlow>
    </div>
  );
};

export default PracticePaper;
