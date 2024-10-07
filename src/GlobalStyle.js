import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif;
    line-height: 1.5;
    color: ${props => props.theme.colors.textPrimary};
    background-color: ${props => props.theme.colors.primaryBg};
    font-size: 14px;
    margin: 0;
  }
`;

export default GlobalStyle;