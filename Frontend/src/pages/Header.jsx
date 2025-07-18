import { useContext, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import { RxExit } from 'react-icons/rx';
import { BsFillCaretDownFill } from 'react-icons/bs';

export default function Header() {
  const { user, setUser } = useContext(UserContext);
  const [isMenuOpen, setisMenuOpen] = useState(false);

  async function logout() {
    await axios.post('/logout');
    setUser(null);
  }

  return (
    <div>
      <header className="flex py-4 px-6 justify-between items-center bg-white shadow-md">
        {/* Left: Website Logo */}
        <div className="text-2xl font-bold text-primary tracking-wide">
          <Link to="/">EventoSphere</Link>
        </div>

        {/* Center: Navigation */}
        <nav className="hidden lg:flex gap-10 text-lg font-semibold text-gray-800">
          <Link to="/" className="hover:text-primarydark transition">Home</Link>
          <Link to="/about" className="hover:text-primarydark transition">About</Link>
          <Link to="/features" className="hover:text-primarydark transition">Features</Link>
          <Link to="/contact" className="hover:text-primarydark transition">Contact</Link>
          <Link to="/admin" className="hover:text-primarydark transition">
  Admin
</Link>
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-6">
          {user && (
            <Link to={'/createEvent'}>
              <div className='hidden md:flex flex-col place-items-center py-1 px-2 rounded text-primary cursor-pointer hover:text-primarydark hover:bg-white hover:shadow-sm shadow-gray-200 hover:transition-shadow duration-1500'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 stroke-3 py-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                <div className='font-bold text-sm'>Create Event</div>
              </div>
            </Link>
          )}

          {user && (
            <div className='hidden lg:flex gap-5 text-sm'>
              <Link to={'/wallet'}>
                <div className='flex flex-col place-items-center py-1 px-3 rounded cursor-pointer hover:text-primarydark hover:bg-white hover:shadow-sm'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 py-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
                  </svg>
                  <div>Wallet</div>
                </div>
              </Link>

              <Link to={'/calendar'}>
                <div className='flex flex-col place-items-center py-1 px-3 rounded cursor-pointer hover:text-primarydark hover:bg-white hover:shadow-sm'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 py-1">
                    <path d="..." /> {/* Keep your calendar icon path here */}
                  </svg>
                  <div>Calendar</div>
                </div>
              </Link>
            </div>
          )}

          {!!user ? (
            <div className="flex flex-row items-center gap-2 sm:gap-6">
              <div className="flex items-center gap-2">
                <Link to={'/useraccount'}>{user.name.toUpperCase()}</Link>
                <BsFillCaretDownFill className="h-5 w-5 cursor-pointer hover:rotate-180 transition-all" onClick={() => setisMenuOpen(!isMenuOpen)} />
              </div>
              <button onClick={logout} className="secondary hidden md:flex items-center gap-2">
                <span>Log out</span>
                <RxExit />
              </button>
            </div>
          ) : (
            <Link to="/login">
              <button className="text-white bg-primary px-4 py-1 rounded hover:bg-primarydark">Sign in</button>
            </Link>
          )}
        </div>

        {/* Mobile Dropdown */}
        {!!user && isMenuOpen && (
          <div className="absolute z-10 mt-64 flex flex-col w-48 bg-white right-2 md:right-[160px] rounded-lg shadow-lg">
            <nav className="flex flex-col font-semibold text-[16px]">
              <Link className="hover:bg-background py-2 px-6" to={'/createEvent'}>Create Event</Link>
              <Link className="hover:bg-background py-2 px-6" to={'/wallet'}>Wallet</Link>
              <Link className="hover:bg-background py-2 px-6" to={'/calendar'}>Calendar</Link>
              <button onClick={logout} className="text-left hover:bg-background py-2 px-6">Log out</button>
            </nav>
          </div>
        )}
      </header>
    </div>
  );
}
