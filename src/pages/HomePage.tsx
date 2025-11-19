import React, { useState } from 'react';
import '../styles/theme.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { appScreens, pgOwnerLogos } from '../assets';
import { sectionPadding, cn } from '../common/utils/responsive';
import { useInViewAnimation } from '../hooks/useInViewAnimation';
import Carousel from '../components/Carousel';
import axios from 'axios';

function Hero(){
  const { ref, visible } = useInViewAnimation();
  return (
    <section id="home" className={`hero-gradient ${sectionPadding} pt-28 scroll-mt-24`}>
      <div className="container-max grid gap-10 lg:grid-cols-2 items-center">
        <div ref={ref as any} className={`reveal ${visible ? 'is-visible' : ''}`}>
          <span className="badge-primary">Manage PGs Effortlessly</span>
          <h1 className="section-title text-3xl sm:text-4xl lg:text-5xl mt-4">Run your PG like a pro</h1>
          <p className="mt-4 text-dark/80">Pgowner helps you manage guests, beds, payments, expenses, and issues in one simple app. Built for owners who value clarity and speed.</p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <a href="#download" className="btn-primary rounded-full px-6 py-3 text-center">Download App</a>
            <a href="#features" className="rounded-full px-6 py-3 border border-input text-dark hover:text-primary">See Features</a>
          </div>
          <div className="mt-6 flex items-center gap-4">
            <img src={pgOwnerLogos.round} alt="Pgowner logo" className="h-10 w-10 rounded-full"/>
            <p className="text-dark/70">Trusted by owners to keep rent collection and occupancy under control.</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 float-slow p-5 m-5">
          {appScreens.slice(0,2).map((src)=> (
            <img key={src} src={src} alt="App screen" className="rounded-xl shadow-md"/>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services(){
  const items = [
    { title: 'Guest Directory', desc: 'Keep full records with check-in/out, food prefs and contacts.' },
    { title: 'Bed & Room Occupancy', desc: 'Live occupancy, available vs occupied beds per room.' },
    { title: 'Payment Records', desc: 'Track rent, deposits, maintenance, refunds and dues.' },
    { title: 'Rent Plans', desc: 'Configure pricing across 1/2/3 sharing and daily plans.' },
    { title: 'Expense Tracking', desc: 'Visual analytics and monthly summaries.' },
    { title: 'Issue Management', desc: 'Capture and resolve room/service issues quickly.' },
  ];
  return (
    <section id="services" className={`${sectionPadding} scroll-mt-24`}>
      <div className="container-max">
        <h2 className="section-title text-3xl">Services</h2>
        <p className="mt-3 text-dark/80">Everything you need to operate your PG smoothly.</p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((i)=> {
            const { ref, visible } = useInViewAnimation();
            return (
              <div key={i.title} ref={ref as any} className={`card p-6 transition-transform duration-300 hover:-translate-y-1 reveal ${visible ? 'is-visible' : ''}`}>
                <h3 className="font-semibold text-tertiary text-lg">{i.title}</h3>
                <p className="mt-2 text-dark/80">{i.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Features(){
  const { ref, visible } = useInViewAnimation();
  const featureShots = appScreens.slice(4);
  return (
    <section id="features" className={`${sectionPadding} scroll-mt-24`}>
      <div className="container-max">
        <h2 className="section-title text-3xl">Features</h2>
        <p className="mt-3 text-dark/80">Swipe or let it auto-play. Screens from dashboard, guests, occupancy, issues, payments and more.</p>
        <div ref={ref as any} className={`mt-8 reveal ${visible ? 'is-visible' : ''}`}>
          <Carousel images={featureShots} heightClass="h-60 sm:h-72 lg:h-[48vh]" className="mx-auto max-w-6xl" bordered={false} />
        </div>
      </div>
    </section>
  );
}

function Download(){
  const { ref, visible } = useInViewAnimation();
  return (
    <section id="download" className={`bg-primary-soft ${sectionPadding} scroll-mt-24`}>
      <div ref={ref as any} className={`container-max text-center reveal ${visible ? 'is-visible' : ''}`}>
        <h2 className="section-title text-3xl">Download Pgowner</h2>
        <p className="mt-3 text-dark/80 max-w-2xl mx-auto">Start managing your PG today. Fast onboarding and simple interface.</p>
        <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
          <a target="_blank" href="https://play.google.com/store/apps/details?id=com.pgowner.jk" className="btn-primary rounded-full px-6 py-3">Get it on Android</a>
          {/* <a href="#" className="rounded-full px-6 py-3 border border-input text-dark hover:text-primary">Get it on iOS</a> */}
        </div>
      </div>
    </section>
  );
}

function Contact(){
  const left = useInViewAnimation();
  const right = useInViewAnimation();
  const [formData, setFormData] = useState({ name: '', email: '', mobile: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitStatus({ type: null, message: '' });
    setErrors({});

    try {
      setLoading(true);
      const { data } = await axios.post('https://api.pgowner.in/v1/pg-support/contact-us-web', formData);

      if (data?.success) {
        setSubmitStatus({ type: 'success', message: data.message || 'Your message has been received. We\'ll get back to you shortly.' });
        setFormData({ name: '', email: '', mobile: '', message: '' });
      } else {
        if (data?.errors) {
          setErrors(data.errors);
        }
        setSubmitStatus({ type: 'error', message: data?.message || 'Failed to send message. Please try again.' });
      }
    } catch (err: any) {
      const errMsg = err?.response?.data?.message || err?.message || 'Network error. Please try again.';
      if (err?.response?.data?.errors) {
        setErrors(err.response.data.errors);
      }
      setSubmitStatus({ type: 'error', message: errMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className={`${sectionPadding} scroll-mt-24`}>
      <div className="container-max grid gap-8 lg:grid-cols-2">
        <div ref={left.ref as any} className={`reveal ${left.visible ? 'is-visible' : ''}`}>
          <h2 className="section-title text-3xl">Contact Us</h2>
          <p className="mt-3 text-dark/80">Have questions or need a walkthrough? Send us a message.</p>
          <ul className="mt-4 text-dark/80 space-y-2">
            <li>Email: support@pgowner.in</li>
          </ul>
        </div>
        <form onSubmit={handleSubmit} ref={right.ref as any} className={`card p-6 grid gap-4 reveal ${right.visible ? 'is-visible' : ''}`}>
          <div>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={cn("border rounded-lg px-4 py-3 w-full", errors.name ? 'border-red-500' : 'border-input')}
              placeholder="Your name"
              disabled={loading}
            />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
          </div>
          <div>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={cn("border rounded-lg px-4 py-3 w-full", errors.email ? 'border-red-500' : 'border-input')}
              placeholder="Email"
              disabled={loading}
            />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
          </div>
          <div>
            <input
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className={cn("border rounded-lg px-4 py-3 w-full", errors.mobile ? 'border-red-500' : 'border-input')}
              placeholder="Mobile"
              disabled={loading}
            />
            {errors.mobile && <p className="text-xs text-red-500 mt-1">{errors.mobile}</p>}
          </div>
          <div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className={cn("border rounded-lg px-4 py-3 w-full h-28", errors.message ? 'border-red-500' : 'border-input')}
              placeholder="How can we help?"
              disabled={loading}
            />
            {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
          </div>
          {submitStatus.type && (
            <div className={cn("rounded-lg p-3 text-sm", submitStatus.type === 'success' ? 'bg-[var(--bgSuccess)] text-[var(--successDark)]' : 'bg-[var(--bgDanger)] text-[var(--dangerDark)]')}>
              {submitStatus.message}
            </div>
          )}
          <button
            type="submit"
            className={cn("btn-primary rounded-lg px-6 py-3 w-full sm:w-auto", loading && 'opacity-80 cursor-not-allowed')}
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </form>
      </div>
    </section>
  );
}

function About(){
  const { ref, visible } = useInViewAnimation();
  return (
    <section id="about" className={`${sectionPadding} scroll-mt-24`}>
      <div ref={ref as any} className={`container-max reveal ${visible ? 'is-visible' : ''}`}>
        <h2 className="section-title text-3xl">About Pgowner</h2>
        <p className="mt-3 text-dark/80 max-w-3xl">Pgowner is crafted for Indian PG owners to simplify daily operations end‑to‑end. It unifies guest onboarding, bed allocation, rent collection, deposits/refunds, expense tracking and issue resolution—so you always know who’s staying, what’s due and how your PG is performing.</p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="card p-6">
            <h3 className="font-semibold text-tertiary">Built for PG Workflows</h3>
            <p className="mt-2 text-dark/80">Designed around real‑world tasks like sharing‑based pricing, food preferences, room/bed occupancy and monthly settlements.</p>
          </div>
          <div className="card p-6">
            <h3 className="font-semibold text-tertiary">Fast & Clear</h3>
            <p className="mt-2 text-dark/80">Minimal taps, clean UI and quick search help you take actions faster—collect rent, view dues, update rooms and more.</p>
          </div>
          <div className="card p-6">
            <h3 className="font-semibold text-tertiary">Data Ownership</h3>
            <p className="mt-2 text-dark/80">All critical information stays organized and exportable when needed. Simple controls to add, edit and reconcile records.</p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          <div className="rounded-xl bg-primary-soft p-5 text-center">
            <div className="text-3xl font-extrabold text-primary">Minutes</div>
            <p className="mt-1 text-dark/70">to set up your first PG</p>
          </div>
          <div className="rounded-xl bg-successLight/30 p-5 text-center">
            <div className="text-3xl font-extrabold text-success">1‑tap</div>
            <p className="mt-1 text-dark/70">rent updates and receipts</p>
          </div>
          <div className="rounded-xl bg-warning/10 p-5 text-center">
            <div className="text-3xl font-extrabold text-warning">Clarity</div>
            <p className="mt-1 text-dark/70">on occupancy and pending dues</p>
          </div>
        </div>

        <p className="mt-8 text-dark/80 max-w-4xl">Our promise is a reliable, owner‑first tool that reduces manual work and errors. New capabilities like multi‑PG management, role‑based access and online payments are part of the upcoming roadmap.</p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className="card p-6">
            <h3 className="font-semibold text-tertiary">Why PG owners choose Pgowner</h3>
            <ul className="mt-2 list-disc pl-5 text-dark/80 space-y-2">
              <li>Clear occupancy and dues—no spreadsheets to reconcile.</li>
              <li>Sharing‑wise pricing that fits 1/2/3+ sharing models.</li>
              <li>Rent, deposit, maintenance and refunds tracked together.</li>
              <li>Simple search and filters to find guests, rooms and payments fast.</li>
            </ul>
          </div>
          <div className="card p-6">
            <h3 className="font-semibold text-tertiary">Security & Privacy</h3>
            <ul className="mt-2 list-disc pl-5 text-dark/80 space-y-2">
              <li>Owner controls who can view and update data.</li>
              <li>Data organized for quick export and backup when required.</li>
              <li>Activity designed to avoid accidental edits and duplicates.</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 grid gap-6">
          <div className="card p-6">
            <h3 className="font-semibold text-tertiary">FAQ</h3>
            <div className="mt-3 space-y-3 text-dark/80">
              <div>
                <p className="font-medium text-tertiary">Can I manage multiple PGs?</p>
                <p className="mt-1">Yes. Create each PG, add rooms/beds and switch between them. Multi‑PG reporting is on the roadmap.</p>
              </div>
              <div>
                <p className="font-medium text-tertiary">How do refunds and deposits work?</p>
                <p className="mt-1">Record security deposits, link them to guests and mark refunds when they move out. The balance adjusts instantly.</p>
              </div>
              <div>
                <p className="font-medium text-tertiary">Is it mobile friendly?</p>
                <p className="mt-1">Absolutely. The interface is optimized for phones and desktops so owners can manage on the go.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage(){
  return (
    <div className="text-tertiary">
      <Navbar/>
      <main>
        <Hero/>
        <Services/>
        <Features/>
        <Download/>
        <Contact/>
        <About/>
      </main>
      <Footer/>
    </div>
  );
}
