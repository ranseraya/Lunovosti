import React from 'react';
import Link from 'next/link';

const Page = () => {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Submit a News Tip</h1>

      <p className="text-lg text-gray-700 leading-relaxed mb-6">
        Do you have a news tip or a story lead you believe Lunovosti should investigate? We rely on our community to help us uncover important stories. Your information could be crucial.
      </p>

      <h2 className="text-2xl font-bold mb-4 text-gray-800">How to Submit Your Tip:</h2>
      <p className="text-lg text-gray-700 leading-relaxed mb-4">
        We prioritize the safety and anonymity of our sources. Please choose the method that best suits your comfort level:
      </p>

      <ul className="list-disc list-inside text-lg text-gray-700 leading-relaxed space-y-4 mb-8">
        <li>
          **Via Email (Less Secure):** For general tips, you can email us at <a href="mailto:newstips@lunovosti.com" className="text-[#ff8800] hover:underline">newstips@lunovosti.com</a>. Please note that email is not fully secure.
        </li>
        <li>
          **Secure Messaging (Recommended for Sensitive Information):** For highly sensitive information, we recommend using encrypted messaging apps. Contact us for our secure contact details.
          <p className="text-sm text-gray-600 mt-1">*(e.g., Signal or encrypted email via ProtonMail/Tutanota details will be provided upon request)*</p>
        </li>
        <li>
          **Physical Mail:** For utmost security, you can send anonymous documents to our physical address:
          <p className="font-semibold mt-2">Lunovosti Newsroom<br/>Jl. Asia Afrika No.158<br/>Bandung, Jawa Barat 40261<br/>Indonesia</p>
        </li>
      </ul>

      <h2 className="text-2xl font-bold mb-4 text-gray-800">What to Include in Your Tip:</h2>
      <ul className="list-disc list-inside text-lg text-gray-700 leading-relaxed space-y-2 mb-8">
        <li>**Who:** Names of individuals or organizations involved.</li>
        <li>**What:** A clear and concise description of the event or issue.</li>
        <li>**When:** Dates and times of relevant events.</li>
        <li>**Where:** Locations where events occurred.</li>
        <li>**Why:** Why do you believe this is important news?</li>
        <li>**Evidence:** Any supporting documents, photos, videos, or links.</li>
        <li>**Your Contact (Optional):** If you wish to be contacted for more information.</li>
      </ul>

      <p className="text-lg text-gray-700 leading-relaxed font-semibold">
        Thank you for helping us bring important stories to light. Your contribution is invaluable.
      </p>
    </div>
  );
};

export default Page;