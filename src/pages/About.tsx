import React from 'react';
import '../styles/theme.css';
import { sectionPadding } from '../common/utils/responsive';

export default function About(){
  return (
    <section className={sectionPadding}>
      <div className="container-max">
        <h1 className="section-title text-3xl">About</h1>
        <p className="mt-3 text-dark/80 max-w-3xl">Pgowner is a mobile-first tool that streamlines PG operations: onboarding guests, tracking beds, collecting rent, reconciling payments, managing issues and analysing expenses. The website uses the same theme colors to keep branding consistent.</p>
      </div>
    </section>
  );
}
