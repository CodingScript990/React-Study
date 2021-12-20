import React from 'react';

function Test({color, name, isSpecial}) {
    return (
        <div style={{color}}>
            {isSpecial ? <b>*</b> : null}
            Hello~! {name}
        </div>
    );
}

Test.defaultProps = {
    name : '이름없음'
};

export default Test;