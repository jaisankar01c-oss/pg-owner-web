import React from 'react';
import '../styles/theme.css';
import { sectionPadding } from '../common/utils/responsive';

export default function Download(){
  return (
    <section className={`bg-primary-soft ${sectionPadding}`}>
      <div className="container-max text-center">
        <h1 className="section-title text-3xl">Download</h1>
        <p className="mt-3 text-dark/80">Grab the Pgowner app and start managing your PG instantly.</p>
        <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
          <a target="_blank" href="https://play.google.com/store/apps/details?id=com.pgowner.jk" className="btn-primary rounded-full px-6 py-3">Get it on Android</a>
          {/* <a href="#" className="rounded-full px-6 py-3 border border-input text-dark hover:text-primary">Get it on iOS</a> */}
        </div>
      </div>
    </section>
  );
}
