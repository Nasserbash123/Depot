'use client'
import MainHeader from "./mainHeader";
import Footer from "./footer";
import BackToTopButton from "../widgets/BackToTopButton";
import Loader from "../widgets/loader";
import { AnimatePresence ,motion} from 'framer-motion';
import { usePathname  } from "next/navigation";
function Layout(props) {
  const router = usePathname()
  return (
    <AnimatePresence mode="wait">
        <Loader/>
        <motion.div
        key={router}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <MainHeader/>
        <main>
            {props.children}
        </main>
        <BackToTopButton/>
        <Footer/>
        </motion.div>
    </AnimatePresence>
  )
}

export default Layout