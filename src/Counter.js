import React, { useReducer } from 'react';

// reducer function (state, action)
function reducer(state, action) {
    switch(action.type) {
        case 'INCREMENT' : return state + 1; // state : increate
        case 'DECREMENT' : return state - 1; // state : decreate
        default : throw new Error('Unhandled action'); // error 발생시 보여줌
    }
};

function Counter() {
    /*
    import React, { useState } from 'react';

    const [number, setNumber] = useState(0); // 원소1, 원소2 => 0

    const onIncrease = () => {
        setNumber(prevNumber => prevNumber + 1); // 현재 값을 업데이트 하겠다.
    };

    const onDecrease = () => {
        setNumber(prevNumber => prevNumber - 1);
    };
    => useState 형태
    */
    // useReducer
    const [number, dispatch] = useReducer(reducer, 0); // state, action = useReducer(reducer, Initial value[초기값] === 0)

    const onIncrease = () => { // increate
        dispatch({ // action
            type : 'INCREMENT', // type
        });
    };

    const onDecrease = () => { // decrease
        dispatch({ // action
            type : 'DECREMENT', // type
        });
    };
    return (
        <div>
            <h1>{number}</h1>
            <button onClick={onIncrease}>+1</button>
            <button onClick={onDecrease}>-1</button>
        </div>
    );
};

export default Counter;