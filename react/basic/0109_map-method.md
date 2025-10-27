# map 메서드를 사용한 목록 나열

```typescript jsx
import './App.css'
import * as React from "react";

const todoData = [
    {id: 1, title: '공부하기', completed: true},
    {id: 2, title: '청소하기', completed: false}
]

const buttonStyle: React.CSSProperties = {
    color: '#fff',
    border: 'none',
    padding: '5px 9px',
    borderRadius: '50%',
    cursor: 'pointer',
    float: 'right'
};

const getStyle = () => {
    return {
        padding: '10px',
        borderBottom: '1px #ccc dotted',
        textDecoration: 'none'
    }
}

function App() {
    return (
        <>
            <div className='container'>
                <div className='todoBlock'>
                    <div className='title'>
                        <h1>할 일 목록</h1>
                        {
                            todoData.map(data => (
                                <div key = {data.id} style={getStyle()}>
                                    <input type='checkbox' defaultChecked={false}/>
                                    {data.title}
                                    <button style={buttonStyle}>X</button>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default App

```