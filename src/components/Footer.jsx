import Link from "next/link";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faMapMarkedAlt } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-200 py-10 md:py-16 mt-16">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8 md:gap-12 pb-8 border-b border-gray-700">
          <div>
            <h4 className="font-bold text-lg mb-4 text-white">About & Info</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-[#ff8800] transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#ff8800] transition">
                  Newsroom Staff
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#ff8800] transition">
                  Ethical Principles
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#ff8800] transition">
                  Sitemap
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#ff8800] transition">
                  Accessbility
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4 text-white">
              Connect with Us
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-[#ff8800] transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#ff8800] transition">
                  News Tips
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#ff8800] transition">
                  Newsletters
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#ff8800] transition">
                  Advertise With Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#ff8800] transition">
                  Careers
                </Link>
              </li>
            </ul>
            <div className="flex gap-4 mt-6">
              <Link href="#" aria-label="Facebook">
                <FontAwesomeIcon
                  icon={faFacebookF}
                  className="h-6 w-6 hover:text-[#ff8800] transition"
                />
              </Link>
              <Link href="#" aria-label="X/Twitter">
                <FontAwesomeIcon
                  icon={faTwitter}
                  className="h-6 w-6 hover:text-[#ff8800] transition"
                />
              </Link>
              <Link href="#" aria-label="Instagram">
                <FontAwesomeIcon
                  icon={faInstagram}
                  className="h-6 w-6 hover:text-[#ff8800] transition"
                />
              </Link>
              <Link href="#" aria-label="LinkedIn">
                <FontAwesomeIcon
                  icon={faLinkedinIn}
                  className="h-6 w-6 hover:text-[#ff8800] transition"
                />
              </Link>
              <Link href="#" aria-label="YouTube">
                <FontAwesomeIcon
                  icon={faYoutube}
                  className="h-6 w-6 hover:text-[#ff8800] transition"
                />
              </Link>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4 text-white">Policies</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-[#ff8800] transition">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#ff8800] transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#ff8800] transition">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#ff8800] transition">
                  Subscription Terms
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#ff8800] transition">
                  Ad Choices
                </Link>
              </li>
            </ul>
          </div>
          <div className="md:col-span-1 lg:col-span-2">
            <h4 className="font-bold text-lg mb-4 text-white">Our Office</h4>
            <address className="not-italic space-y-2 text-gray-300">
              <p className="flex items-start gap-2">
                <FontAwesomeIcon
                  icon={faMapMarkedAlt}
                  className="h-5 w-5 flex-shrink-0 mt-1"
                />
                Jl. Asia Afrika No.158, Kb. Pisang, Kec. Sumur Bandung, Kota
                Bandung, Jawa Barat 40261
              </p>
              <p className="flex items-center gap-2">
                <FontAwesomeIcon icon={faEnvelope} className="h-5 w-5" />
                contact@lunovosti.com
              </p>
              <p className="flex items-center gap-2">Tel: (022) 123-4567</p>
            </address>
          </div>
        </div>
        <div className="pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2025 Lunovosti. All rights reserved.</p>
          <p className="mt-2">
            A project by Ayala for portfolio purposes.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
