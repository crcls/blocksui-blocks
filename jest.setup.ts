import React from 'react';
import Styled from 'styled-components';

interface SWindow extends Window {
  React: typeof React;
  Styled: typeof Styled;
}

declare let window: SWindow;

window.React = React;
window.Styled = Styled;
