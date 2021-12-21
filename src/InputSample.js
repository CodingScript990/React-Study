import React, {useState, useRef} from 'react';

function InputSample() {
    //const [text, setText] = useState(''); // string blank space
    const [inputs, setInputs] = useState({
        name : '',
        nickname : '',
    });

    const nameInput = useRef(); // nameInput 객체를 만들고

    const {name, nickname} = inputs;

    const onChange = (e) => { 
        //setText(e.target.value); // text value write
        const {name, value} = e.target;
        
        setInputs({ // 항상 객체상태를 업데이트 할때에는 
            ...inputs, // 스패이드 문법을 사용해서 객체를 복사하고
            [name] : value, // 특정 값을 덮어씌어서 상태를 업데이트 시켜줘야 한다!
        }); // 불변성 상태를 지켜줘야 하는 건 컴포넌트 최적화 업데이트를 위한 작업을 해주기 위함이다!
    };
    const onReset = (e) => {
        //setText(''); // string value reset
        setInputs({ 
            name : '', 
            nickname : '', 
        });
        nameInput.current.focus(); // nameInput이 onReset이 발동되면? name이라는 아이에게
    };// focus를 줘라~~!
    return (
        <div>
            <input placeholder='name' name='name' onChange={onChange} value={name} ref={nameInput} />
            <input placeholder='nickname' name='nickname' onChange={onChange} value={nickname} />
            <button onClick={onReset}>초기화</button>
            <div>
                <b>value : </b>
                {name} ({nickname})
            </div>
        </div>
    );
};

export default InputSample;