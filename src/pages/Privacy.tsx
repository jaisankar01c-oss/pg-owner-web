import React from 'react';
import '../styles/theme.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { sectionPadding } from '../common/utils/responsive';

export default function Privacy(){
  return (
    <div className="text-tertiary">
      <Navbar/>
      <main className="pt-24">
        <section className={`${sectionPadding}`}>
          <div className="container-max">
            <h1 className="section-title text-3xl">Privacy Policy</h1>
            <p className="mt-3 text-dark/80 max-w-3xl">Your privacy matters. This policy explains what data Pgowner collects, how it is used, and your choices.</p>

            <div className="mt-6 grid gap-6">
              <div className="card p-6">
                <h2 className="font-semibold text-tertiary">1. Information We Collect</h2>
                <p className="mt-2 text-dark/80">Profile details (name, email), PG records (rooms, beds), guest information, and transaction data that you enter to manage operations.</p>
              </div>
              <div className="card p-6">
                <h2 className="font-semibold text-tertiary">2. How We Use Data</h2>
                <p className="mt-2 text-dark/80">To provide core features like occupancy tracking, payment records, analytics and backups. Data is never sold.</p>
              </div>
              <div className="card p-6">
                <h2 className="font-semibold text-tertiary">3. Data Sharing</h2>
                <p className="mt-2 text-dark/80">We may share data with service providers strictly to operate the app (e.g., hosting). They must follow confidentiality and security obligations.</p>
              </div>
              <div className="card p-6">
                <h2 className="font-semibold text-tertiary">4. Security</h2>
                <p className="mt-2 text-dark/80">We use industry-standard security practices to protect data in transit and at rest. No method is 100% secure, but we continually improve safeguards.</p>
              </div>
              <div className="card p-6">
                <h2 className="font-semibold text-tertiary">5. Your Choices</h2>
                <p className="mt-2 text-dark/80">You can access, update or export your data. Contact support to request deletion where applicable.</p>
              </div>
              <div className="card p-6">
                <h2 className="font-semibold text-tertiary">6. Contact</h2>
                <p className="mt-2 text-dark/80">For privacy questions, reach us at support@pgowner.in</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer/>
    </div>
  );
}
