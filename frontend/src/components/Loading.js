import { FiLoader } from "react-icons/fi";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  from {transform:rotate(0deg)};
    to {transform:rotate(360deg)};
`;

export const Loading = styled(FiLoader)`
    position: absolute;
    left: 50%;
    top: 50%;
    width: 30px;
    height: 30px;
    animation: ${spin} 1500ms linear infinite;
    color: var(--primary-color);
`;
