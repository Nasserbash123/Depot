"use client";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useEffect, useState } from "react";
import HeroSection from "../../components/sections/cart/heroSection";
import MainContainer from "../../components/layout/mainContainer";
import { createTheme } from "@material-ui/core/styles";
import '../../custom.css'
import Register from "@/app/components/sections/user-dashboard/register";
import Login from "@/app/components/sections/user-dashboard/login";
import { useRouter } from "next/navigation";
import ResetPassword from "@/app/components/sections/user-dashboard/resetPassword";


function UserDashboard() {
  const [ratevalue, setratevalue] = useState(2);
  const [value, setValue] = useState("1");

  const theme = createTheme({
    // Customize the MUI theme here
  });
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <HeroSection title="User Dashboard" />
      <MainContainer>
      
        <Box
          className="my-20 md:p-10 p-5 mx-auto lg:w-3/4 w-full"
          sx={{ typography: "body1" }}
        >
           
          <TabContext value={value} >
            <Box className=''>
              <TabList
                className=""
                TabIndicatorProps={{ style: { display: "none" } }}
                onChange={handleChange}
                aria-label="lab API tabs example"
                centered
             
              >
                <Tab
                  label="Login"
                  value="1"
                  className={`md:w-1/3 text-[15px] uppercase text-gray-500 transition duration-150 `}
                  sx={{
                    color: "gray.500",
                    "&.Mui-selected": {
                      backgroundColor: "#080808 !important",
                      color: "white",
                    },
                  }}
                />
                <Tab
                  className={`md:w-1/3 text-[15px] uppercase text-gray-500 transition duration-150 `}
                  label="REGISTER"
                  value="2"
                  sx={{
                    color: "gray.500",
                    "&.Mui-selected": {
                      backgroundColor: "#080808 !important",
                      color: "white",
                    },
                  }}
                />
                <Tab
                className={`md:w-1/3 text-[15px] uppercase text-gray-500 transition duration-150 `}
                  label="RESET PASSWORD "
                  value="3"
                  sx={{
                    color: "gray.500",
                    "&.Mui-selected": {
                      backgroundColor: "#080808 !important",
                      color: "white",
                    },
                  }}
                />
              </TabList>
            </Box>
            <TabPanel className="py-16 md:px-16 " value="1">
              <div className="py-10   w-full">
               <Login/>
              </div>
            </TabPanel>
            <TabPanel className="py-16 md:px-16 " value="2">
                  <Register />
            </TabPanel>
            <TabPanel className="py-6 md:px-16" value="3">
                  <ResetPassword/>
            </TabPanel>
          </TabContext>
        </Box>
      </MainContainer>
    </>
  );
}

export default UserDashboard;
