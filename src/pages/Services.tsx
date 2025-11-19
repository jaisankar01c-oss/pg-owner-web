import React from 'react';
import '../styles/theme.css';
import { sectionPadding } from '../common/utils/responsive';

export default function Services(){
  return (
    <section className={sectionPadding}>
      <div className="container-max">
        <h1 className="section-title text-3xl">Services</h1>
        <p className="mt-4 text-dark/80">Guest directory, occupancy status, room management, issue tracking, payment records, rent management and expense tracking.</p>
      </div>
    </section>
  );
}
