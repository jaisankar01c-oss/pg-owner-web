import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/theme.css";
import { cn } from "../common/utils/responsive";

type PGData = {
  pg: {
    pg_id: string;
    pg_name: string;
    pg_type: "boys" | "girls" | "co_living";
    allowed_guest_type: "daywise" | "monthly" | "both";
    stay_type: "with_food" | "without_food" | "both";
    food_type: "veg" | "non_veg" | "both";
    facilities: string[];
    address: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
    location_url: string;
  };
  owner: {
    owner_id: string;
    name: string;
    email: string;
    mobile: string;
    gender: string;
  };
  rent_details: Array<{
    id: number;
    sharingType: number;
    monthlyRent: string;
    dailyRent: string;
  }>;
};

type ApiResponse = {
  success: boolean;
  message: string;
  data: PGData | null;
};

export default function PGDetails() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState<PGData | null>(null);

  // Extract pgId from URL
  const searchParams = new URLSearchParams(window.location.search);
  const pgId = searchParams.get("id") || "NoPGId";

  useEffect(() => {
    const fetchPGDetails = async () => {
      try {
        setLoading(true);
        setError(false);
        const { data: response } = await axios.get<ApiResponse>(
          `https://api.pgowner.in/v1/pg/get-pg-details-web/${pgId}`
        );
        if (response?.success && response.data) {
          setData(response.data);
        } else {
          setError(true);
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (pgId) {
      fetchPGDetails();
    }
  }, [pgId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[var(--bgPrimary)] via-white to-[var(--bgPrimaryLight)] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin">
            <div className="h-12 w-12 rounded-full border-4 border-[var(--primary)] border-t-transparent" />
          </div>
          <p className="mt-4 text-dark/70">Loading PG details...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[var(--bgPrimary)] via-white to-[var(--bgPrimaryLight)] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">🏢</div>
          <h1 className="text-3xl font-bold text-dark mb-2">PG Not Found</h1>
          <p className="text-dark/70 mb-6">
            Sorry, we couldn't find the PG you're looking for.
          </p>
          {/* <a
            href="/"
            className="inline-block btn-primary rounded-full px-6 py-3"
          >
            Back to Home
          </a> */}
        </div>
      </div>
    );
  }

  const { pg, owner, rent_details } = data;

  const getSharingLabel = (sharingType: number): string => {
    const labels: Record<number, string> = {
      1: "Single",
      2: "Double",
      3: "Triple",
    };
    return labels[sharingType] || `${sharingType} Sharing`;
  };

  const getSharingEmoji = (sharingType: number): string => {
    const emojis: Record<number, string> = {
      1: "1️⃣",
      2: "2️⃣",
      3: "3️⃣",
      4: "4️⃣",
      5: "5️⃣",
      6: "6️⃣",
      7: "7️⃣",
      8: "8️⃣",
      9: "9️⃣",
    };
    return emojis[sharingType] || "📌";
  };

  const getStayTypeIcons = () => {
    if (pg.stay_type === "both") return ["🍽️", "📦"];
    if (pg.stay_type === "with_food") return ["🍽️"];
    return ["📦"];
  };

  const getFoodTypeIcons = () => {
    if (pg.food_type === "both") return ["🥗", "🍗"];
    if (pg.food_type === "veg") return ["🥗"];
    return ["🍗"];
  };

  const getOccupancyIcons = () => {
    if (pg.allowed_guest_type === "both") return ["📅", "🏠"];
    if (pg.allowed_guest_type === "daywise") return ["📅"];
    return ["🏠"];
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Premium Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1a1f35] via-[#2d3561] to-[#3a4a7a] min-h-[60vh] flex items-center justify-center px-4 py-16">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-72 h-72 bg-[var(--primary)] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-[var(--warning)] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2s"></div>
          <div className="absolute -bottom-8 left-40 w-72 h-72 bg-[var(--success)] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4s"></div>
        </div>

        <div className="container-max w-full text-center text-white max-w-5xl relative z-10">
          <div className="inline-block mb-6 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
            <span className="text-sm font-semibold text-white/90">
              Premium PG Living
            </span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-tight">
            {pg.pg_name}
          </h1>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            {pg.address}
          </p>

          {/* Feature Tags */}
          <div className="flex flex-wrap gap-3 justify-center mb-10">
            {/* PG Type */}
            <div className="px-5 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:bg-white/20 transition">
              <span className="text-lg mr-2">
                {pg.pg_type === "boys"
                  ? "👦"
                  : pg.pg_type === "girls"
                  ? "👩"
                  : "👥"}
              </span>
              <span className="text-sm font-semibold capitalize">
                {pg.pg_type} PG
              </span>
            </div>

            {/* Stay Type with Icons */}
            <div className="px-5 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:bg-white/20 transition">
              {getStayTypeIcons().map((icon, i) => (
                <span key={i} className="text-lg mr-2">
                  {icon}
                </span>
              ))}
              <span className="text-sm font-semibold capitalize">
                {pg.stay_type === "both"
                  ? "With & Without Food"
                  : pg.stay_type.replace(/_/g, " ")}
              </span>
            </div>

            {/* Food Type with Icons */}
            <div className="px-5 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:bg-white/20 transition">
              {getFoodTypeIcons().map((icon, i) => (
                <span key={i} className="text-lg mr-2">
                  {icon}
                </span>
              ))}
              <span className="text-sm font-semibold capitalize">
                {pg.food_type === "both" ? "Veg & Non-Veg" : pg.food_type}
              </span>
            </div>
          </div>

          <p className="text-white/70">
            Located in {pg.city}, {pg.state} • {pg.pincode}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container-max w-full max-w-6xl py-12 px-4">
        {/* PG Details Grid */}
        <div className="grid gap-8 lg:grid-cols-3 mb-12">
          {/* Location & Facilities */}
          <div className="lg:col-span-2">
            <div className="card p-8 shadow-lg hover:shadow-2xl transition-all duration-500 animate-slide-up overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/5 to-[var(--warning)]/5 opacity-0 hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <h2 className="text-3xl font-black text-dark mb-8 flex items-center gap-3">
                  <span className="text-2xl">📍</span> About This PG
                </h2>

                <div className="mb-8 pb-8 border-b-2 border-[var(--primary)]/20">
                  <h3 className="text-lg font-bold text-[var(--primary)] mb-4 uppercase tracking-wide text-sm">
                    Location
                  </h3>
                  <p className="text-dark/90 font-semibold mb-3 text-lg">
                    {pg.address}
                  </p>
                  <p className="text-sm text-dark/70 mb-4 flex items-center gap-2">
                    <span>📮</span> {pg.city}, {pg.state} {pg.pincode} •{" "}
                    {pg.country}
                  </p>
                  <a
                    href={pg.location_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:text-[var(--primaryDark)] font-bold transition-all hover:gap-3 group"
                  >
                    <span>🗺️</span> View on Google Maps{" "}
                    <span className="group-hover:translate-x-1 transition">
                      →
                    </span>
                  </a>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[var(--primary)] mb-4 uppercase tracking-wide text-sm flex items-center gap-2">
                    <span>⭐</span> Premium Facilities
                  </h3>

                  {/* Horizontal Scrollable Facilities - Single Row on Mobile */}
                  <div className="overflow-x-auto pb-4 -mx-2 px-2 scrollbar-hide">
                    <div className="flex flex-wrap lg:flex-nowrap gap-3 w-max lg:w-full">
                      {pg.facilities.map((facility, idx) => (
                        <div
                          key={facility}
                          className="group flex items-center gap-3 p-3 px-4 rounded-lg bg-gradient-to-r from-[var(--bgPrimary)] to-white border-2 border-[var(--primary)]/20 hover:border-[var(--primary)] hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer whitespace-nowrap flex-shrink-0"
                          style={{ animationDelay: `${idx * 0.05}s` }}
                        >
                          <div className="text-lg group-hover:scale-125 transition-transform flex-shrink-0">
                            ✓
                          </div>
                          <span className="text-dark/80 group-hover:text-dark font-semibold text-sm">
                            {facility}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Visual indicator for scrollable content on mobile */}
                  {pg.facilities.length > 3 && (
                    <p className="text-xs text-dark/50 mt-2 text-right lg:hidden">
                      ← Scroll for more →
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Info */}
          <div>
            <div
              className="card p-8 shadow-lg hover:shadow-2xl transition-all duration-500 animate-slide-up overflow-hidden relative"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/5 to-[var(--warning)]/5 opacity-0 hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <h3 className="text-2xl font-black text-dark mb-8 flex items-center gap-3">
                  <span className="text-2xl">⚡</span> Quick Info
                </h3>
                <div className="space-y-4">
                  {/* Occupancy Type */}
                  <div className="group p-4 rounded-xl bg-gradient-to-r from-[var(--bgPrimary)] to-[var(--bgPrimaryLight)] border-2 border-[var(--primary)]/30 hover:border-[var(--primary)] hover:shadow-md transition-all duration-300 hover:-translate-x-1 cursor-pointer">
                    <p className="text-xs font-bold text-[var(--primary)] uppercase tracking-wider mb-2">
                      📅 Occupancy Type
                    </p>
                    <div className="flex items-center gap-3">
                      {getOccupancyIcons().map((icon, i) => (
                        <span key={i} className="text-2xl">
                          {icon}
                        </span>
                      ))}
                      <p className="font-bold text-dark/90 capitalize">
                        {pg.allowed_guest_type === "both"
                          ? "Daily & Monthly"
                          : pg.allowed_guest_type}
                      </p>
                    </div>
                  </div>

                  {/* Stay Type */}
                  <div className="group p-4 rounded-xl bg-gradient-to-r from-[var(--bgPrimary)] to-[var(--bgPrimaryLight)] border-2 border-[var(--primary)]/30 hover:border-[var(--primary)] hover:shadow-md transition-all duration-300 hover:-translate-x-1 cursor-pointer">
                    <p className="text-xs font-bold text-[var(--primary)] uppercase tracking-wider mb-2">
                      🍽️ Stay Type
                    </p>
                    <div className="flex items-center gap-3">
                      {getStayTypeIcons().map((icon, i) => (
                        <span key={i} className="text-2xl">
                          {icon}
                        </span>
                      ))}
                      <p className="font-bold text-dark/90 capitalize">
                        {pg.stay_type === "both"
                          ? "With & Without Food"
                          : pg.stay_type.replace(/_/g, " ")}
                      </p>
                    </div>
                  </div>

                  {/* Food Type */}
                  <div className="group p-4 rounded-xl bg-gradient-to-r from-[var(--bgPrimary)] to-[var(--bgPrimaryLight)] border-2 border-[var(--primary)]/30 hover:border-[var(--primary)] hover:shadow-md transition-all duration-300 hover:-translate-x-1 cursor-pointer">
                    <p className="text-xs font-bold text-[var(--primary)] uppercase tracking-wider mb-2">
                      🥘 Food Type
                    </p>
                    <div className="flex items-center gap-3">
                      {getFoodTypeIcons().map((icon, i) => (
                        <span key={i} className="text-2xl">
                          {icon}
                        </span>
                      ))}
                      <p className="font-bold text-dark/90 capitalize">
                        {pg.food_type === "both"
                          ? "Veg & Non-Veg"
                          : pg.food_type}
                      </p>
                    </div>
                  </div>

                  {/* PG ID */}
                  <div className="group p-4 rounded-xl bg-gradient-to-r from-[var(--bgPrimary)] to-[var(--bgPrimaryLight)] border-2 border-[var(--primary)]/30 hover:border-[var(--primary)] hover:shadow-md transition-all duration-300 hover:-translate-x-1 cursor-pointer">
                    <p className="text-xs font-bold text-[var(--primary)] uppercase tracking-wider mb-2">
                      🆔 PG ID
                    </p>
                    <p className="font-mono font-black text-lg text-[var(--primary)] group-hover:scale-110 transition-transform">
                      {pg.pg_id}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rent Details */}
        <div
          className="mb-12 animate-slide-up"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-dark mb-2">
              Choose Your Plan
            </h2>
            <p className="text-dark/70">
              Select the sharing type that suits you best
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {rent_details.map((rent, idx) => (
              <div
                key={rent.id}
                className={cn(
                  "card p-6 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl",
                  rent.sharingType === 2 &&
                    "ring-2 ring-[var(--primary)] lg:lg:scale-105"
                )}
                style={{ animationDelay: `${0.3 + idx * 0.1}s` }}
              >
                {rent.sharingType === 2 && (
                  <div className="inline-block bg-gradient-to-r from-[var(--primary)] to-[var(--warning)] text-white text-xs font-bold px-4 py-1 rounded-full mb-4 animate-pulse">
                    ⭐ Most Popular
                  </div>
                )}
                <div className="mb-4">
                  <div className="text-4xl mb-2">
                    {getSharingEmoji(rent.sharingType)}
                  </div>
                  <h3 className="text-lg font-bold text-dark whitespace-nowrap">
                    {getSharingLabel(rent.sharingType)}
                  </h3>
                </div>
                <div className="border-t border-b border-input py-4 mb-4">
                  <p className="text-sm text-dark/70 mb-2">Monthly Rate</p>
                  <p className="text-3xl font-black text-primary">
                    ₹{parseFloat(rent.monthlyRent).toLocaleString()}
                  </p>
                </div>
                <div className="mb-6">
                  <p className="text-xs text-dark/70 mb-1">Or Daily</p>
                  <p className="text-sm font-bold text-dark">
                    ₹{parseFloat(rent.dailyRent).toLocaleString()}
                  </p>
                </div>
                <a href={`tel:${owner.mobile}`}>
                  <button
                    className={cn(
                      "w-full rounded-lg px-4 py-3 text-sm font-bold transition-all",
                      rent.sharingType === 2
                        ? "btn-primary"
                        : "border-2 border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--bgPrimary)]"
                    )}
                  >
                    Inquire Now
                  </button>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Ready to Move In CTA - Inside Container */}
        <div
          className="py-16 animate-slide-up"
          style={{ animationDelay: "0.4s" }}
        >
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-block mb-6 px-4 py-2 bg-gradient-to-r from-[var(--primary)]/10 to-[var(--warning)]/10 rounded-full border border-[var(--primary)]/30">
              <span className="text-sm font-bold text-[var(--primary)]">
                ✨ Ready to Move In?
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-black text-dark mb-6 leading-tight">
              Start Your PG Journey Today
            </h2>

            <p className="text-lg text-dark/70 mb-8 leading-relaxed">
              Get in touch with {owner.name} to book your room or learn more
              about the PG. Respond time is usually within a few hours.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href={`tel:${owner.mobile}`}
                className="group inline-flex items-center gap-3 btn-primary rounded-xl px-8 py-4 font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 hover:-translate-y-1 transition-all duration-300"
              >
                <span className="text-2xl group-hover:animate-bounce">📞</span>
                <span>Call Now</span>
              </a>
            </div>
          </div>
        </div>

        {/* Owner Details - Below CTA */}
        <div
          className="py-12 border-t-2 border-[var(--primary)]/20 animate-slide-up"
          style={{ animationDelay: "0.5s" }}
        >
          <h2 className="text-3xl font-black text-dark mb-8 text-center flex items-center justify-center gap-3">
            <span className="text-3xl">👤</span> Meet Your PG Owner
          </h2>

          <div className="grid gap-6 lg:grid-cols-2 items-center">
            {/* Owner Card */}
            <div className="card p-0 shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 relative group">
              {/* Gradient border top */}
              <div className="h-1 bg-gradient-to-r from-[var(--primary)] via-[var(--warning)] to-[var(--success)]" />

              <div className="p-8">
                <div className="flex items-center gap-6 flex-col sm:flex-row text-center sm:text-left">
                  {/* Avatar with animation */}
                  <div className="relative flex-shrink-0">
                    <div className="w-24 h-24 bg-gradient-to-br from-[var(--primary)] via-[var(--warning)] to-[var(--success)] rounded-xl flex items-center justify-center text-4xl font-black text-white shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                      {owner.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="absolute bottom-0 right-0 bg-green-500 w-6 h-6 rounded-full border-2 border-white shadow-md flex items-center justify-center text-xs">
                      ✓
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-2xl font-black text-dark mb-1 group-hover:text-[var(--primary)] transition-colors">
                      {owner.name}
                    </h3>
                    <p className="text-dark/70 capitalize font-semibold flex items-center justify-center sm:justify-start gap-1 mb-3">
                      <span>{owner.gender === "male" ? "👨" : "👩"}</span>{" "}
                      {owner.gender} • PG Owner
                    </p>

                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 p-2 rounded-lg bg-gradient-to-r from-[var(--bgPrimary)] to-[var(--bgPrimaryLight)] border border-[var(--primary)]/30">
                        <span className="text-lg">📧</span>
                        <a
                          href={`mailto:${owner.email}`}
                          className="text-[var(--primary)] hover:text-[var(--primaryDark)] hover:underline font-semibold transition-colors text-sm"
                        >
                          {owner.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 p-2 rounded-lg bg-gradient-to-r from-[var(--bgPrimary)] to-[var(--bgPrimaryLight)] border border-[var(--primary)]/30">
                        <span className="text-lg">📱</span>
                        <a
                          href={`tel:${owner.mobile}`}
                          className="text-[var(--primary)] hover:text-[var(--primaryDark)] hover:underline font-bold transition-colors text-sm"
                        >
                          {owner.mobile}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3">
                  <a
                    href={`tel:${owner.mobile}`}
                    className="btn-primary rounded-lg px-6 py-3 text-center font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <span>📞</span> Call Owner
                  </a>
                  <a
                    href={`mailto:${owner.email}`}
                    className="border-2 border-[var(--primary)] text-[var(--primary)] font-bold rounded-lg px-6 py-3 text-center hover:bg-gradient-to-r hover:from-[var(--primary)]/10 hover:to-[var(--warning)]/10 transition-all duration-300"
                  >
                    <span>✉️</span> Send Email
                  </a>
                </div>
              </div>
            </div>

            {/* Extra Details */}
            <div className="grid grid-cols-2 gap-4">
              <div className="card p-6 text-center hover:shadow-lg transition-all">
                <div className="text-4xl mb-3">⚡</div>
                <p className="text-sm text-dark/70 mb-2">Response Time</p>
                <p className="text-lg font-bold text-[var(--primary)]">
                  Usually 2-4 hrs
                </p>
              </div>
              <div className="card p-6 text-center hover:shadow-lg transition-all">
                <div className="text-4xl mb-3">⭐</div>
                <p className="text-sm text-dark/70 mb-2">Owner Rating</p>
                <p className="text-lg font-bold text-[var(--primary)]">
                  4.8/5.0
                </p>
              </div>
              <div className="card p-6 text-center hover:shadow-lg transition-all">
                <div className="text-4xl mb-3">👥</div>
                <p className="text-sm text-dark/70 mb-2">
                  Sharing Options Available
                </p>
                <p className="text-lg font-bold text-[var(--primary)]">
                  {data.rent_details.length} type
                  {data.rent_details.length > 1 ? "s" : ""}
                </p>
              </div>
              <div className="card p-6 text-center hover:shadow-lg transition-all">
                <div className="text-4xl mb-3">✅</div>
                <p className="text-sm text-dark/70 mb-2">Verified Owner</p>
                <p className="text-lg font-bold text-green-600">Confirmed</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTA - Premium Section */}
      <section className="relative overflow-hidden py-16 px-4 mt-0">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)] via-[var(--warning)] to-[var(--success)]" />

        {/* Animated blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2s" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4s" />

        <div className="container-max text-center text-white max-w-3xl relative z-10">
          <div
            className="inline-block mb-6 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/30 animate-slide-down"
            style={{ animationDelay: "0s" }}
          >
            <span className="text-sm font-bold">✨ Next Step</span>
          </div>

          <h2
            className="text-4xl sm:text-5xl font-black mb-6 leading-tight animate-slide-down"
            style={{ animationDelay: "0.1s" }}
          >
            Ready to Move In?
          </h2>

          <p
            className="text-lg text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed animate-slide-down"
            style={{ animationDelay: "0.2s" }}
          >
            Get in touch with {owner.name} today. Contact directly via call or
            email, or download the Pgowner app for a seamless experience.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-down"
            style={{ animationDelay: "0.3s" }}
          >
            <a
              href={`tel:${owner.mobile}`}
              className="group inline-flex items-center gap-3 bg-white text-[var(--primary)] rounded-full px-8 py-4 font-bold text-lg shadow-2xl hover:shadow-3xl hover:scale-110 hover:-translate-y-1 transition-all duration-300"
            >
              <span className="text-2xl group-hover:animate-bounce">📞</span>
              <span>Call Now</span>
            </a>
          </div>

          <p className="text-white/70 text-sm mt-8">
            💡 Tip: Save this page to share with friends!
          </p>
        </div>
      </section>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }
        .animate-slide-up {
          animation: slideUp 0.6s ease-out forwards;
          opacity: 0;
        }
        .animate-slide-down {
          animation: slideDown 0.6s ease-out forwards;
          opacity: 0;
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2s {
          animation-delay: 2s;
        }
        .animation-delay-4s {
          animation-delay: 4s;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
