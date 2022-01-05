import React from 'react';
import styled, {css} from 'styled-components';
import {MdDone, MdDelete} from 'react-icons/md'; //체크, 삭제 아이콘
import {useTodoDispatch} from '../TodoContext'; //토글 기능과 삭제 기능을 위해 불러옴
//삭제 버튼
const Remove = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: #dee2e6;
    font-size: 24px;
    cursor: pointer;
    &:hover{
        color: #ff6b6b; /*마우스 포인터가 요소 위에 올라가 있으면*/
    }
    display: none;
`;

const TodoItemBlock = styled.div`
    display: flex;
    align-items: center;
    padding-top: 12px;
    padding-bottom: 12px;
    &:hover{
        /*TodoItemBlock 위에 마우스 포인터가 있을 때 Remove 컴포넌트를 보여줌*/
        ${Remove} {
            display: initial; /*속성의 기본값, 초기값을 요소에 적용*/
        }
    }
`;

//체크박스 꾸미기
const CheckCircle = styled.div`
    /*체크박스 틀 크기 설정*/
    width: 32px; 
    height: 32px;
    /*체크박스 원형 틀 설정*/
    border-radius: 16px;
    border: 1px solid #ced4da;
    font-size: 24px; /*체크의 크기*/
    /* 내용의 위치 설정*/
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
    cursor: pointer;
    ${props =>
        props.done && 
        css`
            border: 1px solid #38d9a9;
            color: #38d9a9;
    `}
`;

//할 일 텍스트 부분
const Text = styled.div`
        flex: 1; /*공간 전부 사용*/
        font-size: 21px;
        color: #495057;
        ${props =>
            props.done &&
            css`
                color: #ced4da;
        `}
`;

function TodoItem({id, done, text}){
    const dispatch = useTodoDispatch();
    const onToggle = () => dispatch({type: 'TOGGLE', id}); //클릭하면 toggle
    const onRemove = () => dispatch({type: 'REMOVE', id}); //클릭하면 remove
    return ( 
        <TodoItemBlock>
            <CheckCircle done={done} onClick={onToggle}>{done && <MdDone/>}</CheckCircle>
            <Text done={done}>{text}</Text>
            <Remove onClick={onRemove}>
                <MdDelete/>
            </Remove>
        </TodoItemBlock>
    );

}

export default React.memo(TodoItem);