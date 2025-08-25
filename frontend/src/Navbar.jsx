import { Link } from "react-router-dom";

 const Navbar = () => {
   return (
     <nav>
       <ul>
         <li>
           <Link to="/">LandingPage</Link>
         </li>
         <li>
           <Link to="/signin">Signin</Link>
         </li>
         <li>
           <Link to="/signup">Signup</Link>
         </li>
         <li>
           <Link to="/home">Home</Link>
          </li>
          <li>
           <Link to="/updates">Updates</Link>
          </li>
           <li>
           <Link to="/analytics">Analytics</Link>
          </li>
           <li>
           <Link to="/profile">Profile</Link>
          </li>
       </ul>
     </nav>
   );
 }

 export default Navbar;