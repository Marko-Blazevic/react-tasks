import React, { useEffect, useState } from 'react';
import useHttp from './hooks/use-http';
import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';

function App() {
  const [tasks, setTasks] = useState([]);

  const { isLoading, error, fetchRequest } = useHttp();

  useEffect(() => {
    const fetchTasks = (data) => {
      const loadedTasks = [];
      for (const taskKey in data) {
        loadedTasks.push({ id: taskKey, text: data[taskKey].text });
      }
      setTasks(loadedTasks);
    };

    fetchRequest(
      {
        url: 'https://react-tasks-a810a-default-rtdb.firebaseio.com/tasks.json',
      },
      fetchTasks
    );
  }, [fetchRequest]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchRequest}
      />
    </React.Fragment>
  );
}

export default App;
