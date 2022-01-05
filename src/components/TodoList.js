//todolist 항목이 들어가는 부분
import React from 'react';
import styled from 'styled-components';
import TodoItem from "./TodoItem"; //TodoItem 렌더링
import {useTodoState} from '../TodoContext'; 

const TodoListBlock = styled.div`
    flex: 1; /*차지할 수 있는 영역을 꽉 채움*/
    padding: 20px 32px;
    padding-bottom: 48px;
    overflow-y: auto; /*내용이 넘칠 때 가로 스크롤바 표시*/
`;

function TodoList(){
    const todos = useTodoState();
    return <TodoListBlock>
        {todos.map(todo => (
            <TodoItem
                key={todo.id}
                id={todo.id}
                text={todo.text}
                done={todo.done}
            />
        ))}
    </TodoListBlock>;
}
export default TodoList;