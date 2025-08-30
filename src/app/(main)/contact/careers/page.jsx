import React from 'react';
import Link from 'next/link';
import { Briefcase, MapPin } from 'lucide-react';

const jobOpenings = [
  {
    id: 1,
    title: 'Senior News Reporter',
    location: 'Bandung, Indonesia',
    department: 'Editorial',
    description: 'Seeking an experienced reporter to cover national and local news. Strong investigative skills and a passion for truth are a must.',
    link: '#'
  },
  {
    id: 2,
    title: 'Digital Marketing Specialist',
    location: 'Remote',
    department: 'Marketing',
    description: 'Responsible for developing and executing digital marketing campaigns to grow Lunovosti\'s audience and brand.',
    link: '#'
  },
  {
    id: 3,
    title: 'Web Developer (Frontend)',
    location: 'Bandung, Indonesia',
    department: 'Technology',
    description: 'Join our tech team to build and maintain the Lunovosti platform. Strong React and Next.js skills required.',
    link: '#'
  },
];

const Page = () => {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Careers at Lunovosti</h1>

      <p className="text-lg text-gray-700 leading-relaxed mb-8">
        Join the Lunovosti team and be part of a dynamic news organization committed to impactful journalism and innovation. We are always looking for passionate and talented individuals to help us grow.
      </p>

      <h2 className="text-2xl font-bold mb-6 text-gray-800">Current Job Openings</h2>

      {jobOpenings.length > 0 ? (
        <div className="space-y-6">
          {jobOpenings.map(job => (
            <div key={job.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{job.title}</h3>
              <div className="flex items-center text-gray-600 text-sm mb-3 gap-4">
                <p className="flex items-center gap-1"><Briefcase size={16} /> {job.department}</p>
                <p className="flex items-center gap-1"><MapPin size={16} /> {job.location}</p>
              </div>
              <p className="text-gray-700 mb-4">{job.description}</p>
              <Link href={job.link} className="text-[#ff8800] hover:underline font-semibold transition">
                Learn More & Apply &rarr;
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-lg text-gray-700">
          We currently have no open positions, but please check back later or send us your resume for future opportunities.
        </p>
      )}

      <h2 className="text-2xl font-bold mt-12 mb-4 text-gray-800">Working at Lunovosti</h2>
      <p className="text-lg text-gray-700 leading-relaxed">
        At Lunovosti, we foster a collaborative and innovative environment where creativity and critical thinking are valued. We offer competitive benefits and opportunities for professional growth. Join us in shaping the future of news!
      </p>
    </div>
  );
};

export default Page;