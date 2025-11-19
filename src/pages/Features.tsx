import React from 'react';
import '../styles/theme.css';
import { appScreens } from '../assets';
import { sectionPadding } from '../common/utils/responsive';

export default function Features(){
  return (
    <section className={sectionPadding}>
      <div className="container-max">
        <h1 className="section-title text-3xl">Features</h1>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {appScreens.slice(0,9).map((s)=> (
            <img key={s} src={s} alt="Feature" className="rounded-xl shadow-md"/>
          ))}
        </div>
      </div>
    </section>
  );
}
