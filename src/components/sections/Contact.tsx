"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, MapPin, Phone, Mail, Globe } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import siteConfig from "@/content/siteConfig.json";

interface FormData {
  name: string;
  phone: string;
  classApplying: string;
  message: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  classApplying?: string;
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    classApplying: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.trim())) {
      newErrors.phone = "Enter a valid 10-digit phone number";
    }
    if (!formData.classApplying.trim()) newErrors.classApplying = "Please select a class";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // Placeholder submit — no real backend
      setSubmitted(true);
    }
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const inputClasses =
    "w-full px-4 py-3 rounded-xl bg-brand-surface border border-brand-border text-brand-text font-body text-sm focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all duration-300 placeholder:text-brand-text-muted/50";

  return (
    <section ref={sectionRef} id="contact" className="section-padding bg-brand-surface relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-0 w-[500px] h-[500px] rounded-full bg-brand-primary/5 blur-[120px]" />
      </div>

      <div className="section-container relative z-10">
        <SectionHeading
          label="Get in Touch"
          title={<>Contact <span className="text-gradient">Us</span></>}
          subtitle="We'd love to hear from you. Reach out for admissions, inquiries, or to schedule a campus visit."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 max-w-5xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-brand-bg rounded-3xl border border-brand-border p-10 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                  >
                    <CheckCircle size={56} className="text-green-500 mx-auto mb-4" />
                  </motion.div>
                  <h3 className="font-display font-bold text-brand-text-strong text-xl mb-2">
                    Thank You!
                  </h3>
                  <p className="text-brand-text-muted font-body text-sm mb-6">
                    Your inquiry has been received. We&apos;ll get back to you shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", phone: "", classApplying: "", message: "" });
                    }}
                    className="px-6 py-2 rounded-full border border-brand-border text-brand-text-muted text-sm font-body hover:border-brand-primary hover:text-brand-primary transition-colors duration-300"
                  >
                    Send another inquiry
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="bg-brand-bg rounded-3xl border border-brand-border p-8"
                >
                  <div className="space-y-5">
                    {/* Name */}
                    <div>
                      <label htmlFor="contact-name" className="block text-brand-text font-body font-medium text-sm mb-1.5">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        placeholder="Enter your full name"
                        className={`${inputClasses} ${errors.name ? "border-red-400 focus:border-red-400 focus:ring-red-200" : ""}`}
                      />
                      {errors.name && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-xs font-body mt-1"
                        >
                          {errors.name}
                        </motion.p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="contact-phone" className="block text-brand-text font-body font-medium text-sm mb-1.5">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        placeholder="Enter your 10-digit phone number"
                        className={`${inputClasses} ${errors.phone ? "border-red-400 focus:border-red-400 focus:ring-red-200" : ""}`}
                      />
                      {errors.phone && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-xs font-body mt-1"
                        >
                          {errors.phone}
                        </motion.p>
                      )}
                    </div>

                    {/* Class Applying For */}
                    <div>
                      <label htmlFor="contact-class" className="block text-brand-text font-body font-medium text-sm mb-1.5">
                        Class Applying For <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="contact-class"
                        value={formData.classApplying}
                        onChange={(e) => handleChange("classApplying", e.target.value)}
                        className={`${inputClasses} ${errors.classApplying ? "border-red-400" : ""} ${
                          !formData.classApplying ? "text-brand-text-muted/50" : ""
                        }`}
                      >
                        <option value="">Select a class</option>
                        {["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"].map((cls) => (
                          <option key={cls} value={cls}>
                            Class {cls}
                          </option>
                        ))}
                      </select>
                      {errors.classApplying && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-xs font-body mt-1"
                        >
                          {errors.classApplying}
                        </motion.p>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="contact-message" className="block text-brand-text font-body font-medium text-sm mb-1.5">
                        Message <span className="text-brand-text-muted text-xs">(optional)</span>
                      </label>
                      <textarea
                        id="contact-message"
                        value={formData.message}
                        onChange={(e) => handleChange("message", e.target.value)}
                        placeholder="Any questions or additional information..."
                        rows={4}
                        className={`${inputClasses} resize-none`}
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-brand-primary text-white font-body font-semibold text-sm hover:bg-brand-primary-dark transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <Send size={16} />
                      Send Inquiry
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="space-y-8"
          >
            {/* Contact details */}
            <div className="space-y-6">
              {[
                {
                  icon: MapPin,
                  label: "Visit Us",
                  content: `${siteConfig.contact.address.line1}, ${siteConfig.contact.address.line2}, ${siteConfig.contact.address.line3}`,
                  href: null,
                },
                {
                  icon: Phone,
                  label: "Call Us",
                  content: siteConfig.contact.phone,
                  href: `tel:${siteConfig.contact.phone}`,
                },
                {
                  icon: Mail,
                  label: "Email Us",
                  content: siteConfig.contact.email,
                  href: `mailto:${siteConfig.contact.email}`,
                },
                {
                  icon: Globe,
                  label: "Website",
                  content: siteConfig.contact.website,
                  href: `https://${siteConfig.contact.website}`,
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-brand-primary/10 flex items-center justify-center shrink-0">
                      <Icon size={18} className="text-brand-primary" />
                    </div>
                    <div>
                      <span className="block text-brand-text-muted text-xs font-body uppercase tracking-wider mb-1">
                        {item.label}
                      </span>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-brand-text font-body text-sm hover:text-brand-primary transition-colors duration-300"
                        >
                          {item.content}
                        </a>
                      ) : (
                        <p className="text-brand-text font-body text-sm">{item.content}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Map placeholder */}
            <div className="rounded-2xl overflow-hidden border border-brand-border h-56 bg-brand-bg flex items-center justify-center">
              <div className="text-center">
                <MapPin size={32} className="text-brand-primary/30 mx-auto mb-2" />
                <p className="text-brand-text-muted/50 text-xs font-body">
                  [PLACEHOLDER: Embedded Google Map]
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
