import { Component } from 'react';
import { createRoot } from 'react-dom/client';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './theme.js';
import App from './App.jsx';
import { ErrorDialog } from './components/Dialogs.jsx';
import './base.css';

// One bad record must not blank the whole interface: show the same Reload dialog the engine uses.
class Boundary extends Component {
  state = { error: null };
  static getDerivedStateFromError(error) { return { error: String(error?.message || error) }; }
  componentDidCatch(error) { console.error('[UI]', error); }
  render() { return this.state.error ? <ErrorDialog message={this.state.error} /> : this.props.children; }
}

createRoot(document.getElementById('ui-root')).render(
  <ThemeProvider theme={theme}>
    <CssBaseline enableColorScheme />
    <Boundary><App /></Boundary>
  </ThemeProvider>
);
