import React from 'react';
import { Card } from './ui/card';
import { Circle } from 'lucide-react';

const TaskEmptyState = ({ filter }) => {
  return (
    <Card className='p8 text-center border-0 bg-gradient-card shadow-custom-md'>
      <div className='space-y-3'>
        <Circle className='mx-auto size-12 text-muted-foreground' />
        <h3 className='text-lg font-foreground'>
          {filter === 'all' && 'Chưa có nhiệm vụ nào'}
          {filter === 'active' && 'Không có nhiệm vụ nào đang làm.'}
          {filter === 'completed' && 'Không có nhiệm vụ đã hoàn thành.'}
        </h3>
        <p className='text-sm text-muted-foreground'>
          {filter === 'all' &&
            'Bạn chưa có nhiệm vụ nào. Hãy thêm nhiệm vụ mới để bắt đầu!'}
          {filter === 'active' &&
            'Bạn không có nhiệm vụ đang làm. Hãy thêm một nhiệm vụ mới!'}
          {filter === 'completed' &&
            'Bạn chưa hoàn thành nhiệm vụ nào. Hãy hoàn thành một nhiệm vụ!'}
        </p>
      </div>
    </Card>
  );
};

export default TaskEmptyState;
