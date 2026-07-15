import "./App.css";

import Header from "../Components/Header";
import Sidebar from "../Components/Navbar";
import Home from "../Components/Home";
import Employees from "../Components/Employees/index.jsx";
import Settings from "../Components/Settings";
import Analytics from "../Components/Analytics";
import Projects from "../Components/Projects";
import AIAssistant from "../Components/AIAssistant";
import LoginSignup from "../Components/Pages/LoginSignup";

import { useState } from "react";
import prime from "../src/assets/autobots/prime.png";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";




// Dashboard Layout

const DashboardLayout = () => {


  const [employees, setEmployees] = useState([

    {
      id: 1,
      name: "Prime",
      image: prime,
      role: "Chief Autobot",
      department: "Leadership",
      description:
        "Leads the entire AI workforce and coordinates all business operations.",
      skills: [
        "Leadership",
        "Planning",
        "Decision Making",
      ],
    },

  ]);





  return (

    <div
      className="
        flex
        h-screen
        overflow-hidden
      "
    >




      {/* Fixed Sidebar */}

      <Sidebar />






      {/* Main Right Layout */}

      <div
        className="
          flex-1
          flex
          flex-col
          h-screen
          overflow-hidden
        "
      >




        {/* Fixed Header */}

        <Header
          employees={employees}
        />






        {/* Only Scrollable Area */}

        <main
          className="
            flex-1
            overflow-y-auto
            overflow-x-hidden
            bg-slate-100
          "
        >



          <Routes>


            <Route
              path="/"
              element={<Home />}
            />



            <Route
              path="/employees"
              element={
                <Employees
                  employees={employees}
                  setEmployees={setEmployees}
                />
              }
            />



            <Route
              path="/settings"
              element={<Settings />}
            />



            <Route
              path="/analytics"
              element={<Analytics />}
            />



            <Route
              path="/projects"
              element={<Projects />}
            />



          </Routes>





          <AIAssistant />



        </main>



      </div>



    </div>

  );

};









// Authentication Layout

const AuthLayout = () => {

  return (

    <LoginSignup />

  );

};









// App

const App = () => {


  return (

    <Router>


      <Routes>


        {/* Login */}

        <Route
          path="/sign-in"
          element={<AuthLayout />}
        />





        {/* Dashboard */}

        <Route
          path="/*"
          element={<DashboardLayout />}
        />



      </Routes>


    </Router>

  );

};



export default App;