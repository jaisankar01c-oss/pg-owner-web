import React from 'react';
import '../styles/theme.css';

export default function Footer(){
  return (
    <footer className="bg-primary-soft mt-20">
      <div className="container-max px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h4 className="font-bold text-tertiary mb-3">Pgowner</h4>
            <p className="text-dark/70">Simple PG management for owners. Track guests, rooms, payments, expenses and more.</p>
          </div>
          <div>
            <h5 className="font-semibold text-tertiary mb-2">Product</h5>
            <ul className="space-y-2 text-dark/80">
              <li><a href="#features" className="hover:text-primary">Features</a></li>
              <li><a href="#download" className="hover:text-primary">Download</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-tertiary mb-2">Company</h5>
            <ul className="space-y-2 text-dark/80">
              <li><a href="#about" className="hover:text-primary">About</a></li>
              <li><a href="#contact" className="hover:text-primary">Contact</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-tertiary mb-2"><a href="/legal" className="hover:text-primary">Legal</a></h5>
            <ul className="space-y-2 text-dark/80">
              <li><a href="/privacy" className="hover:text-primary">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-primary">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-input mt-8 pt-6 text-sm text-dark/70 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>© {new Date().getFullYear()} Pgowner. All rights reserved.</span>
          <span>Made with ♥ for PG Owners</span>
        </div>
      </div>
    </footer>
  );
}
