import { socialLinks } from "@/data/skills";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1A1A1A] py-8 border-t border-[#343434]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-sm text-[#6B6B6B] order-3 md:order-1">
            © {currentYear} Safwan Sayeed
          </p>

          {/* View Counter */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg order-1 md:order-2">
            <img
              src="https://hits.sh/safwansayeed.live.svg?style=flat&label=Views&color=E07A5F&labelColor=252525"
              alt="visitor count"
              className="h-6"
            />
          </div>

          {/* Social Links */}
          <div className="flex gap-4 order-2 md:order-3">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group transition-all duration-300"
                aria-label={social.name}
              >
                <img
                  src={`/assets/social/${social.icon}.svg`}
                  alt={social.name}
                  className="w-5 h-5 transition-all duration-300 group-hover:brightness-250"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
