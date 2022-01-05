import React, {useState} from 'react'; //상태 관리를 위해 불러옴
import styled, {css} from 'styled-components';
import {MdAdd} from 'react-icons/md';
import {useTodoDispatch, useTodoNextId} from '../TodoContext';

//할 일을 더하기 위한 버튼 생성
const CircleButton = styled.button`
    background: #38d9a9;
    &:hover{
        background: #63e6be; /*마우스 포인터가 해당 요소를 가리킬 때*/
    }
    &:active{
        background: #20c997; /*마우스 클릭하고 뗄 때까지 요소 변경*/
    }
    z-index: 5;
    cursor: pointer;
    width: 80px;
    height: 80px;
    display: block;
    align-items: center;
    justify-content: center;
    font-size: 60px;
    position: absolute;
    left: 50%;
    bottom: 0px;
    transfrom: translate(-50%, 50%);
    color: white;
    border-radius: 50%;
    border: none;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;

    transition: 0.125s all ease-in;
    ${props =>
        props.open &&
        css`
            background: #ff6b6b;
            &:hover{
                background: #ff8787; /*마우스 포인터가 버튼 위에 있으면*/
            }
            &:active{
                background: #fa5252; /*마우스로 클릭하는 동안*/
            }
            transform: translate(-50%, 50%) rotate(45deg); /*45도 회전*/
    `}
`;

const InsertFormPositioner = styled.div`
    width: 100%;
    bottom: 0;
    left: 0;
    position: absolute;
`;

//form
const InsertForm = styled.form`
    background: #f8f9fa;
    padding-left: 32px;
    padding-top: 32px;
    padding-right: 32px;
    padding-bottom: 72px;

    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
    border-top: 1px solid #e9ecef;
`;

//input
const Input = styled.input`
    padding: 12px;
    border-radius: 4px;
    border: 1px solid #dee2e6;
    width: 100%;
    outline: none;
    font-size: 18px;
    box-sizing: border-box;
`;


function TodoCreate(){
    //useState 함수 
    //toggle할 수 있는 open 값을 관리
    //상태값 저장 변수, 상태값 갱신 함수, 상태 초기값
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');

    const dispatch = useTodoDispatch();
    const nextId = useTodoNextId();

    const onToggle = () => setOpen(!open);
    const onChange = e => setValue(e.target.value);
    const onSubmit = e => {
        e.preventDefault(); //새로고침 방지
        dispatch({
            type: 'CREATE',
            todo: {
                id: nextId.current,
                text: value,
                done: false
            }
        });
        setValue('');
        setOpen(false);
        nextId.current += 1;
    }

    return (
        <>
            {open && (
                <InsertFormPositioner>
                    <InsertForm onSubmit={onSubmit}>
                    <Input autoFocus placeholder="할 일을 입력 후, Enter를 누르세요"
                    onChange={onChange} value={value}/>
                </InsertForm>
                </InsertFormPositioner>
            )}
            <CircleButton onClick={onToggle} open={open}>
                <MdAdd/>
            </CircleButton>
        </>
    );
}

export default React.memo(TodoCreate);