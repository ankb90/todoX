import React, { useState } from 'react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { toast } from 'sonner';
import api from '@/lib/axios';

const AddTask = ({ onAddedNewTask }) => {
  // Hooks
  const [newTaskTitle, setnewTaskTitle] = useState('');

  // Action Handlers
  const handleAddTask = async () => {
    if (!newTaskTitle || newTaskTitle.trim() === '') {
      toast.error('Tiêu đề công việc không được để trống!');
      return;
    }

    try {
      await api.post('/tasks', { title: newTaskTitle.trim() });
      onAddedNewTask();
      toast.success('Đã thêm công việc mới thành công!');
    } catch (error) {
      console.error('Error adding task:', error);
      toast.error('Đã xảy ra lỗi khi thêm công việc. Vui lòng thử lại!');
    }
    setnewTaskTitle('');
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleAddTask();
    }
  };

  return (
    <Card className='p-6 border-0 bg-gradient-card shadow-custom-lg'>
      <div className='flex flex-col gap-3 sm:flex-row'>
        <Input
          type='text'
          placeholder='Tạo thêm công việc mới...'
          className='h-12 text-base bg-slate-50 sm:flex-1 border-border/50 focus:border-primary/50 focus:ring-primary/20'
          value={newTaskTitle}
          onChange={(e) => setnewTaskTitle(e.target.value)}
          onKeyDown={handleKeyPress}
        ></Input>

        <Button
          variant='default'
          size='xl'
          className='px-6'
          onClick={handleAddTask}
          disabled={!newTaskTitle || newTaskTitle.trim() === ''}
        >
          Thêm
        </Button>
      </div>
    </Card>
  );
};

export default AddTask;
