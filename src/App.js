import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import AdminDashboard from "./scenes/AdminDashboard/AdminDashboard";
import RootLayout from "./Layout/RootLayout";
import ErrorElement from "./ErrorElement";
import Brand from "./scenes/Brand/Brand";
import Classification from "./scenes/Classification/Classification";
import AssetManagement from "./scenes/AssetManagement/AssetManagement";
import AssetServiceManagement from "./scenes/AssetServiceManagement/AssetServiceManagement";
import AssetRequestList from "./scenes/AssetRequestList/AssetRequestList";

import SignIn from "./SignIn/SignIn.jsx";
import UserDashboard from "./scenes/UserDashboard/UserDashboard";
import AssetRequest from "./scenes/AssetUserRequest/AssetRequest";
import { AssetHistoryNavigation } from "./scenes/AssetManagement/AssetNavigation/AssetHistoryNavigation";
import { AssetRootLayout } from "./Layout/AssetRootLayout";
import AssetMaintananceHistory from "./scenes/AssetManagement/AssetHistory/AssetMaintanence";
import AssetAssignedHistory from "./scenes/AssetManagement/AssetHistory/AssetAssigned";
import { UserDashboardNavigation } from "./scenes/UserDashboard/Navigation/UserDashboardNavigation";
import { UserDashboardLayout } from "./Layout/UserDashboardLayout";
import UserAssetAssignedHistory from "./scenes/UserDashboard/UserAssetAssignedHistory";

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorElement />,
    children: [
      {
        index: true,
        element: <AdminDashboard />
      },
      {
        path: '/brand',
        element: <Brand />,
      },
      {
        path: '/classification',
        element: <Classification />,
      },
      {
        path: 'assetmanagement',
        children: [
          {
            index: true,
            element: <AssetManagement />
          },
          {
            path: ':eventId',
            id: 'asset-detail',
            children: [
              {
                path: '',
                element: <AssetRootLayout />,
                children: [
                  {
                    index: true,
                    element: <AssetMaintananceHistory />,
                  },
                  {
                    path: 'assignedhistory',
                    element: <AssetAssignedHistory />,
                  }
                ]
              }

            ]
          }
        ]
      },
      {
        path: '/requestlist',
        element: <AssetRequestList />,
      },
      {
        path: '/servicemanagement',
        element: <AssetServiceManagement />,
      },
      {
        path: '/dashboard',
        element: <UserDashboardLayout />,
        children: [
          {
            index: true,
            element: <UserDashboard />
          },
          {
           path: '/dashboard/assignedassethistory',
            element: <UserAssetAssignedHistory />
          }
        ]
      },
      {
        path: '/request',
        element: <AssetRequest />,
      }

    ]
  },

])

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(false);
  const [isOpenSidebar, setIsOpenSidebar] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedUserAuthentication = localStorage.getItem('isLoggedIn');
    if (storedUserAuthentication) {
      setIsAuthenticated(true);
    }
  }
    , []);

  const toggleSidebar = (props) => {
    // console.log("Add",props);
    setIsSidebar(props);
  };

  const handleLogin = (props) => {
    setIsAuthenticated(props);
  }

  const handleLogout = () => {
    setIsAuthenticated(false);
  }



  return (

    <>
      {isAuthenticated ? (
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className="app">
              <RouterProvider router={router} />
            </div>
          </ThemeProvider>
        </ColorModeContext.Provider>
      ) : (
        <SignIn onLogin={handleLogin} />
      )}

    </>

  );
}

export default App;
 