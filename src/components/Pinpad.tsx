import * as React from 'react';
import { Row, KeyButton, Panel, ViewCode } from './Styled/PinpadStyled';

interface StateProps {
  code: string;
  codeLength: number;
  maxAttempts?: number;
  keys?: string[]
  columnsCount?: number
}

interface ReactState {
  currentCode: string;
  currentAttempt: number;
  mode: Modes;
  keys: string[]
  columnsCount: number
}

export enum Modes {
    INPUT,
    OK,
    ERROR,
    LOCKED,
}

const defaultKeys: string[] = ['7','8','9','4','5','6','1','2','3','0']
const defaultMaxColumns: number = 3

type AllProps = StateProps;

const DefaultState = {
    currentCode: '',
    currentAttempt: 1,
    mode: Modes.INPUT
}

class Pinpad extends React.PureComponent<AllProps, ReactState> {
    private timeout?: number

    constructor(props: AllProps) {
        super(props)

        const { keys, columnsCount } = props

        this.state = { 
            ...DefaultState,
            keys: keys && keys.length > 0 ? keys : defaultKeys,
            columnsCount: columnsCount ? columnsCount : defaultMaxColumns
        }
    }

    componentWillUnmount() {
        if (this.timeout) {
          clearTimeout(this.timeout)
        }
      }

    onKeyPressed = (value: string) => {
        const { currentCode } = this.state
        const { codeLength } = this.props

        const updatedCode = currentCode + value

        if (updatedCode.length === codeLength) {
            this.check(updatedCode)
        } else {
            this.setState({ currentCode: updatedCode })
        }
    }

    check = (updatedCode: string) => {
        const { currentAttempt } = this.state
        const { code, maxAttempts } = this.props

        if (updatedCode === code) {
            this.setOk()
        } else if (maxAttempts === currentAttempt) {
            this.setLocked()
            return
        } else {
            this.setError()
        }

        this.timeout = window.setTimeout((() => { 
            this.setState({
                mode: DefaultState.mode,
                currentCode: DefaultState.currentCode
            }
        )}).bind(this), 2000)
    }

    setLocked = () => {
        this.setState({ ...DefaultState, mode: Modes.LOCKED })

        this.timeout = window.setTimeout((() => { 
            this.setState(DefaultState)
        }).bind(this), 30000)
    }

    setOk = () => this.setState({ ...DefaultState, mode: Modes.OK })
    setError = () => this.setState({ ...DefaultState, mode: Modes.ERROR, currentAttempt: this.state.currentAttempt + 1 })

    renderButtons = (keyValues: string[]) => {
        const { mode, columnsCount } = this.state

        if (keyValues.length === 0)
            return

        const canInput = mode !== Modes.INPUT
        const nextRow = keyValues.length > 0 ? keyValues.slice(columnsCount) : keyValues

        return <>
            <Row>
                {keyValues.slice(0, columnsCount).map(x => 
                    <KeyButton 
                        disabled={canInput} 
                        key={`keyButton_${x}`} 
                        onClick={() => this.onKeyPressed(x)}>{x}</KeyButton>
                )}
            </Row>
            {this.renderButtons(nextRow)}
        </>
    }

    codeView = () => {
        const { currentCode, mode } = this.state
        return mode !== Modes.INPUT 
            ? Modes[mode] 
            : currentCode.split('').map((cur, index) => index + 1 === currentCode.length ? cur : '*').join('')
    }

    render() {
        const { keys } = this.state

        return (
            <Panel>
                <ViewCode mode={this.state.mode} disabled value={this.codeView()} />
                {this.renderButtons(keys)}
            </Panel>
        );
    }
}

export default Pinpad

