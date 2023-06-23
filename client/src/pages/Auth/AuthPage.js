import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../../axios";
import { useAuth } from "../../context/Auth";

import Register from "./Register";
import Login from "./Login";
export default function AuthPage() {
  const [showLogin, setShowLogin] = useState(true);
  return (
    <main>
      <div className="wrapper">
        <div className={`main-inner`}>
        {showLogin ? (
          <Login setShowLogin={setShowLogin} />
        ) : (
          <Register setShowLogin={setShowLogin} />
        )}
          </div>
          </div>
    </main>
  );
}
