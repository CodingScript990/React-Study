import React, { Component } from "react";

class LifeCycleSample extends Component {
  state = {
    number: 0,
    color: null
  };

  myRef = null; // ref 를 설정 할 부분

  constructor(props) {
    super(props);
    console.log("constructor");
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log("getDerivedStateFromProps");
    if (nextProps.color !== prevState.color) {
      return { color: nextProps.color };
    }
    return null;
  }

  componentDidMount() {
    console.log("componentDidMount");
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldComponentUpdate", nextProps, nextState);
    // 숫자의 마지막 자리가 4면 리렌더링하지 않습니다
    return nextState.number % 10 !== 4;
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
  }

  handleClick = () => {
    this.setState({
      number: this.state.number + 1
    });
  };

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("getSnapshotBeforeUpdate");
    if (prevProps.color !== this.props.color) {
      return this.myRef.style.color;
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("componentDidUpdate", prevProps, prevState);
    if (snapshot) {
      console.log("업데이트 되기 직전 색상: ", snapshot);
    }
  }

  render() {
    console.log("render");

    const style = {
      color: this.props.color
    };

    return (
      <div>
        <h1 style={style} ref={ref => (this.myRef = ref)}>
          {this.state.number}
        </h1>
        <p>color: {this.state.color}</p>
        <button onClick={this.handleClick}>더하기</button>
      </div>
    );
  }
}

export default LifeCycleSample;

/*
    [LifeCycle Method]
    
    ✔ Render 단계 : React에 의해 일시 중지, 중단 or 재시작 될 수 있다.
    ✔ Pre-commit단계 : DOM을 읽을 수 있다.
    ✔ Commit단계 : DOM을 사용하여 부작용을 실행하고 update를 예약 할 수 있다.

    1. 생성 
    - constructor -> getDerivedStateFromProps -> render -> React DOM 및 refs update -> componentDidMount

    2. 업데이트
        [New props, setState()]
    - getDerivedStateFromProps -> shouldComponentUpdate -> render -> getSnapshotBeforeUpdate -> 
        React DOM 및 refs update -> componentDidUpdate

        [forceUpdate()]
    - getDerivedStateFromProps -> render -> getSnapshotBeforeUpdate -> React DOM 및 refs update -> 
        componentDidUpdate

    3. 제거
    - componentWillUnmount
*/
/*
    Α. [Mount]

    - constructor(생성자 function) : 첫 컴포넌트가 생성될때 만들어지는 곳!
    ex)

    constructor(props) {
        super(props); 기존 만들어져 있는 React constructor를 덮어 씌우고 사용할 것이라는 의미
        console.log('constructor');
    }

    - getDerivedStateFromProps : 받아올 props와 컴포넌트의 상태를 가리킨다.

    ex)

    static getDerivedStateFromProps(netxProps, prevState) { // props, state
        console.log('getDerivedStateFromProps);
        if (nextProps.color !== prevState.color) { 
            return {color : netxProps.color};
        }
        return null;
    }

    - render : 마지막 이전에 거쳐가는 단계라고 생각하면 된다.

    ex)

    render () {
        return <div>Hello?</div>
    }

    - componentDidMount : 외부 API를 호출을 할 수 도 있고, 요청도 할 수 있고, 특정 DOM에 Event를 걸 수 있다.
                        즉, view에 이미 코드가 뿌려져 있기에 거기에 이벤트를 걸거나 호출하거나 할 수 있다는 소리다.

    ex)

    componentDidMount() {
        console.log('component가 view에 show!');
    };
*/
/*
    B. [update]
    
    - getDerivedStateFromProps : 받아올 props와 컴포넌트의 상태를 가리킨다.

    - shouldComponentUpdate : 최적화를 활용하는 용도!

    ex)

    shouldComponentUpdate(nextProps, nextState) {
        console.log('shouldComponentUpdate', nextProps, nextState);
        // 숫자 마지막 자리가 4면 not rendering
        return nextState.number % 10 !== 4;
    }

    - render : 마지막 이전에 거쳐가는 단계라고 생각하면 된다.

    - getSnapshotBeforeUpdate : 브라우저에 컴포넌트가 반영되기 전에 DOM에 접근하는 역할

    ex)

    getSnapshotBeforeUpdate(prevProps, prevState){
        console.log('getSnapshotBeforeUpdate');
        if (prevProps.color !== this.props.color) {
            return this.myRef.style.color;
        }
        return null;
    }

    - componentDidUpdate : getSnapshotBeforeUpdate에서 업데이트가 일어나면 componentDidUpdate에서
                        마지막으로 검토후 최후 업데이트 작업을 해준다.
    
    ex)

    componentDidUpdate(prevProps, prevState, snapshot) { 
        // prevProps : 이전 props정보
        // prevState : 이전 state상태
        // snapshot : 반환한 상태의 값을 조회
        
        if (snapshot) {
            console.log('update 직전 색상 : ', snapshot);
        }
    }
*/
/*
    C. [Unmount]

    - componentWillUnmount : component가 사라지기 직전에 작업해준다.

    ex)

    componentWillUnmount() { // 등록된 이벤트 제거, setTimeout취소 등등..
        console.log('componentWillUnmount');
    }
*/