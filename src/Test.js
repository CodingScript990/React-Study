import React, {Component} from 'react';

class Test extends Component {
    static defaultProps = {
        name : '이름없음',
    };
    render() {
        const {color, isSpecial, name} = this.props; // props로 부터 사용될 아이들(color, isSpecial, name)
        return ( // JSX
            <div style={{color}}>
                {isSpecial && <b>*</b>}
                Hello {name}
            </div>
        )
    }
};
/*
    [Fucntion Component]
function Test({color, name, isSpecial}) {
    return (
        <div style={{color}}>
            {isSpecial ? <b>*</b> : null}
            Hello~! {name}
        </div>
    );
}
*/

/*
Test.defaultProps = {
    name : '이름없음'
};
*/

export default Test;