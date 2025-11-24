import React, { useState } from 'react';
import { Card } from './ui/card';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import {
  Calendar,
  CheckCircle2,
  Circle,
  SquarePen,
  Trash2,
} from 'lucide-react';
import { Input } from './ui/input';
import { toast } from 'sonner';
import api from '@/lib/axios';

const TaskCard = ({ task, index, handleTaskChanged }) => {
  // Hooks
  const [isEditting, setisEditting] = useState(false);
  const [updateTaskTitle, setupdateTaskTitle] = useState(task.title || '');

  // Action Handlers
  const deleteTask = async (taskId) => {
    try {
      const res = await api.delete(`/tasks/${task._id}`);
      toast.success('Đã xóa công việc thành công!');
      handleTaskChanged();
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Đã xảy ra lỗi khi xóa công việc. Vui lòng thử lại!');
    }
  };

  const updateTask = async (newStatus) => {
    try {
      const res = await api.put(`/tasks/${task._id}`, {
        title: updateTaskTitle,
        status: newStatus,
      });
      toast.success('Đã cập nhật công việc thành công!');
      handleTaskChanged();
    } catch (error) {
      console.error('Error updating task:', error);
      toast.error('Đã xảy ra lỗi khi cập nhật công việc. Vui lòng thử lại!');
    }
  };

  const toggleTaskStatus = () => {
    if (task.status === 'completed') {
      updateTask('active');
    } else {
      updateTask('completed');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      setisEditting(false);
      updateTask(task.status);
    }
  };

  return (
    <Card
      className={cn(
        'p-4 bg-white border-0 shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animate-fade-in group',
        task.status === 'completed' && 'opacity-75'
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className='flex items-center gap-4'>
        {/* Check box */}
        <Button
          variant='ghost'
          size='icon'
          className={cn(
            'shrink-0 size-8 rounded-full transition-all duration-200',
            task.status === 'complete'
              ? 'text-success hover:text-success/80'
              : 'text-muted-foreground hover:text-primary'
          )}
          onClick={toggleTaskStatus}
        >
          {task.status === 'completed' ? (
            <CheckCircle2 className='size-5 text-green-600' />
          ) : (
            <Circle className='size-5' />
          )}
        </Button>

        {/* Task tile */}
        <div className='flex-1 min-w-0'>
          {isEditting ? (
            <Input
              type='text'
              placeholder='Cần phải làm gì?'
              className='flex-1 h-12 text-base border-border/50 focus:border-primary/50 focus:ring-primary/20'
              value={updateTaskTitle}
              onChange={(e) => setupdateTaskTitle(e.target.value)}
              onKeyPress={handleKeyPress}
              onBlur={() => {
                setisEditting(false);
                setupdateTaskTitle(task.title || '');
              }}
            />
          ) : (
            <p
              className={cn(
                'text-base transition-all duration-200',
                task.status === 'completed'
                  ? 'line-through text-muted-foreground'
                  : 'text-foreground'
              )}
            >
              {task.title}
            </p>
          )}

          {/* Ngày tạo và ngày hoàn thành */}
          <div className='flex items-center gap-2 mt-1'>
            <Calendar className='size-3 text-muted-foreground' />
            <span className='text-xs text-muted-foreground'>
              {new Date(task.createdAt).toLocaleString()}
            </span>
            {task.compltedAt && (
              <>
                <span className='mx-1 text-muted-foreground'>|</span>
                <Calendar className='size-3 text-muted-foreground' />
                <span className='text-xs text-muted-foreground'>
                  {new Date(task.compltedAt).toLocaleString()}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Button Edit và Delete */}
        <div className='hidden gap-2 group-hover:inline-flex animate-slide-up'>
          {/* Button Edit */}
          <Button
            variant='ghost'
            size='icon'
            className='shrink-0 transition-colors size-8 text-muted-foreground hover:text-info'
            onClick={() => {
              setisEditting(true);
              setupdateTaskTitle(task.title || '');
            }}
          >
            <SquarePen className='size-4' />
          </Button>

          {/* Button Delete */}
          <Button
            variant='ghost'
            size='icon'
            className='shrink-0 transition-colors size-8 text-muted-foreground hover:text-destructive'
            onClick={() => deleteTask(task._id)}
          >
            <Trash2 className='size-4' />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default TaskCard;
