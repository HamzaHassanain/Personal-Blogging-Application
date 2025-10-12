import "./App.css";
// import { Outlet } from "react-router-dom";
import Header from "./components/Header";

// Simple inline button component for now
const Button = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "10px 20px",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
};

function App() {
  return (
    <div className="App">
      <Header />
      {/* <div className="container">
        <Outlet />
      </div> */}
      <Button onClick={() => alert("Button Clicked!")}>Click Me</Button>
    </div>
  );
}

export default App;
