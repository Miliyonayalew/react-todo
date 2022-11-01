import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaTrash, FaEdit } from 'react-icons/fa';
import styles from './TodoItem.module.css';

function TodoItem(props) {
  const [editing, setEditing] = useState(false);

  const handleEditing = () => {
    setEditing(true);
  };

  const handleUpdatedDone = (event) => {
    if (event.key === 'Enter') {
      setEditing(false);
    }
  };

  const {
    todo, handleChange, delTodo, handleUpdate,
  } = props;

  const completedStyle = {
    fontStyle: 'italic',
    color: '#595959',
    opacity: 0.4,
    textDecoration: 'line-through',
  };

  const { completed, id, title } = todo;

  const viewMode = {};
  const editMode = {};

  if (editing) {
    viewMode.display = 'none';
  } else {
    editMode.display = 'none';
  }

  return (
    <li className={styles.item}>
      <input
        type="checkbox"
        className={styles.checkbox}
        checked={completed}
        onChange={() => handleChange(id)}
      />
      <button
        type="button"
        style={{ backgroundColor: 'red', color: 'white' }}
        onClick={() => { delTodo(id); }}
      >
        <FaTrash />
      </button>
      <button
        type="button"
        onClick={() => { handleEditing(id); }}
        style={{ viewMode, backgroundColor: '#003554', color: 'white' }}
      >
        <FaEdit />
      </button>
      <span style={completed ? completedStyle : null}>
        {title}
      </span>
      <input
        type="text"
        className={styles.textInput}
        style={editMode}
        value={title}
        onChange={(e) => {
          handleUpdate(e.target.value, id);
        }}
        onKeyDown={handleUpdatedDone}
      />
    </li>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    completed: PropTypes.bool,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  delTodo: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired,
};

export default TodoItem;
