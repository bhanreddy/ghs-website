"use client";

import { Mail, Phone, MapPin, Globe, ArrowUpRight } from "lucide-react";
import VVMBadge from "@/components/ui/VVMBadge";
import siteConfig from "@/content/siteConfig.json";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-brand-surface border-t border-brand-border">
      {/* Gradient top accent */}
      <div className="h-[2px] bg-ribbon-horizontal w-full" />

      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Column 1: Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-ribbon flex items-center justify-center shrink-0">
                <span className="text-white font-display font-bold text-sm">G</span>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-display font-bold text-brand-text-strong text-base">
                  Geetanjali
                </span>
                <span className="text-brand-text-muted text-[11px] font-body">
                  High School, Maddur
                </span>
              </div>
            </div>
            <p className="text-brand-text-muted text-sm font-body leading-relaxed mb-5">
              {siteConfig.motto}
            </p>
            <div className="flex items-center gap-2">
              <VVMBadge size="md" />
            </div>
            <p className="text-brand-text-muted text-xs font-body mt-2">
              A <strong className="text-brand-secondary">VVM</strong> Group Institution
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-brand-text-strong text-sm uppercase tracking-wider mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {siteConfig.navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-brand-text-muted hover:text-brand-primary text-sm font-body transition-colors duration-300 inline-flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight
                      size={12}
                      className="opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className="font-display font-semibold text-brand-text-strong text-sm uppercase tracking-wider mb-5">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-brand-primary shrink-0 mt-0.5" />
                <span className="text-brand-text-muted text-sm font-body leading-relaxed">
                  {siteConfig.contact.address.line1}
                  <br />
                  {siteConfig.contact.address.line2}
                  <br />
                  {siteConfig.contact.address.line3}
                </span>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="flex items-center gap-3 text-brand-text-muted hover:text-brand-primary text-sm font-body transition-colors duration-300"
                >
                  <Phone size={16} className="text-brand-primary shrink-0" />
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex items-center gap-3 text-brand-text-muted hover:text-brand-primary text-sm font-body transition-colors duration-300"
                >
                  <Mail size={16} className="text-brand-primary shrink-0" />
                  {siteConfig.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`https://${siteConfig.contact.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-brand-text-muted hover:text-brand-primary text-sm font-body transition-colors duration-300"
                >
                  <Globe size={16} className="text-brand-primary shrink-0" />
                  {siteConfig.contact.website}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Info & Social */}
          <div>
            <h4 className="font-display font-semibold text-brand-text-strong text-sm uppercase tracking-wider mb-5">
              School Info
            </h4>
            <div className="space-y-3 text-sm font-body text-brand-text-muted">
              <p>
                <span className="text-brand-text font-medium">School Code:</span>{" "}
                {siteConfig.schoolCode}
              </p>
              <p>
                <span className="text-brand-text font-medium">Affiliation:</span>{" "}
                {siteConfig.cbseAffiliation}
              </p>
            </div>

            {/* Social Icons Placeholder */}
            <div className="mt-6">
              <h4 className="font-display font-semibold text-brand-text-strong text-sm uppercase tracking-wider mb-3">
                Follow Us
              </h4>
              <div className="flex items-center gap-3">
                {/* Social icon placeholders as styled circles */}
                {["Fb", "Ig", "Yt", "X"].map((label) => (
                  <a
                    key={label}
                    href="#"
                    className="w-9 h-9 rounded-full border border-brand-border flex items-center justify-center text-brand-text-muted hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all duration-300 text-xs font-display font-bold"
                    aria-label={`[PLACEHOLDER: ${label} social link]`}
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-brand-text-muted text-xs font-body text-center sm:text-left">
            © {currentYear} Geetanjali High School, Maddur. All rights reserved.
          </p>
          <p className="text-brand-text-muted text-xs font-body">
            A <strong className="text-brand-secondary">VVM</strong> Group Institution — Vijay Kumar, Venkataih & Mahesh
          </p>
        </div>
      </div>
    </footer>
  );
}
