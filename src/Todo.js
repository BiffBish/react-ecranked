import React from 'react'

export default function Todo({todo, toggleTodo}) {
    function handleTodoClick(){
        toggleTodo(todo.id)
    }
    return (
        <div>
            <lable>
                <input type="checkbox" checked={todo.complete} onChange=
                {handleTodoClick} />
            {todo.name}
            </lable>
        </div>
    )
}
