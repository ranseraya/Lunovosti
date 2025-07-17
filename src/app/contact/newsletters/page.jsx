'use client';

import React, { useState } from 'react';

const Page = () => {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribeMessage, setSubscribeMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubscribing(true);
    setSubscribeMessage('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Subscribing email:', email);
      setSubscribeMessage('Thank you for subscribing! Check your inbox for a confirmation email.');
      setEmail('');
    } catch (error) {
      console.error('Subscription error:', error);
      setSubscribeMessage('There was an error subscribing. Please try again later.');
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Lunovosti Newsletters</h1>

      <p className="text-lg text-gray-700 leading-relaxed mb-8">
        Stay informed with Lunovosti's curated newsletters, delivered directly to your inbox. Choose from a variety of topics to get the news that matters most to you.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Our Newsletter Offerings</h2>
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Daily Briefing</h3>
              <p className="text-gray-700 text-sm">
                Get the top headlines and essential stories of the day, delivered every morning to keep you updated.
              </p>
              <p className="text-xs text-gray-500 mt-2">Frequency: Daily</p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Weekly Tech Digest</h3>
              <p className="text-gray-700 text-sm">
                A weekly roundup of the most significant news and trends in technology, from AI to cybersecurity.
              </p>
              <p className="text-xs text-gray-500 mt-2">Frequency: Weekly (Friday)</p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Global Politics Insights</h3>
              <p className="text-gray-700 text-sm">
                Deep dives and expert analysis on the week's most crucial political developments worldwide.
              </p>
              <p className="text-xs text-gray-500 mt-2">Frequency: Weekly (Monday)</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Subscribe Now</h2>
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <p className="text-gray-700 mb-4">Enter your email to subscribe to our newsletters. You can choose your preferences after signing up.</p>
            <div className="mb-4">
              <label htmlFor="emailInput" className="block text-gray-700 text-sm font-semibold mb-2">Email Address</label>
              <input
                type="email"
                id="emailInput"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow-sm appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#ff8800] focus:border-transparent"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-[#ff8800] hover:brightness-110 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:shadow-outline transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubscribing}
            >
              {isSubscribing ? 'Subscribing...' : 'Subscribe Now'}
            </button>
            {subscribeMessage && (
              <p className={`mt-4 text-sm ${subscribeMessage.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
                {subscribeMessage}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;