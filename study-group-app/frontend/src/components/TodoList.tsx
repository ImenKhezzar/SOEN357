import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Task from './Task';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

interface TaskType {
    id: number;
    name: string;
    completed: boolean;
}

const TodoList: React.FC = () => {
    const axiosPrivate = useAxiosPrivate();
    const [tasks, setTasks] = useState<TaskType[]>([]);

    useEffect(() => {
        getTasks();
    }, []); 

    const getTasks = async () => {
        try {
            const response = await axiosPrivate.get('/tasks/user');
            const tasks = response.data.tasks.map((task: any) => ({
                ...task,
                completed: task.status === 'complete'
            }));
            setTasks(tasks);
        } catch (err) {
            console.error('Failed to get tasks', err);
        }
    };

    const updateTaskStatus = async (id: number) => {
        const task = tasks.find(task => task.id === id);
        if (!task) return;
        const status = !task.completed ? 'complete' : 'incomplete';
        try {
            await axiosPrivate.put(`/tasks/${id}/status`, { status });
            setTasks(tasks.map(task =>
                task.id === id ? { ...task, completed: !task.completed } : task
            ));
        } catch (err) {
            console.error('Failed to update task', err);
        }
    };

    const addTask = async () => {
        try {
            await axiosPrivate.post('/tasks/', { name: 'new task' });
            getTasks();
        } catch (err) {
            console.error('Failed to add task', err);
        }
    };

    const updateTaskName = async (id: number, name: string) => {
        if (!name.trim()) return; // Don't update if the name is empty
        try {
            await axiosPrivate.put(`/tasks/${id}/name`, { name });
            setTasks(tasks.map(task =>
                task.id === id ? { ...task, name } : task
            ));
        } catch (err) {
            console.error('Failed to update task', err);
        }
    };

    const deleteTask = async (id: number) => {
        try {
            await axiosPrivate.delete(`/tasks/${id}`);
            setTasks(tasks.filter(task => task.id !== id));
        } catch (err) {
            console.error('Failed to delete task', err);
        }
    };

    return (
        <div className='todo-list-container'>
            <div className="white-box" style={{ width: '25%', maxWidth: '30%', maxHeight: '80vw', margin: 'auto' }}>
                <h2>My Tasks</h2>
                <div className="add-task-container">
                </div>
                {tasks.length === 0 ? (
                    <p>All your tasks are completed!</p>
                ) : (
                    tasks.map(task => (
                        <Task key={task.id} task={task} updateTaskName={updateTaskName} updateTaskStatus={updateTaskStatus} deleteTask={deleteTask} />
                    ))
                )}
                <div className="add-task-container">
                    <Button variant="text" onClick={addTask} className='add-task-button'>+ Add Task</Button>
                </div>
            </div>
        </div>
    );
};

export default TodoList;
