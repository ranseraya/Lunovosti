import Link from 'next/link';
import React from 'react';

const Page = () => {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Accessibility Statement</h1>

      <p className="text-lg text-gray-700 leading-relaxed mb-6">
        Lunovosti is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.
      </p>

      <h2 className="text-3xl font-bold mt-8 mb-4 text-gray-800">Measures to Support Accessibility</h2>
      <p className="text-lg text-gray-700 leading-relaxed mb-4">
        Lunovosti takes the following measures to ensure accessibility of Lunovosti.com:
      </p>
      <ul className="list-disc list-inside text-lg text-gray-700 leading-relaxed space-y-2 mb-6">
        <li>Include accessibility throughout our internal policies.</li>
        <li>Integrate accessibility into our procurement practices.</li>
        <li>Provide continual accessibility training for our staff.</li>
        <li>Assign clear accessibility goals and responsibilities.</li>
        <li>Employ formal accessibility quality assurance methods.</li>
      </ul>

      <h2 className="text-3xl font-bold mt-8 mb-4 text-gray-800">Conformance Status</h2>
      <p className="text-lg text-gray-700 leading-relaxed mb-4">
        The <a href="https://www.w3.org/WAI/WCAG21/quickref/" target="_blank" rel="noopener noreferrer" className="text-[#ff8800] hover:underline">Web Content Accessibility Guidelines (WCAG)</a> defines requirements for designers and developers to improve accessibility for people with disabilities. It defines three levels of conformance: A, AA, and AAA. Lunovosti is partially conformant with WCAG 2.1 level AA. Partially conformant means that some parts of the content do not yet fully conform to the accessibility standard.
      </p>

      <h2 className="text-3xl font-bold mt-8 mb-4 text-gray-800">Feedback</h2>
      <p className="text-lg text-gray-700 leading-relaxed mb-4">
        We welcome your feedback on the accessibility of Lunovosti. Please let us know if you encounter accessibility barriers on Lunovosti.com:
      </p>
      <ul className="list-disc list-inside text-lg text-gray-700 leading-relaxed space-y-2 mb-6">
        <li>E-mail: <a href="mailto:accessibility@lunovosti.com" className="text-[#ff8800] hover:underline">accessibility@lunovosti.com</a></li>
        <li>Visit our <Link href="/contact" className="text-[#ff8800] hover:underline">Contact Us page</Link></li>
      </ul>

      <p className="text-base text-gray-600 mt-8">
        This statement was created on July 17, {new Date().getFullYear()}.
      </p>
    </div>
  );
};

export default Page;