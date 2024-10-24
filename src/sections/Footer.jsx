const Footer = () => {
  return (
    <footer className="c-space pt-7 pb-3 border-t border-black-300 flex justify-between items-center flex-wrap gap-5">
      <div className="text-white-500 flex gap-2">
        <p>Terms & Conditions</p>
        <p>|</p>
        <p>Privacy Policy</p>
      </div>

      <div className="flex gap-3">
        <div className="social-icon">
          <a href="https://github.com/sa-fw-an/ " target="_blank">
            <img src="./assets/github.svg" alt="github" className="w-full h-1/2" />
          </a>
        </div>
        <div className="social-icon">
          <a href="https://www.linkedin.com/in/safwan-sayeed-6a3a482a9" target="_blank">
            <img src="./assets/linkedin.svg" alt="linkedin" className="w-full h-1/2" />
          </a>
        </div>
        <div className="social-icon">
          <a href="https://x.com/safwan_say" target="_blank">
            <img src="./assets/twitter.svg" alt="twitter" className="w-full h-1/2" />
          </a>
        </div>
      </div>

      <p className="text-white-500">© 2024 Safwan Sayeed. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
