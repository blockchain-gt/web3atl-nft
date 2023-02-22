import { Routes, Route } from "react-router-dom";
import ClaimPage from "./components/ClaimNFTPage/claim";
import AdminPage from "./components/Admin/admin";
import CreateUser from "./components/CreateUser/createuser";

function App() {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <ClaimPage />
            </>
          }
        />
        <Route
          path="/admin-page"
          element={
            localStorage.getItem("loggedIn") === "true" ? (
              <>
                <CreateUser />
              </>
            ) : (
              <></>
            )
          }
        />
        <Route
          path="/admin"
          element={
            <>
              <AdminPage />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
