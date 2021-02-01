import useTheme from "@material-ui/core/styles/useTheme";

import NavBar from "./Navbar";

function App() {
  const theme = useTheme();

  return (
    <div
      style={{
        height: '100%',
        backgroundColor: theme.palette.background.default,
        overflow: 'auto',
      }}
    >
      <NavBar />
    </div>
  );
}

export default App;
