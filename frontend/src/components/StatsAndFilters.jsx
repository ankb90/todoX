import React from 'react';
import { Badge } from './ui/badge';
import { FilterType } from '@/lib/data';
import { Button } from './ui/button';
import { Filter } from 'lucide-react';

const StatsAndFilters = ({
  completeTaskCount = 0,
  activeTaskCount = 0,
  filter = 'all',
  setFilter,
}) => {
  return (
    <div className='flex flex-col items-start justify-between gap-4 sm:items-center sm:flex-row'>
      {/* Phần thống kê */}
      <div className='flex gap-3'>
        <Badge
          variant='secondary'
          className='bg-white/50 text-accent-foreground border-info/20'
        >
          {activeTaskCount} {FilterType.active}
        </Badge>
        <Badge
          variant='secondary'
          className='bg-white/50 text-success border-success/20'
        >
          {completeTaskCount} {FilterType.completed}
        </Badge>
      </div>
      {/* Phần bộ lọc */}
      <div className='flex flex-col gap-2 sm:flex-row'>
        {Object.entries(FilterType).map(([key, label]) => (
          <Button
            key={key}
            size='sm'
            className='capitalize'
            variant={filter === key ? 'gradient' : 'ghost'}
            onClick={() => setFilter(key)}
          >
            <Filter className='size-4' />
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default StatsAndFilters;
