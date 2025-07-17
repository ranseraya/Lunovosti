import React from 'react';
import Image from 'next/image';
import staffMember1 from '@/assets/profile.jpg';
import staffMember2 from '@/assets/profile.jpg';
import staffMember3 from '@/assets/profile.jpg';
import Link from 'next/link';

const staffMembers = [
  {
    id: 1,
    name: 'Eleanor Vance',
    title: 'Editor-in-Chief',
    bio: 'Eleanor leads the editorial vision of Lunovosti, ensuring journalistic integrity and impactful storytelling. With over 20 years in media, her expertise spans political analysis and global affairs.',
    image: staffMember1,
    social: {
      twitter: 'https://twitter.com/#',
      linkedin: 'https://linkedin.com/in/#',
    },
    articlesLink: '#',
  },
  {
    id: 2,
    name: 'Marcus Thorne',
    title: 'Managing Editor',
    bio: 'Marcus oversees daily news operations, focusing on rapid and accurate reporting. His background in investigative journalism ensures Lunovosti delivers comprehensive coverage.',
    image: staffMember2,
    social: {
      twitter: 'https://twitter.com/#',
      linkedin: 'https://linkedin.com/in/#',
    },
    articlesLink: '#',
  },
  {
    id: 3,
    name: 'Sophia Chen',
    title: 'Senior Tech Reporter',
    bio: 'Sophia covers the cutting edge of technology, bringing complex innovations into clear focus for our readers. She is passionate about the societal impact of AI and digital trends.',
    image: staffMember3,
    social: {
      twitter: 'https://twitter.com/#',
      linkedin: 'https://linkedin.com/in/#',
    },
    articlesLink: '#',
  },
];

const Page = () => {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Our Newsroom Staff</h1>

      <p className="text-lg text-gray-700 leading-relaxed mb-8">
        Meet the dedicated team behind Lunovosti. Our journalists and editors are committed to delivering accurate, unbiased, and insightful news, upholding the highest standards of journalistic integrity.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {staffMembers.map((member) => (
          <div key={member.id} className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
            <div className="relative h-28 w-28 rounded-full overflow-hidden mb-4 border-2 border-gray-300">
              <Image
                src={member.image}
                alt={member.name}
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
            <h2 className="text-xl font-bold text-gray-800">{member.name}</h2>
            <p className="text-md text-gray-600 mb-3">{member.title}</p>
            <p className="text-sm text-gray-700 leading-relaxed mb-4">{member.bio}</p>
            <div className="flex gap-3 mt-auto">
              {member.articlesLink && (
                <Link href={member.articlesLink} className="text-[#ff8800] hover:underline text-sm font-semibold">
                  View Articles
                </Link>
              )}
              {/* {member.social.twitter && (
                <Link href={member.social.twitter} aria-label={`${member.name}'s Twitter`} className="text-gray-500 hover:text-[#ff8800]">
                    <FontAwesomeIcon icon={faTwitter} />
                </Link>
              )} */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;