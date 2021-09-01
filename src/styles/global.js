import { createGlobalStyle } from 'styled-components';
import 'video-react/styles/scss/video-react.scss';
import colors from './colors';

const GlobalStyle = createGlobalStyle`
  /* Default */
  * {
    box-sizing: border-box;
    margin: 0;
    outline: 0;
    padding: 0;
  }
  html {
    background-color: ${colors.background};
    background-repeat: no-repeat;
    scroll-behavior: smooth;
  }
  body {
    background-color: transparent;
    margin: 0 auto;
    text-rendering: optimizeLegibility !important;
    -webkit-font-smoothing: antialiased !important;
  }
  body, input, textarea {
  }
  a, button {
    outline: none;
  }

  /* Toast Notification */
  .toast-notification-error,
  .toast-notification-info,
  .toast-notification-success,
  .toast-notification-warning {
    display:flex;
    .toast-notification-body {
      padding: 30px;
      font-size: 14px;

      &:before {
        display: block;
        font-weight: bold;
        margin-bottom: 5px;
      }
    }
  }
  .toast-notification-error {
    background-color: ${colors.error};
    .toast-notification-body:before {
      content: 'Error message:';
    }
  }
  .toast-notification-info {
    background-color: ${colors.info};
    .toast-notification-body:before {
      content: 'Info message:';
    }
  }
  .toast-notification-success {
    background-color: ${colors.success};
    .toast-notification-body:before {
      content: 'Success message:';
    }
  }
  .toast-notification-warning {
    background-color: ${colors.warning};
    .toast-notification-body:before {
      content: 'Warning message:';
    }
  }
`;

export default GlobalStyle;
