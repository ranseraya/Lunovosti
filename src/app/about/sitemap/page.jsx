import React from 'react';
import Link from 'next/link';

const Page = () => {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Sitemap</h1>

      <p className="text-lg text-gray-700 leading-relaxed mb-8">
        Navigate through all the major sections and pages of Lunovosti to find the information you need.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Main Sections</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li><Link href="/" className="hover:text-[#ff8800] transition">Homepage</Link></li>
            <li><Link href="/latest" className="hover:text-[#ff8800] transition">Latest News</Link></li>
            <li><Link href="/popular" className="hover:text-[#ff8800] transition">Popular News</Link></li>
            <li><Link href="/archive" className="hover:text-[#ff8800] transition">News Archive</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Categories</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li><Link href="/category/national" className="hover:text-[#ff8800] transition">National</Link></li>
            <li><Link href="/category/international" className="hover:text-[#ff8800] transition">International</Link></li>
            <li><Link href="/category/technology" className="hover:text-[#ff8800] transition">Technology</Link></li>
            <li><Link href="/category/politics" className="hover:text-[#ff8800] transition">Politics</Link></li>
            <li><Link href="/category/sports" className="hover:text-[#ff8800] transition">Sports</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">About Lunovosti</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li><Link href="/about/us" className="hover:text-[#ff8800] transition">About Us</Link></li>
            <li><Link href="/about/staff" className="hover:text-[#ff8800] transition">Newsroom Staff</Link></li>
            <li><Link href="/about/ethics" className="hover:text-[#ff8800] transition">Ethical Principles</Link></li>
            <li><Link href="/about/accessibility" className="hover:text-[#ff8800] transition">Accessibility</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Other Pages</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li><Link href="/contact" className="hover:text-[#ff8800] transition">Contact Us</Link></li>
            <li><Link href="/policies/privacy" className="hover:text-[#ff8800] transition">Privacy Policy</Link></li>
            <li><Link href="/policies/terms" className="hover:text-[#ff8800] transition">Terms & Conditions</Link></li>
            <li><Link href="/policies/cookie" className="hover:text-[#ff8800] transition">Cookie Policy</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Page;