import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif;
    line-height: 1.5;
    color: ${props => props.theme.colors.textPrimary};
    background-color: ${props => props.theme.colors.primaryBg};
    font-size: 14px;
    margin: 0;
    transition: all 0.1s ease;
  }

  a {
    color: ${props => props.theme.colors.accentPrimary};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  * {
    transition: background-color 0.1s ease, color 0.1s ease, border-color 0.1s ease;
  }
`;

export default GlobalStyle;