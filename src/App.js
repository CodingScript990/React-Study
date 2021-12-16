import Test from './Test';
import Wrapper from './Wrapper';

function App() {
  return (
    <Wrapper>
      <Test name="react" color="red"/>
      <Test color="blue"/>
    </Wrapper>
  );
}

export default App;
