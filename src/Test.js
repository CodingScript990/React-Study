import React from 'react';

function Test({color, name}) {
    return <div style={{
        color
    }}>Hello~! {name}</div>;
}

Test.defaultProps = {
    name : '이름없음'
};

export default Test;