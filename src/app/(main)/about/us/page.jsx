import React from 'react';

const Page = () => {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">About Lunovosti</h1>

      <p className="text-lg text-gray-700 leading-relaxed mb-4">
        Lunovosti is a leading news portal dedicated to delivering timely, accurate, and reliable information from around the globe. Founded in July 2025, we are committed to empowering our readers with deep insights into the issues that matter most.
      </p>

      <h2 className="text-3xl font-bold mt-8 mb-4 text-gray-800">Our Mission</h2>
      <p className="text-lg text-gray-700 leading-relaxed mb-4">
        Our mission is to be the primary source of news that not only reports facts but also analyzes their impact and offers diverse perspectives, helping our audience better understand the world. We strive to foster an informed public discourse through rigorous journalism.
      </p>

      <h2 className="text-3xl font-bold mt-8 mb-4 text-gray-800">Our Vision</h2>
      <p className="text-lg text-gray-700 leading-relaxed">
        To be a credible and innovative bridge of information, shaping an intelligent and responsible public opinion. We envision a future where unbiased, well-researched news is accessible to everyone.
      </p>

      <h2 className="text-3xl font-bold mt-8 mb-4 text-gray-800">Our Values</h2>
      <ul className="list-disc list-inside text-lg text-gray-700 leading-relaxed space-y-2">
        <li>Accuracy: Upholding truth and precision in all our reporting.</li>
        <li>Integrity: Maintaining independence and resisting external pressures.</li>
        <li>Objectivity: Presenting facts fairly and without bias.</li>
        <li>Transparency: Being open about our processes and correcting errors promptly.</li>
        <li>Reader Focus: Serving our audience's information needs above all else.</li>
      </ul>

    </div>
  );
};

export default Page;