import React from "react";
import { useToDoController } from "./useToDoController";
import { useTheme } from "../../hooks/useTheme";
import { ToDoCard } from "./to-do-card/ToDoCard";
import { ToDoLog } from "./to-do-log/ToDoLog";
import { Plus, ListChecks, Sun, Moon, Filter } from "lucide-react";
import "./to-do-page.css";

export const ToDoPage: React.FC = () => {
  const { model, controller } = useToDoController();
  const { isDark, toggleTheme } = useTheme();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") controller.handleAddTask();
  };

  return (
    <div className="page-wrapper">
      <div className="todo-container">
        <button
          className="theme-toggle-btn"
          onClick={toggleTheme}
          title={isDark ? "Mudar para Modo Claro" : "Mudar para Modo Escuro"}
        >
          {isDark ? <Sun size={24} /> : <Moon size={24} />}
        </button>

        <header className="todo-header">
          <h1>To Do App MVC</h1>
          <ListChecks size={32} className="header-icon" />
        </header>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicione uma nova tarefa..."
            value={model.newTaskText}
            onChange={(e) => controller.setNewTaskText(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={controller.handleAddTask}
            className="add-btn"
            title="Adicionar nova tarefa"
          >
            <Plus size={24} color="white" />
          </button>
        </div>

        <ToDoLog
          key={model.logState?.id}
          message={model.logState?.message || null}
          type={model.logState?.type || null}
        />

        <div className="tasks-toolbar">
          <button
            className={`filter-btn ${model.hideCompleted ? "active" : ""}`}
            onClick={controller.toggleHideCompleted}
            title={
              model.hideCompleted
                ? "Mostrar todas as tarefas"
                : "Ocultar tarefas concluídas"
            }
          >
            <Filter size={20} />
          </button>
        </div>

        <div className="tasks-list">
          {model.tasks.map((task, index) => (
            <ToDoCard
              key={task.id}
              index={index}
              task={task}
              onDelete={() => controller.handleRemoveTask(task.id)}
              onToggle={() => controller.handleToggleTask(task.id)}
              onUpdate={controller.handleUpdateTask}
              onDragStart={controller.handleDragStart}
              onDragEnter={controller.handleDragEnter}
              onDragEnd={controller.handleDragEnd}
            />
          ))}

          {model.tasks.length === 0 && (
            <p className="empty-msg">
              {model.hideCompleted
                ? "Nenhuma tarefa pendente."
                : "Nenhuma tarefa por enquanto."}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
