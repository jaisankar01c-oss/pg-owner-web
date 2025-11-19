import React from 'react';
import '../styles/theme.css';
import { sectionPadding } from '../common/utils/responsive';

export default function Contact(){
  return (
    <section className={sectionPadding}>
      <div className="container-max grid gap-8 lg:grid-cols-2">
        <div>
          <h1 className="section-title text-3xl">Contact Us</h1>
          <p className="mt-3 text-dark/80">Write to us for onboarding and product questions.</p>
        </div>
        <form className="card p-6 grid gap-4">
          <input className="border border-input rounded-lg px-4 py-3" placeholder="Your name" />
          <input className="border border-input rounded-lg px-4 py-3" placeholder="Email" />
          <input className="border border-input rounded-lg px-4 py-3" placeholder="Mobile" />
          <textarea className="border border-input rounded-lg px-4 py-3 h-28" placeholder="Message" />
          <button className="btn-primary rounded-lg px-6 py-3 w-full sm:w-auto">Send</button>
        </form>
      </div>
    </section>
  );
}
