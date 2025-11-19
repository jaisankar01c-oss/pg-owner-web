import React from 'react';
import '../styles/theme.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { sectionPadding } from '../common/utils/responsive';

export default function Legal(){
  return (
    <div className="text-tertiary">
      <Navbar/>
      <main className="pt-24">
        <section className={`${sectionPadding}`}>
          <div className="container-max">
            <h1 className="section-title text-3xl">Legal</h1>
            <p className="mt-3 text-dark/80 max-w-3xl">Read our Terms and Conditions and Privacy Policy to understand how Pgowner operates and protects your data.</p>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <a href="/terms" className="card p-6 block hover:shadow-lg transition-shadow">
                <h2 className="font-semibold text-tertiary">Terms and Conditions</h2>
                <p className="mt-2 text-dark/80">Usage guidelines, payment terms, service changes and limitations of liability.</p>
              </a>
              <a href="/privacy" className="card p-6 block hover:shadow-lg transition-shadow">
                <h2 className="font-semibold text-tertiary">Privacy Policy</h2>
                <p className="mt-2 text-dark/80">What data we collect, how we use it, your choices and how to contact us.</p>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer/>
    </div>
  );
}
