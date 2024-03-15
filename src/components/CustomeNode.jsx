import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

function CustomNode({ data }) {
  return (
    <div className='bg-white'>
      <div className="flex">
   
        <div className="mx-4">
          <div className="text-lg font-bold">{data.name}</div>
        </div>
      </div>

      <Handle type="target" position={Position.Left} className="w-4 h-4 border-4 border-pri-500 rounded-full bg-white" />
      <Handle type="source" position={Position.Right} className="w-4 h-4 border-4 border-pri-500 rounded-full bg-white" />
    </div>
  );
}

export default memo(CustomNode);
