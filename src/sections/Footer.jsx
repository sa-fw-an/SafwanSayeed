import { socialLinks } from "../constants/social.js";

const Footer = () => {
  return (
    <footer className="c-space pt-7 pb-4 border-t border-gray-700 flex flex-col sm:flex-row justify-between items-center flex-wrap gap-5 bg-black text-gray-400">
      <div className="text-gray-500 text-center text-sm flex justify-center items-center gap-2">
        <p>Terms & Conditions</p>
        <span>|</span>
        <p>Privacy Policy</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 items-center">
        <div className="flex gap-5 justify-center sm:justify-start">
          {socialLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <img
                src={link.src}
                alt={link.alt}
                className="h-6 w-6 hover:scale-105 hover:translate-y-[-3px] transition-transform duration-500 ease-in-out"
              />
            </a>
          ))}
        </div>

        <div className="visit-counter-box flex items-center gap-2 bg-gray-800 text-gray-300 p-1.5 rounded-lg shadow-sm mt-2 sm:mt-0 sm:ml-4">
          <span className="text-sm font-medium">🤵 Views</span>
          <img
            src="https://hits.sh/safwansayeed.live.svg?style=round&label= &color=black"
            alt="visitor count"
            className="h-5 w-6"
          />
        </div>
      </div>

      <p className="text-gray-500 text-center text-sm sm:mt-0">
        © {new Date().getFullYear()} Safwan Sayeed. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
