'use client'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useSession } from "next-auth/react"
import { signOut } from 'next-auth/react'
import { makeStyles} from '@material-ui/core';
;
import { useTheme, useMediaQuery } from '@mui/material';
import { useState } from 'react';
import MainContainer from '@/app/components/layout/mainContainer';
import Link from 'next/link';
const useStyles = makeStyles((theme) => ({
 
  tabs: {
    borderRight: `1px solid red`,
  },
}));
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}
function MyAccount() {

  const isMobile = useMediaQuery('(max-width:1000px)');;
  const classes = useStyles()
  const { data: session, status } = useSession()
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleSignOut = async () => {
    await signOut({ redirect: false }) 
  }
  if (status === "authenticated") {
    return(
      <MainContainer>

      <Box
      sx={{
        flexGrow: isMobile ? 0 : 1,
        bgcolor: 'white',
        display: isMobile ? 'block' : 'flex',
        gap: 5,
        height: 600
      }}
    >
   
      <div className={`${isMobile ? 'w-full' : 'w-1/4'}`}>
    <div className='text-center mb-2 p-5'>
      <img className='mx-auto w-[90px] h-[90px] object-cover  mb-4 rounded-full' src="/images/user.png" alt="Image" />
      <h4 className='mb-2 text-black text-2xl font-bold'>Hello</h4>
      <h5 className='text-gray-500 text-sm '> {session.user.name}</h5>
    </div>
    <Tabs
      orientation={isMobile ? 'horizontal' : 'vertical'}
      value={value}
      onChange={handleChange}
      aria-label="Vertical tabs example"
      sx={{ borderRight: 2, borderColor: 'divider', width: '100%' , '& .MuiButtonBase-root': {
        fontSize: '12px', 
      },}}
      className={`p-5 ${classes} `}
      variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            TabIndicatorProps={{ style: { backgroundColor: "black" } }}
    >
      <Tab className={`text-gray-500 ${
                value === 0 ? "tap-selected  !text-black font-bold " : ""
              }`} label="Dashboard" {...a11yProps(0)}  />
        <Tab className={`text-gray-500  ${
                value === 1 ? "tap-selected  !text-black font-bold " : ""
              }`} label="Orders" {...a11yProps(1)} />
  
      
        <Tab onClick={handleSignOut} className={`text-gray-500  ${
                value === 2 ? "tap-selected  !text-black font-bold " : ""
              }`} label="Logout" {...a11yProps(2)} />
    </Tabs>
  </div>
  <div className='w-3/4'>
        <TabPanel value={value} index={0} >
          <div className='p-10 ' dangerouslySetInnerHTML={{ __html: `
            <div >
              <h6>
                Hello ${session.user.name} (not  ${session.user.email}? <strong>Log out </strong> )
              </h6>
              <p>
                From your account dashboard you can view your recent orders, manage your shipping and billing addresses, and edit your password and account details.
              </p>
            </div>
          `}} />
          
        </TabPanel>
      <TabPanel value={value} index={1}>
      <div className='p-10' dangerouslySetInnerHTML={{ __html: `
            <div class="w-full p-5 flex justify-between border-2 border-gray-300">
            <h6 class='my-auto'>
            No order has been made yet.
  
              </h6>
              <button class="text-center px-5 bg-black text-white py-2    text-sm hover:bg-gray-700 transition duration-200  lg:mb-0 mb-3">
              <Link href='shop'>
              RETURN TO SHOPPING
              </Link>
              </button>
            </div>
          `}} />
      </TabPanel>
  
      </div>
    </Box>
    </MainContainer>
  )}


  return (
       <MainContainer>
  <div className="text-center">
           
           <h4 className="my-10 text-black font-bold text-3xl text-center">You are not Sign in  </h4>
           <button className="text-center px-5 bg-black text-white py-2   md:text-lg text-sm hover:bg-gray-700 transition duration-200  lg:mb-0 mb-3">
               <Link href='user-dashboard'>
              Login
               </Link>
               
               </button>
    </div>
      </MainContainer>
  )
}

export default MyAccount
