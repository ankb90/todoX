import Task from '../models/Task.js';

//! Get tasks with optional filtering
export async function getTasks(req, res) {
  const { filter = 'today' } = req.query;
  const now = new Date();
  let startDate;

  // Determine the start date based on the filter
  switch (filter) {
    case 'today':
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      break;
    case 'week':
      const firstDayOfWeek = now.getDate() - now.getDay();
      startDate = new Date(now.getFullYear(), now.getMonth(), firstDayOfWeek);
      break;
    case 'month':
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    default:
      startDate = null;
      break;
  }
  const query = startDate ? { createdAt: { $gte: startDate } } : {};

  try {
    const results = await Task.aggregate([
      { $match: query },
      {
        $facet: {
          tasks: [{ $sort: { createdAt: -1 } }],
          activeCount: [{ $match: { status: 'active' } }, { $count: 'count' }],
          completedCount: [
            { $match: { status: 'completed' } },
            { $count: 'count' },
          ],
        },
      },
    ]);
    const tasks = results[0].tasks;
    const activeCount = results[0].activeCount[0]?.count || 0;
    const completedCount = results[0].completedCount[0]?.count || 0;
    // Send response
    res.status(200).json({ tasks, activeCount, completedCount });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

//! Create a new task
export async function createTask(req, res) {
  try {
    const { title } = req.body;
    const newTask = new Task({
      title: title,
    });

    await newTask.save(newTask);
    res.status(201).json(newTask);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

//! Update a task by ID
export async function updateTask(req, res) {
  try {
    const { id } = req.params;
    const { title, status } = req.body;

    const updatedFields = { title };

    if (status === 'completed') {
      updatedFields.status = 'completed';
      updatedFields.completedAt = new Date();
    } else if (status === 'active') {
      updatedFields.status = 'active';
      updatedFields.completedAt = null;
    }

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { $set: updatedFields },
      { new: true },
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

//! Delete a task by ID
export async function deleteTask(req, res) {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ message: `Task ${id}deleted successfully` });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
