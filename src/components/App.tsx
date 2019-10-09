import * as React from 'react';
import Pinpad from './Pinpad';
import styled from 'styled-components';

class App extends React.PureComponent<any> {
  render() {
    return (
      <AppContainer>
        <Pinpad code='1234' codeLength={4} maxAttempts={3} />
      </AppContainer>
    );
  }
}

export default App;


export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
