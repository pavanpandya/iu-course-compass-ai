import { FC } from "react";
import { Link } from "react-router-dom";

const Footer: FC = () => {
  return (
    <footer className="bg-iu-gray text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">IU Course Compass</h3>
            <p className="text-sm opacity-80">
              An AI-powered course selection assistant for Indiana University Bloomington students.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-sm uppercase mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link to="https://studentcentral.indiana.edu/" className="text-sm opacity-80 hover:opacity-100">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="https://studentcentral.indiana.edu/calendar/official-calendar/index.html" className="text-sm opacity-80 hover:opacity-100">
                  Academic Calendar
                </Link>
              </li>
              <li>
                <Link to="https://registrar.indiana.edu/" className="text-sm opacity-80 hover:opacity-100">
                  Office of Registrar
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-sm uppercase mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link to="https://studentcentral.indiana.edu/" className="text-sm opacity-80 hover:opacity-100">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="https://uits.iu.edu/" className="text-sm opacity-80 hover:opacity-100">
                  Contact UITS
                </Link>
              </li>
              <li>
                <Link to="https://accessibility.iu.edu/assistance/index.html?_gl=1*1h39ndz*_ga*NTQ4MzY2MTI2LjE3MzcxODExNTc.*_ga_61CH0D2DQW*MTc0MzkwNzAxMS4xNC4xLjE3NDM5MDcwMjAuNTEuMC4w*_gcl_au*MjE0NTQ5NDcyNS4xNzM4NzgwODg1" className="text-sm opacity-80 hover:opacity-100">
                  Accessibility
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-sm uppercase mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link to="https://studentcentral.indiana.edu/privacy/" className="text-sm opacity-80 hover:opacity-100">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="https://policies.iu.edu/?_gl=1*1fjyqex*_ga*NTQ4MzY2MTI2LjE3MzcxODExNTc.*_ga_61CH0D2DQW*MTc0MzkwNjU5My4yNS4xLjE3NDM5MDcyMDMuMzQuMC4w*_gcl_au*MjE0NTQ5NDcyNS4xNzM4NzgwODg1*_ga_SHT4W9QCV3*MTc0MzkwNjYxMS4yLjEuMTc0MzkwNzE5OC4zOS4wLjQ1Njk3MzE1NQ.." className="text-sm opacity-80 hover:opacity-100">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link to="https://accessibility.iu.edu/assistance/index.html?_gl=1*1h39ndz*_ga*NTQ4MzY2MTI2LjE3MzcxODExNTc.*_ga_61CH0D2DQW*MTc0MzkwNzAxMS4xNC4xLjE3NDM5MDcwMjAuNTEuMC4w*_gcl_au*MjE0NTQ5NDcyNS4xNzM4NzgwODg1" className="text-sm opacity-80 hover:opacity-100">
                  Accessibility Statement
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-8 pt-6 text-center text-sm opacity-70">
          <p>© {new Date().getFullYear()} Indiana University. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
