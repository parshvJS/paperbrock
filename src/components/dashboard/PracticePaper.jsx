import React, { useEffect } from 'react';
import ReactFlow, { useNodesState, useEdgesState, Controls } from 'reactflow';

import 'reactflow/dist/base.css';

import CustomeNode from '../CustomeNode';

const nodeTypes = {
  custom: CustomeNode,
};

const PracticePaper = ({ initNodes, initEdges }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initEdges);

  useEffect(()=>{
    setNodes(initNodes)
    setEdges(initEdges)
  },[initEdges,initNodes])


  // Set all interaction props to disable interaction
  const onConnect = ()=>{};
  const onNodeClick = ()=>{};
  const onNodeDoubleClick = ()=>{};
  const onNodeDragStart = ()=>{};
  const onNodeDrag = ()=>{};
  const onNodeDragStop = ()=>{};
  const onNodeMouseEnter = ()=>{};
  const onNodeMouseMove = ()=>{};
  const onNodeMouseLeave = ()=>{};
  const onNodeContextMenu = ()=>{};
  const onNodesDelete = ()=>{};
  const onEdgesDelete = ()=>{};

  const onEdgeClick = ()=>{};
  const onEdgeDoubleClick = ()=>{};
  const onEdgeMouseEnter = ()=>{};
  const onEdgeMouseMove = ()=>{};
  const onEdgeMouseLeave = ()=>{};
  const onEdgeContextMenu = ()=>{};
  const onEdgeUpdate = ()=>{};
  const onEdgeUpdateStart = ()=>{};
  const onEdgeUpdateEnd = ()=>{};

  const onConnectStart = ()=>{};
  const onConnectEnd = ()=>{};
  const onClickConnectStart = ()=>{};
  const onClickConnectEnd = ()=>{};
  const isValidConnection = ()=>{};

  const onMove = ()=>{};
  const onMoveStart = ()=>{};
  const onMoveEnd = ()=>{};

  const onSelectionChange = ()=>{};
  const onSelectionDragStart = ()=>{};
  const onSelectionDrag = ()=>{};
  const onSelectionDragStop = ()=>{};
  const onSelectionStart = ()=>{};
  const onSelectionEnd = ()=>{};
  const onSelectionContextMenu = ()=>{};

  const panOnDrag = false;
  const autoPanOnConnect = false;
  const autoPanOnNodeDrag = false;
  const selectNodesOnDrag = false;
  const connectionMode = 'strict';
  const connectOnClick = false;
  const preventScrolling = true;

  const minZoom = 0.5; 
  const maxZoom = 0.6; 

  return (
    <div className='w-full h-[650px] flex items-center justify-center'> {/* Center the flow horizontally */}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onNodeDoubleClick={onNodeDoubleClick}
        onNodeDragStart={onNodeDragStart}
        onNodeDrag={onNodeDrag}
        onNodeDragStop={onNodeDragStop}
        onNodeMouseEnter={onNodeMouseEnter}
        onNodeMouseMove={onNodeMouseMove}
        onNodeMouseLeave={onNodeMouseLeave}
        onNodeContextMenu={onNodeContextMenu}
        onNodesDelete={onNodesDelete}
        onEdgesDelete={onEdgesDelete}
        onEdgeClick={onEdgeClick}
        onEdgeDoubleClick={onEdgeDoubleClick}
        onEdgeMouseEnter={onEdgeMouseEnter}
        onEdgeMouseMove={onEdgeMouseMove}
        onEdgeMouseLeave={onEdgeMouseLeave}
        onEdgeContextMenu={onEdgeContextMenu}
        onEdgeUpdate={onEdgeUpdate}
        onEdgeUpdateStart={onEdgeUpdateStart}
        onEdgeUpdateEnd={onEdgeUpdateEnd}
        onConnectStart={onConnectStart}
        onConnectEnd={onConnectEnd}
        onClickConnectStart={onClickConnectStart}
        onClickConnectEnd={onClickConnectEnd}
        isValidConnection={isValidConnection}
        onMove={onMove}
        onMoveStart={onMoveStart}
        onMoveEnd={onMoveEnd}
        onSelectionChange={onSelectionChange}
        onSelectionDragStart={onSelectionDragStart}
        onSelectionDrag={onSelectionDrag}
        onSelectionDragStop={onSelectionDragStop}
        onSelectionStart={onSelectionStart}
        onSelectionEnd={onSelectionEnd}
        onSelectionContextMenu={onSelectionContextMenu}
        panOnDrag={panOnDrag}
        autoPanOnConnect={autoPanOnConnect}
        autoPanOnNodeDrag={autoPanOnNodeDrag}
        selectNodesOnDrag={selectNodesOnDrag}
        connectionMode={connectionMode}
        connectOnClick={connectOnClick}
        preventScrolling={preventScrolling}
        minZoom={minZoom}
        maxZoom={maxZoom}
        nodeTypes={nodeTypes}
        fitView
        style={{ width: '100%', height: '100%' }} 
      />
    </div>
  );
};

export default PracticePaper;
