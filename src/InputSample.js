import React, {useState} from 'react';

function InputSample() {
    const [text, setText] = useState(''); // string blank space
    const onChange = (e) => { 
        setText(e.target.value); // text value write
    };
    const onReset = (e) => {
        setText(''); // string value reset
    };
    return (
        <div>
            <input onChange={onChange} value={text} />
            <button onClick={onReset}>초기화</button>
            <div>
                <b>value : </b>
                {text}
            </div>
        </div>
    );
};

export default InputSample;