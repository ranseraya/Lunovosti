import React from 'react';
import Link from 'next/link';
import { Mail, Briefcase } from 'lucide-react'; // Icons

const Page = () => {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Advertise With Lunovosti</h1>

      <p className="text-lg text-gray-700 leading-relaxed mb-6">
        Reach a highly engaged and informed audience by advertising with Lunovosti. We offer diverse advertising solutions to help your brand connect with thousands of daily readers interested in current events, technology, business, and more.
      </p>

      <h2 className="text-2xl font-bold mb-4 text-gray-800">Why Advertise With Us?</h2>
      <ul className="list-disc list-inside text-lg text-gray-700 leading-relaxed space-y-2 mb-8">
        <li>**Targeted Audience:** Connect with readers deeply invested in news and information.</li>
        <li>**High Engagement:** Our platform encourages active reading and interaction.</li>
        <li>**Brand Safety:** Advertise in a credible and trusted news environment.</li>
        <li>**Flexible Options:** From display ads to sponsored content, we have solutions for every budget.</li>
      </ul>

      <h2 className="text-2xl font-bold mb-4 text-gray-800">Our Advertising Solutions:</h2>
      <ul className="list-disc list-inside text-lg text-gray-700 leading-relaxed space-y-2 mb-8">
        <li>**Display Advertising:** Prominent banner placements across our website.</li>
        <li>**Native Advertising & Sponsored Content:** Seamlessly integrate your message within our editorial flow.</li>
        <li>**Newsletter Sponsorships:** Reach subscribers directly in their inbox.</li>
        <li>**Custom Campaigns:** Tailored solutions designed to meet your specific marketing goals.</li>
      </ul>

      <h2 className="text-2xl font-bold mb-4 text-gray-800">Get in Touch</h2>
      <p className="text-lg text-gray-700 leading-relaxed mb-4">
        Ready to amplify your brand's message? Contact our advertising team to learn more about our rates, audience demographics, and custom packages.
      </p>
      <div className="space-y-3 text-gray-700 mb-8">
        <p className="flex items-center gap-3">
          <Mail size={20} className="text-[#ff8800]" /> 
          Email: <a href="mailto:ads@lunovosti.com" className="hover:text-[#ff8800] transition">ads@lunovosti.com</a>
        </p>
        <p className="flex items-center gap-3">
          <Briefcase size={20} className="text-[#ff8800]" /> 
          Request a Media Kit: <Link href="#" className="hover:text-[#ff8800] transition">Download Here (PDF)</Link>
        </p>
      </div>

      <p className="text-lg text-gray-700 leading-relaxed font-semibold">
        We look forward to partnering with you!
      </p>
    </div>
  );
};

export default Page;