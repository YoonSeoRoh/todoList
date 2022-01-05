import React from 'react'; //리액트 컴포넌트를 만들기 위해 필요한 코드, 리액트르 불러오는 작업
import { createGlobalStyle } from 'styled-components'; //JS안에 CSS를 작성할 수 있는 기능을 제공하는 라이브러리
import TodoTemplate from './components/Todo Template'; //레이아웃
import TodoHead from './components/TodoHead'; //레이아웃 헤더 부분 
import TodoList from './components/TodoList.js'; //todolist 부분 
import TodoCreate from './components/TodoCreate'; //todolist 입력 form+버튼
import {TodoProvider} from './TodoContext'; //TodoContext으로부터 TodoProvider를 불러옴
//전체 배경화면
const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;

function App(){
  return(
    <TodoProvider>
      <GlobalStyle/>
      <TodoTemplate>
        <TodoHead/>
        <TodoList/>
        <TodoCreate/>
      </TodoTemplate>
    </TodoProvider>
  );
}

export default App; //코드를 App이라는 컴포넌트 이름으로 내보내겠다는 의미, 다른 컴포넌트에서 이름을 불러와 사용 가능
