import React from 'react';
import { Home, Compass, PlaySquare, Youtube, User } from 'lucide-react';
import { useSelector } from 'react-redux';

const BottomNavbar = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border py-2 md:py-3 lg:hidden">
      <div className="max-w-screen-xl mx-auto px-4">
        <ul className="flex justify-between items-center">
          <NavItem icon={<Home size={24} />} label="Home" />
          <NavItem icon={<PlaySquare size={24} />} label="Shorts" />
          <NavItem icon={<Youtube size={24} />} label="Subscriptions" />
          <NavItem icon={<User size={24} />} label="You" />
        </ul>
      </div>
    </nav>
  );
};

const NavItem = ({ icon, label }) => {
  return (
    <li className="flex flex-col items-center">
      <button className="p-1 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors duration-200">
        {icon}
      </button>
      <span className="text-xs mt-1 text-muted-foreground">{label}</span>
    </li>
  );
};

export default BottomNavbar;