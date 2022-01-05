//레이아웃 위에 헤더 부분 올리기 
//날짜, 할 일 개수 
import React from 'react';
import styled from 'styled-components';
import {useTodoState} from '../TodoContext'; 

const TodoHeadBlock = styled.div`
    padding-top: 48px;
    padding-left: 32px;
    padding-right: 32px;
    padding-bottom: 24px;
    border-bottom: 1px solid #e9ecef;
    h1{
        margin: 0;
        font-size: 36px;
        color: #343a40;
    }
    .day{
        margin-top: 4px;
        color: #868e96;
        font-size: 21px;
    }
    .tasks-left{
        color: #30c997;
        font-size: 18px;
        margin-top: 40px;
        font-weight: bold;
    }
`;

function TodoHead(){
    const todos = useTodoState(); //총 할 일 목록
    const undoneTasks = todos.filter(todo => !todo.done); //아직 끝내지 않은 할 일 목록
    const today = new Date(); //날짜 객체
    const dateString = today.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }); //날짜가 보여지는 방식 설정, 년+월+일
    const dayName = today.toLocaleDateString('ko-KR', {weekday: 'long'}); //요일
    return (
        <TodoHeadBlock>
            <h1>{dateString}</h1>
            <div className="day">{dayName}</div>
            <div className="tasks-left">할 일 {undoneTasks.length}개 남음</div>
        </TodoHeadBlock>
    );
}

export default TodoHead;
