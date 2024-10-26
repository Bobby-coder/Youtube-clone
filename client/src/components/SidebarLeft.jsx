import React, { useState } from 'react';
import NavItem from './NavItem';
import { Home, Compass, PlaySquare, Music, User, History, Clock, ThumbsUp, Download, Film, Flame, ShoppingBag, Gamepad, Newspaper, Trophy, GraduationCap, Scissors, Radio, Settings, HelpCircle, Flag } from 'lucide-react';

const Sidebar = ({ isOpen, onClose, isExpanded, setIsExpanded }) => {
  const collapsedItems = [
    { icon: Home, label: 'Home' },
    { icon: PlaySquare, label: 'Shorts' },
    { icon: Compass, label: 'Subscriptions' },
    { icon: User, label: 'You' },
    { icon: History, label: 'History' },
  ];

  const expandedItems = [
    { 
      header: 'Home',
      items: [
        { icon: Home, label: 'Home' },
        { icon: PlaySquare, label: 'Shorts' },
        { icon: Compass, label: 'Subscriptions' },
        { icon: Music, label: 'YouTube Music' },
      ]
    },
    {
      header: 'You',
      items: [
        { icon: User, label: 'Your channel' },
        { icon: History, label: 'History' },
        { icon: Film, label: 'Your videos' },
        { icon: Clock, label: 'Watch later' },
        { icon: ThumbsUp, label: 'Liked videos' },
        { icon: Download, label: 'Downloads' },
        { icon: Scissors, label: 'Your clips' },
      ]
    },
    {
      header: 'Subscriptions',
      items: [
        { icon: Compass, label: 'Show more' },
      ]
    },
    {
      header: 'Explore',
      items: [
        { icon: Flame, label: 'Trending' },
        { icon: ShoppingBag, label: 'Shopping' },
        { icon: Music, label: 'Music' },
        { icon: Film, label: 'Movies' },
        { icon: Radio, label: 'Live' },
        { icon: Gamepad, label: 'Gaming' },
        { icon: Newspaper, label: 'News' },
        { icon: Trophy, label: 'Sports' },
        { icon: GraduationCap, label: 'Courses' },
        { icon: Scissors, label: 'Fashion & Beauty' },
        { icon: Radio, label: 'Podcasts' },
      ]
    },
    {
      header: 'More from YouTube',
      items: [
        { icon: PlaySquare, label: 'YouTube Studio' },
        { icon: Music, label: 'YouTube Music' },
        { icon: User, label: 'YouTube Kids' },
        { icon: Settings, label: 'Settings' },
        { icon: Flag, label: 'Report history' },
        { icon: HelpCircle, label: 'Help' },
        { icon: Flag, label: 'Send feedback' },
      ]
    },
  ];

  const NavItem = ({ Icon, label, isExpanded }) => (
    <li className={`flex items-center p-2 hover:bg-button-hover cursor-pointer ${isExpanded ? 'justify-start' : 'flex-col justify-center'}`}>
      <Icon size={24} />
      <span className={isExpanded ? 'ml-4' : 'mt-1 text-xs'}>{label}</span>
    </li>
  );

  const ExpandedSection = ({ header, items }) => (
    <div className="mb-4">
      <h3 className="font-bold mb-2 px-2">{header}</h3>
      <ul>
        {items.map((item, index) => (
          <NavItem key={index} Icon={item.icon} label={item.label} isExpanded={true} />
        ))}
      </ul>
    </div>
  );

  return (
    <div
      className={`fixed top-14 left-0 h-full bg-background text-text ease-linear hidden lg:block overflow-y-auto custom-scrollbar
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        ${isExpanded ? 'w-52' : 'w-20'} z-50`}
    >
      <nav className="p-2">
        {isExpanded ? (
          expandedItems.map((section, index) => (
            <ExpandedSection key={index} header={section.header} items={section.items} />
          ))
        ) : (
          <ul>
            {collapsedItems.map((item, index) => (
              <NavItem key={item.label} Icon={item.icon} label={item.label} isExpanded={false} />
            ))}
          </ul>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;

