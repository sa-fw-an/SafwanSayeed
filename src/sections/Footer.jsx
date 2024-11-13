const Footer = () => {
  return (
    <footer className="c-space pt-7 pb-4 border-t border-gray-700 flex justify-between items-center flex-wrap gap-5 bg-black text-gray-400">
      <div className="text-gray-500 text-center text-sm mt-2 sm:mt-0 flex justify-center items-center gap-2">
        <p>Terms & Conditions</p>
        <span>|</span>
        <p>Privacy Policy</p>
      </div>

      <div className="flex gap-3 items-center">
        <div className="flex gap-4">

          <a href="https://github.com/sa-fw-an/" target="_blank" rel="noopener noreferrer" className="social-icon">
            <p className="hover:transform hover:scale-105 hover:translate-y-[-3px]  transition-transform duration-500 ease-in-out">
              <img src="./assets/github.svg" alt="github" className="h-6 w-6" />
            </p>
          </a>

          <a href="https://www.linkedin.com/in/safwan-sayeed-6a3a482a9" target="_blank" rel="noopener noreferrer" className="social-icon">
            <p className="hover:transform hover:scale-105 hover:translate-y-[-3px]  transition-transform duration-500 ease-in-out">
              <img src="./assets/linkedin.svg" alt="linkedin" className="h-6 w-6" />
            </p>
          </a>

          <a href="https://x.com/safwan_say" target="_blank" rel="noopener noreferrer" className="social-icon">
            <p className="hover:transform hover:scale-105 hover:translate-y-[-3px]  transition-transform duration-500 ease-in-out">
              <img src="./assets/twitter.svg" alt="twitter" className="h-6 w-6" />
            </p>
          </a>

          <div class="visit-counter-box flex items-center gap-2 bg-gray-800 text-gray-300 p-2 rounded-lg shadow-sm">
            <span class="text-sm font-medium">🤵Portfolio Views</span>
            <img src="https://hits.sh/safwansayeed.live.svg?style=round&label= &color=black" alt="visitor count" className="h-5 w-6" />
          </div>

        </div>
      </div>

      <p className="text-gray-500 text-center text-sm mt-2 sm:mt-0">© 2024 Safwan Sayeed. All rights reserved.</p>
    </footer>
  );
};

export default Footer;