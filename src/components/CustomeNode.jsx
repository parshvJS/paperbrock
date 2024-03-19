import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

function CustomNode({ data }) {
  const getRender = () => {
    if (data?.IsQuestion === false) {
      return (
        <div className="mx-4">
          <div className="text-lg font-bold">{data.name}</div>
        </div>
      );
    } else {
      return (
        <div className="mx-4 border-2 border-gray-600 rounded-lg py-2 px-10">
          <div className="text-lg font-bold">{data.name}</div>
          <div className="text-lg">Marks : {data.total_marks}</div>
          <div className="text-lg">Type: {data.type}</div>
        </div>
      );
    }
  };

  return (
    <div className='bg-white'>
      <div className="flex bg-white">
        {getRender()}
      </div>
      <Handle type="target" position={Position.Left} className="w-4 h-4 border-4 border-pri-500 rounded-full" style={{ backgroundColor: 'white' }} />
      <Handle type="source" position={Position.Right} className="w-4 h-4 border-4 border-pri-500 rounded-full bg-white" style={{ backgroundColor: 'white' }} />
    </div>
  );
}

export default memo(CustomNode);
