
import Navbar from './../components/Navbar/navbar';
const Layout = ({children}) => {
  return (
    <div>
        <Navbar/>
        {children}
    </div>
  )
}

export default Layout