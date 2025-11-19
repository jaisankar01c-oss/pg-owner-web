import React from 'react';
import '../styles/theme.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { sectionPadding } from '../common/utils/responsive';

export default function Terms(){
  return (
    <div className="text-tertiary">
      <Navbar/>
      <main className="pt-24">
        <section className={`${sectionPadding}`}>
          <div className="container-max">
            <h1 className="section-title text-3xl">Terms and Conditions</h1>
            <p className="mt-3 text-dark/80 max-w-3xl">These Terms and Conditions ("Terms") govern your use of the Pgowner mobile app and website. By creating an account or accessing the services, you agree to these Terms.</p>

            <div className="mt-6 grid gap-6">
              <div className="card p-6">
                <h2 className="font-semibold text-tertiary">1. Account & Access</h2>
                <p className="mt-2 text-dark/80">You are responsible for maintaining the confidentiality of your account and for all activities under your account. Provide accurate information and update it when necessary.</p>
              </div>
              <div className="card p-6">
                <h2 className="font-semibold text-tertiary">2. Acceptable Use</h2>
                <p className="mt-2 text-dark/80">Use Pgowner to manage PG operations lawfully. Do not misuse the service, attempt unauthorized access, or upload harmful content.</p>
              </div>
              <div className="card p-6">
                <h2 className="font-semibold text-tertiary">3. Payments & Refunds</h2>
                <p className="mt-2 text-dark/80">Any subscription fees are charged per the plan selected. Refunds for subscription fees are handled according to our refund policy, where applicable.</p>
              </div>
              <div className="card p-6">
                <h2 className="font-semibold text-tertiary">4. Data Ownership</h2>
                <p className="mt-2 text-dark/80">You own the data you input, such as guest details and transactions. Pgowner may process this data to provide features like analytics and backups.</p>
              </div>
              <div className="card p-6">
                <h2 className="font-semibold text-tertiary">5. Service Changes</h2>
                <p className="mt-2 text-dark/80">We may update features, fix bugs, or make changes that improve reliability and security. We will attempt to minimize disruption.</p>
              </div>
              <div className="card p-6">
                <h2 className="font-semibold text-tertiary">6. Limitation of Liability</h2>
                <p className="mt-2 text-dark/80">Pgowner is provided "as is". To the maximum extent permitted by law, Pgowner is not liable for indirect or incidental damages resulting from use of the service.</p>
              </div>
              <div className="card p-6">
                <h2 className="font-semibold text-tertiary">7. Contact</h2>
                <p className="mt-2 text-dark/80">Questions? Contact us at support@pgowner.in</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer/>
    </div>
  );
}
