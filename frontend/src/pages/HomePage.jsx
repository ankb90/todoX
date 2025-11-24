import AddTask from '@/components/AddTask';
import DateTimeFilter from '@/components/DateTimeFilter.jsx';
import StatsAndFilters from '@/components/StatsAndFilters';
import TaskList from '@/components/TaskList';
import React, { useEffect, useState } from 'react';
import Headers from '../components/Header.jsx';
import Background from '@/components/Background.jsx';
import Footer from '@/components/Footer.jsx';
import { toast } from 'sonner';
import { visibleTaskLimit } from '@/lib/data.js';
import TaskListPagination from '@/components/TaskListPagination.jsx';
import api from '@/lib/axios.js';

const HomePage = () => {
  // Hooks
  const [taskBuffer, settaskBuffer] = useState([]);
  const [activeTaskCount, setactiveTaskCount] = useState(0);
  const [completeTaskCount, setcompleteTaskCount] = useState(0);
  const [filter, setFilter] = useState('all');
  const [dateQuery, setDateQuery] = useState('week');
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchTasks();
  }, [dateQuery]);

  useEffect(() => {
    setPage(1);
  }, [filter, dateQuery]);

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      const res = await api.get(`/tasks?filter=${dateQuery}`);
      const result = await res.data;
      settaskBuffer(result.tasks);
      setactiveTaskCount(result.activeCount);
      setcompleteTaskCount(result.completedCount);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      toast.error('Đã xảy ra lỗi khi tải task. Vui lòng thử lại!');
    }
  };

  // Filtter
  const filterTasks = taskBuffer.filter((task) => {
    switch (filter) {
      case 'active':
        return task.status === 'active';
      case 'completed':
        return task.status === 'completed';
      default:
        return true;
        break;
    }
  });

  const visibleTask = filterTasks.slice(
    (page - 1) * visibleTaskLimit,
    page * visibleTaskLimit
  );
  const totalPages = Math.ceil(filterTasks.length / visibleTaskLimit);

  // Action Handlers
  const handleTaskChanged = () => {
    fetchTasks();
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <Background>
      <div className='container relative z-10 pt-8 mx-auto'>
        <div className='w-full max-w-2xl -6 mx-auto space-y-6'>
          {/* Header */}
          <Headers />
          {/* Add Task */}
          <AddTask onAddedNewTask={handleTaskChanged} />
          {/* Stats and Filters */}
          <StatsAndFilters
            filter={filter}
            setFilter={setFilter}
            activeTaskCount={activeTaskCount}
            completeTaskCount={completeTaskCount}
          />
          {/* Task List */}
          <TaskList
            filteredTasks={visibleTask}
            filter={filter}
            handleTaskChanged={handleTaskChanged}
          />
          {/* Pagination and  Date Filtter*/}
          <div className='flex flex-col items-center justify-between gap-6 md:flex-row'>
            <TaskListPagination
              handleNextPage={handleNextPage}
              handlePrevPage={handlePrevPage}
              handlePageChange={handlePageChange}
              currentPage={page}
              totalPages={totalPages}
            />
            <DateTimeFilter
              dateQuery={dateQuery}
              setDateQuery={setDateQuery}
            />
          </div>
          {/* Footer */}
          <Footer />
        </div>
      </div>
    </Background>
  );
};

export default HomePage;
