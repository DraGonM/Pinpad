import * as React from 'react';
import styled from 'styled-components';
import { Modes } from '../Pinpad';

export const Panel = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #3bb0ff;
    padding: 0.5rem;
    border-radius: 1rem;
    max-width: 75%;
`;

export const Row = styled.div`
    display: flex;
    flex-direction: row;
`;

export const KeyButton = styled.button`
    background-color: white;
    font-size: 24px;
    padding: 1rem;
    margin: 0.2rem;
    border-radius: 0.5rem;
    border: none;
    color: #3bb0ff;
    text-align: center;
    text-decoration: none;

    &:disabled {
        background-color: lightgrey;
    }
`;

export const ViewCode = styled(({ mode, ...rest }) => <input {...rest} />)`
    background: #fff;
    border: 3px solid ${(p) => getInputColor(p.mode)};
    border-radius: 1rem;
    font-size: 32px;
    line-height: 1.2;
    margin: 1rem;
    outline: none;
    text-align: center;
    max-width: 100%;
`;

const getInputColor = (mode: Modes) => {
    switch (mode) {
        case Modes.OK:
            return '#0f9100';
        case Modes.ERROR:
        case Modes.LOCKED:
            return '#ff430f';
        default:
            return 'white';
    }
};
