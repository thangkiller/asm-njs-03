import { AuthContextProvider } from "./Context/AuthContext";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";

function App() {
   return (
      <div className='App'>
         <AuthContextProvider>
            <RouterProvider router={router} />
         </AuthContextProvider>
      </div>
   );
}

export default App;
