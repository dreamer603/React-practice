function Todo(props) {
    return (
        <div className="todo" key={props.todo.id}> 
          <h3>
            <label onClick={props.handleDelete}> ❌&nbsp;&nbsp;&nbsp;</label>
            <label className={props.todo.completed ? "completed" : null} onClick={props.handleClick}>
              {props.todo.todoName} </label>
          </h3>
        </div>
    )
}

export default Todo;
