import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

interface TaskProps {
    task: {
        id: number;
        name: string;
        completed: boolean;
    };
    updateTaskName: (id: number, name: string) => void;
    updateTaskStatus: (id: number) => void;
    deleteTask: (id: number) => void;
}

const Task: React.FC<TaskProps> = ({ task, updateTaskName, updateTaskStatus, deleteTask }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(task.name);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.target.value);
    };

    const handleBlur = () => {
        if (newTitle.trim() === '') {
            setNewTitle(task.name);
        } else {
            updateTaskName(task.id, newTitle);
        }
        setIsEditing(false);
    };

    return (
        <div className="list">
            <input
                type="checkbox"
                checked={task.completed}
                onChange={() => updateTaskStatus(task.id)}
                style={{ marginRight: '0.7em' }}
            />
            {isEditing ? (
                <TextField
                    type="text"
                    variant="standard"
                    value={newTitle}
                    onChange={handleTitleChange}
                    onBlur={handleBlur}
                    autoFocus
                    sx={{
                        '& .MuiInput-underline:after': {
                            borderBottomColor: '#927AF4', // Change the color of the bottom line when focused
                        },
                        '& .MuiInputBase-input': {
                            fontFamily: 'Inter, sans-serif', // Change the text color
                        },
                    }}
                />
            ) : (
                <span
                    style={{
                        textDecoration: task.completed ? 'line-through' : 'none',
                        color: task.completed ? 'lightgrey' : 'inherit', // Set text color to light grey if completed
                    }}
                    onDoubleClick={() => setIsEditing(true)}
                >
                    {task.name}
                </span>
            )}
            <IconButton
                aria-label="delete"
                onClick={() => deleteTask(task.id)}
                style={{ marginLeft: 'auto' }}
            >
                <DeleteIcon />
            </IconButton>
        </div>
    );
};

export default Task;