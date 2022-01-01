import React, { useReducer, Component } from 'react';

// [Class Component]

class Counter extends Component {

    // Custom Method 

    // Error!! However, there is a solution!(Three ways)

    // 1. constructor : 미리 Function Component에 binding해준다.

    /*
    constructor(props) {
        super(props);
        this.handleIncrease = this.handleIncrease.bind(this);
        this.handleDecrease = this.handleDecrease.bind(this);
    };
    */

    // 2. arrow : arrow use function component

    // 3. Use to setState  

    /*
    constructor(props) {
        super(props);
        this.state = { // initial state
            counter : 0, // 주의 : state는 항상 Object여야 한다. 만약 [],''(배열 or string)이면 error난다.
        };
    };
    */

    // constructor is not use [only state]
    // 바로 state값안에 initial value를 부여한다. / 정식 JS문법은 아니오나, 바벨을 통해 사용되는 문법임!

    state = {
        counter : 0,
        fixed : 1,
        update : { // 불가변성
            toggle : false,
            dontChange : 1,
        },
    };

    handleIncrease = () => { // update 하고자 하는 것만 들고오면 된다!
        /*
        this.setState({ // setState 안에서 정해놓은 counter 값의 상태만 보여준다.
            counter : this.state.counter + 1,
        });
        */

        // 그러나 setState안에서 state를 바로 받아온다면 업데이트한 값 만큼의 상태값이 변한다.
        this.setState( state => ({
            counter : state.counter + 1,
        }));
    };

    handleDecrease = () => {
        this.setState({
            counter : this.state.counter - 1,
        });
    };

    handleToggle = () => {
        this.setState({
            update : {
                toggle : !this.state.update.toggle,
            }
        });
    };

    render() {
        return (
            <div>
                <h1>{this.state.counter}</h1>
                <button onClick={this.handleIncrease}>+1</button>
                <button onClick={this.handleDecrease}>-1</button>
                <p>Fixed : {this.state.fixed}</p>
            </div>
        );
    }
};

// reducer function (state, action)
/*
function reducer(state, action) {
    switch(action.type) {
        case 'INCREMENT' : return state + 1; // state : increate
        case 'DECREMENT' : return state - 1; // state : decreate
        default : throw new Error('Unhandled action'); // error 발생시 보여줌
    }
};
*/

//function Counter() {
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
    /*
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
*/


export default Counter;