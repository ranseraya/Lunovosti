import React from 'react';

const Page = () => {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Ethical Principles of Lunovosti</h1>

      <p className="text-lg text-gray-700 leading-relaxed mb-6">
        At Lunovosti, we are committed to upholding the highest standards of journalistic ethics and integrity. Our principles guide every step of our reporting process, ensuring that we serve our readers with fairness, accuracy, and transparency.
      </p>

      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold mb-3 text-gray-800">1. Accuracy and Verification</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            We strive for utmost accuracy in all our reports. Every piece of information is thoroughly fact-checked and verified using multiple reliable sources before publication. We commit to correcting any factual errors promptly and transparently.
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-3 text-gray-800">2. Independence</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Lunovosti operates independently of any political, corporate, or special interests. Our editorial decisions are free from external influence, ensuring that our reporting is unbiased and serves the public interest above all else.
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-3 text-gray-800">3. Fairness and Impartiality</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            We are committed to presenting all sides of a story fairly and impartially. We avoid taking sides in debates and provide context necessary for readers to form their own informed opinions. Our aim is to represent diverse viewpoints respectfully.
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-3 text-gray-800">4. Transparency</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            We are transparent about our sources when appropriate, our methods, and any potential conflicts of interest. We believe in open communication with our readers and encourage feedback.
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-3 text-gray-800">5. Accountability</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Lunovosti holds itself accountable to its readers. We are open to criticism and commit to investigating and addressing any complaints regarding our journalistic practices. We stand by our work and take responsibility for our content.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;