import "./App.css";
import About from "./components/About";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import Header from "./components/Header";
import TaskList from "./components/TaskList";
import { TaskProvider, useStateValue } from "./Context/GlobalState";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const [{ addTask }, dispatch] = useStateValue();
  return (
    <Router>
      <div className="container">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                {addTask && <AddTask />}
                <TaskList />
              </>
            }
          />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
