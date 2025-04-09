
import { Link } from 'react-router-dom';
import { Leaf, Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-50 dark:bg-muted border-t border-border mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div>
            <div className="flex items-center space-x-2">
              <div className="bg-primary-600 rounded-full p-1">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-heading font-bold">AgriWise</span>
            </div>
            <p className="mt-4 text-muted-foreground">
              Empowering farmers with intelligent crop management, fertilizer recommendation, and plant disease detection through modern agricultural technology.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="https://github.com" aria-label="Github" className="text-muted-foreground hover:text-primary-600 transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary-600 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" aria-label="Twitter" className="text-muted-foreground hover:text-primary-600 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/crop-recommendation" className="text-muted-foreground hover:text-primary-600 transition-colors">
                  Crop Recommendation
                </Link>
              </li>
              <li>
                <Link to="/fertilizer-recommendation" className="text-muted-foreground hover:text-primary-600 transition-colors">
                  Fertilizer Recommendation
                </Link>
              </li>
              <li>
                <Link to="/disease-detection" className="text-muted-foreground hover:text-primary-600 transition-colors">
                  Disease Detection
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary-600 transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary-600 mt-0.5" />
                <span className="text-muted-foreground">123 Farming Avenue, Agriville, AG 12345</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary-600" />
                <span className="text-muted-foreground">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary-600" />
                <span className="text-muted-foreground">info@agriwise.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-10 pt-6 text-center text-muted-foreground">
          <p>&copy; {currentYear} AgriWise. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
