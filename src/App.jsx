import { useEffect, useState } from "react";
import AddTask from "./assets/components/AddTask";
import Tasks from "./assets/components/Tasks";
import { v4 } from "uuid";
import Title from "./assets/components/Title";

const CHAVE_DO_STORAGE = "tasks";

function App() {
  const [tasks, setTasks] = useState(
    //Salva o que está no localStorage, ou carrega uma lista vazia
    JSON.parse(localStorage.getItem(CHAVE_DO_STORAGE)) || []
  );

  useEffect(() => {
    localStorage.setItem(CHAVE_DO_STORAGE, JSON.stringify(tasks));
  }, [tasks]); //A função acima será executada sempre que a lista tasks for alterada

  //Consumindo uma API
  // useEffect(() => {
  //   //Chamando a API
  //   const fetchTasks = async () => {
  //     const response = await fetch(
  //       "https://jsonplaceholder.typicode.com/todos?_limit=10",
  //       {
  //         method: "GET",
  //       }
  //     );

  //     //Obtendo os dados que a API retorna
  //     const data = await response.json();

  //     //Armazenar/Persistir os dados no state:
  //     setTasks(data);
  //   };
  //   fetchTasks();
  // }, []);

  function onTaskClick(taskId) {
    const newTasks = tasks.map((task) => {
      if (task.id == taskId)
        return { ...task, isCompleted: !task.isCompleted };

      return task;
    });
    setTasks(newTasks);
  }

  function onDeleteTaskClick(taskId) {
    const newTasks = tasks.filter((t) => t.id !== taskId);
    setTasks(newTasks);
  }

  function onAddTaskSubmit(title, description) {
    const newTask = {
      id: v4(),
      title,
      description,
      isCompleted: false,
    };
    setTasks([...tasks, newTask]);
  }

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center items-start p-6">
      <div className="w-[500px] space-y-4">
        <Title >
          Gerenciador de Tarefas
        </Title>
        <AddTask onAddTaskSubmit={onAddTaskSubmit} />
        <Tasks
          tasks={tasks}
          onTaskClick={onTaskClick}
          onDeleteTaskClick={onDeleteTaskClick}
        />
      </div>
    </div>
  );
}

export default App;
