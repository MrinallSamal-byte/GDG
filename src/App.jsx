import { BrowserRouter as Router } from "react-router-dom";
import AppLayout from "./routes/AppLayout";
import GlobalStyles from "./styles/Global";

function App() {
  return (
    <>
    <GlobalStyles/>
    <Router>
      <AppLayout />
    </Router>
    </>
  );
}

export default App;
