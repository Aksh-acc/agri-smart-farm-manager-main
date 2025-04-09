
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Sun, Moon, Leaf, LogIn } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Check system preference for dark mode
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);
    if (prefersDark) document.documentElement.classList.add('dark');
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'Crop Recommendation', path: '/crop-recommendation' },
    { title: 'Fertilizer Recommendation', path: '/fertilizer-recommendation' },
    { title: 'Disease Detection', path: '/disease-detection' },
    { title: 'About Us', path: '/about' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 dark:bg-card/80 backdrop-blur-sm shadow-sm' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-primary-600 rounded-full p-1">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-heading font-bold">AgriWise</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path}
                className="text-foreground hover:text-primary-600 transition-colors font-medium"
              >
                {link.title}
              </Link>
            ))}
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost" 
                size="icon" 
                onClick={toggleDarkMode}
                className="rounded-full"
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Link to="/login">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full flex items-center gap-1"
                >
                  <LogIn className="h-4 w-4" />
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button
                  size="sm"
                  className="rounded-full"
                >
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile Navigation Button */}
          <div className="flex items-center md:hidden">
            <Button
              variant="ghost" 
              size="icon" 
              onClick={toggleDarkMode}
              className="rounded-full mr-2"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button
              variant="ghost" 
              size="icon" 
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-full"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-background dark:bg-card animate-fade-in border-t border-border">
          <div className="container mx-auto px-4 py-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block py-3 text-foreground hover:text-primary-600 transition-colors font-medium border-b border-border"
              >
                {link.title}
              </Link>
            ))}
            <div className="flex flex-col gap-2 py-3">
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block py-3 text-foreground hover:text-primary-600 transition-colors font-medium"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                onClick={() => setIsOpen(false)}
                className="block py-3 text-foreground hover:text-primary-600 transition-colors font-medium"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
