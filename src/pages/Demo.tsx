import React from 'react';
import '../styles/theme.css';
import { sectionPadding } from '../common/utils/responsive';

export default function Demo(){
  return (
    <section className={sectionPadding}>
      <div className="container-max">
        <h1 className="section-title text-3xl">Demo</h1>
        <p className="mt-3 text-dark/80">Explore the dashboard, guests list, bed occupancy, payment records, rent plans and expense analytics in the screenshots provided on the Home page.</p>
      </div>
    </section>
  );
}
