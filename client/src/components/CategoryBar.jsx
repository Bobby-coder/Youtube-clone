import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../redux/filterSlice';

const categories = [
    'All', "music", "gaming", "news", "sports", "technology", "education", "entertainment","comedy", "other", 'Live', 'Fashion', 'Spotlight', 'Travel', 'Food', "New to you", "Trending", "For you", "Following", "Popular", "More"
];

const HorizontalScroll = () => {
    const scrollContainerRef = useRef(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);

    const dispatch = useDispatch();
    const filterCategory = useSelector((state) => state.filter.filterCategory);
    const scroll = (direction) => {
        const container = scrollContainerRef.current;
        if (container) {
            const scrollAmount = container.offsetWidth * 0.8;
            container.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const handleScroll = () => {
        const container = scrollContainerRef.current;
        if (container) {
            setShowLeftArrow(container.scrollLeft > 0);
            setShowRightArrow(
                container.scrollLeft < container.scrollWidth - container.offsetWidth
            );
        }
    };

    return (
        <div className="relative top-[70px] max-w-screen-xl mx-auto px-4 text-foreground z-50">
            <div
                className="flex items-center space-x-4 overflow-x-auto scrollbar-hidden"
                ref={scrollContainerRef}
                onScroll={handleScroll}
            >
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => dispatch(setFilter(category.toLowerCase()))}
                        className={`flex-shrink-0 text-sm px-2 py-1 bg-button-bg border border-border rounded-lg hover:bg-button-hover transition-colors ${category.toLowerCase() == filterCategory.toLowerCase() ? "bg-neutral-900 text-white hover:bg-neutral-900 dark:bg-neutral-100 dark:text-black dark:hover:bg-neutral-100" : ""}`}
                    >
                        {category}
                    </button>
                ))}
            </div>
            {showLeftArrow && (
                <button
                    onClick={() => scroll('left')}
                    className="absolute -left-10 top-1/2 transform -translate-y-1/2 bg-background border border-border hover:bg-button-bg p-2 rounded-full shadow-md lg:block hidden"
                >
                    <ChevronLeft size={24} />
                </button>
            )}
            {showRightArrow && (
                <button
                    onClick={() => scroll('right')}
                    className="absolute -right-10 top-1/2 transform -translate-y-1/2 bg-background border border-border hover:bg-button-bg p-2 rounded-full shadow-md lg:block hidden"
                >
                    <ChevronRight size={24} />
                </button>
            )}
        </div>
    );
};

export default HorizontalScroll;
