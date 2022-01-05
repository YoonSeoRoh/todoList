//useReducer를 사용하여 상태를 관리하는 컴포넌트
import React, {useReducer, createContext, useContext, useRef} from 'react';

//초기 todo
const initialTodos = [
    {
        id: 1,
        text: 'work1',
        done: true
    },
    {
        id: 2,
        text: 'work2',
        done: true
    },
    {
        id: 3,
        text: 'work3',
        done: false
    },
    {
        id: 4,
        text: 'work4',
        done: false
    }
];

function todoReducer(state, action){
    //상태와 action함수
    switch(action.type){
        case 'CREATE': return state.concat(action.todo);
        case 'TOGGLE': 
            return state.map(todo =>
                todo.id === action.id ? { ...todo, done: !todo.done} : todo
            );
        case 'REMOVE':
            return state.filter(todo => todo.id !== action.id);
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
    
}
const TodoStateContext = createContext(); //현재 할 일 목록
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext(); //다음 할 일 목록을 위한 아이디

export function TodoProvider({children}){
    const [state, dispatch] = useReducer(todoReducer, initialTodos);
    const nextId = useRef(5);
    return (
        <TodoStateContext.Provider value={state}>
            <TodoDispatchContext.Provider value={dispatch}>
                <TodoNextIdContext.Provider value={nextId}>
                {children}
                </TodoNextIdContext.Provider>
            </TodoDispatchContext.Provider>
        </TodoStateContext.Provider>
    );
}

//커스텀 Hook+에러처리
export function useTodoState(){
    const context = useContext(TodoStateContext);
    if(!context){
        throw new Error('Cannot find TodoProvider');
    }
    return context;
}

export function useTodoDispatch(){
    const context = useContext(TodoDispatchContext);
    if(!context){
        throw new Error('Cannot find TodoProvider');
    }
    return context;
}

export function useTodoNextId(){
    const context = useContext(TodoNextIdContext);
    if(!context){
        throw new Error('Cannot find TodoProvider');
    }
    return context;
}