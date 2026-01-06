import { useState, useEffect, useRef } from "react";
import type { Task } from "../../models/Task";
import { api } from "../../services/local_api";

type LogState = {
  id: number;
  message: string;
  type: "success" | "error";
} | null;

export const useToDoController = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState("");
  const [logState, setLogState] = useState<LogState>(null);
  const [hideCompleted, setHideCompleted] = useState(false);

  const dragItem = useRef<string | null>(null);

  useEffect(() => {
    loadTasks();
  }, []);

  const showLog = (message: string, type: "success" | "error") => {
    const id = Date.now();
    setLogState({ id, message, type });
    setTimeout(() => {
      setLogState((current) => {
        if (current?.id === id) return null;
        return current;
      });
    }, 3000);
  };

  const loadTasks = async () => {
    try {
      const data = await api.getAll();
      setTasks(data);
    } catch (error) {
      showLog("Erro ao carregar tarefas.", "error");
    }
  };

  const handleAddTask = async () => {
    if (!newTaskText.trim()) {
      showLog("A tarefa não pode estar vazia.", "error");
      return;
    }
    try {
      await api.create(newTaskText);
      await loadTasks();
      setNewTaskText("");
      showLog("Tarefa criada com sucesso!", "success");
    } catch (error) {
      showLog("Erro ao criar tarefa.", "error");
    }
  };

  const handleRemoveTask = async (id: string) => {
    try {
      await api.delete(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
      showLog("Tarefa removida.", "success");
    } catch (error) {
      showLog("Erro ao remover tarefa.", "error");
    }
  };

  const handleToggleTask = async (id: string) => {
    try {
      await api.toggle(id);
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
      );
    } catch (error) {
      showLog("Erro ao atualizar tarefa.", "error");
    }
  };

  const handleUpdateTask = async (id: string, newTitle: string) => {
    if (!newTitle.trim()) return;
    try {
      await api.update(id, newTitle);
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, title: newTitle } : t))
      );
      showLog("Tarefa editada com sucesso!", "success");
    } catch (error) {
      showLog("Erro ao editar tarefa.", "error");
    }
  };

  // --- LÓGICA DE DRAG AND DROP ---

  const handleDragStart = (id: string) => {
    dragItem.current = id;
  };

  const handleDragEnter = (targetId: string) => {
    // Se não estiver arrastando nada ou o alvo for o mesmo item, ignora
    if (dragItem.current === null) return;
    if (dragItem.current === targetId) return;

    // Encontra os índices REAIS na lista completa (blindagem contra filtros)
    const sourceIndex = tasks.findIndex((t) => t.id === dragItem.current);
    const targetIndex = tasks.findIndex((t) => t.id === targetId);

    // Se não achou algum dos itens, aborta
    if (sourceIndex === -1 || targetIndex === -1) return;

    const newTasks = [...tasks];
    const draggedItemContent = newTasks[sourceIndex];

    // Remove do local antigo e insere no novo
    newTasks.splice(sourceIndex, 1);
    newTasks.splice(targetIndex, 0, draggedItemContent);

    setTasks(newTasks);
  };

  const handleDragEnd = async () => {
    dragItem.current = null;

    try {
      await api.reorder(tasks);
    } catch (error) {
      showLog("Erro ao salvar nova ordem.", "error");
      loadTasks();
    }
  };

  const filteredTasks = hideCompleted
    ? tasks.filter((t) => !t.completed)
    : tasks;

  const toggleHideCompleted = () => {
    setHideCompleted((prev) => !prev);
  };

  return {
    model: {
      tasks: filteredTasks,
      newTaskText,
      logState,
      hideCompleted,
    },
    controller: {
      setNewTaskText,
      handleAddTask,
      handleRemoveTask,
      handleToggleTask,
      handleUpdateTask,
      toggleHideCompleted,
      handleDragStart,
      handleDragEnter,
      handleDragEnd,
    }
  };
};
