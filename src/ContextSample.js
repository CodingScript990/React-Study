import React, { createContext, useContext, useState } from 'react';

const MyContext = createContext('defaultValue'); // New context

function Child (){
    const text = useContext(MyContext); // defaultValue(MyContext)
    return <div>Hello {text}</div> // Hello(Child) defaultValue(MyContext)
};

function Parent () { // Hello(Child)
    return <Child /> // Hello(Child)
};

function GrandParent () { // Hello(Parent)
    return <Parent /> // Hello(Parent)
}

function ContextSample () { // Hello(Parent)
    const [value, setValue] = useState(true);
    return (
        <MyContext.Provider value={ value ? 'Good' : 'Bad' }>
            <GrandParent />
            <button onClick={ () => setValue(!value)}>Click</button>
        </MyContext.Provider>  
    ) // Hello Good(GrandParent)
}

export default ContextSample;

/*
    Text설정한 것이 Child로 부터 Parent, GrandParent로 받아오는게 아닌, MyContext.Provider안에 value값이 Child안에 text을 추가해준다.
    그리고 이전에 설정해놓은 MyContext에 설정한 값은 초기화되고 MyContext.Provider안에 GrandParent를 설정한 value값이 선언되어
    결과는 "Hello Good"이 나오게 되는 것이다.
*/