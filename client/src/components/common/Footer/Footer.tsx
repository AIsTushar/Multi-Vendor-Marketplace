import { FacebookIcon, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import React from "react";

const footerLinks = {
  product: [
    { name: "Features", href: "/features" },
    { name: "Pricing", href: "/pricing" },
    { name: "Documentation", href: "/docs" },
    { name: "API", href: "/api" },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
  ],
  legal: [
    { name: "Privacy", href: "/privacy" },
    { name: "Terms", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
    { name: "Licenses", href: "/licenses" },
  ],
};

const socialLinks = [
  { name: "Facebook", href: "#", icon: FacebookIcon },
  { name: "Github", href: "#", icon: Github },
  { name: "LinkedIn", href: "#", icon: Linkedin },
  { name: "Email", href: "#", icon: Mail },
];

export const Footer = () => {
  return (
    // Footer Component
    <footer className="border-t bg-background w-full mx-auto">
      {/* Main Div */}
      <div className="max-w-7xl mx-auto py-12 md-py-16 px-6">
        {/* Logo and description */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="text-lg font-bold">
              <span className="text-2xl font-bold">Logo</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Building exceptional digital experiences that make a difference.
            </p>
            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="mr-4 text-muted-foreground hover:text-primary transition"
                >
                  <social.icon className="h-5 w-5" />
                  <span className="sr-only">{social.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((productLink) => (
                <li key={productLink.name}>
                  <Link
                    href={productLink.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {productLink.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((companyLink) => (
                <li key={companyLink.name}>
                  <Link
                    href={companyLink.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {companyLink.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Legal Links */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((legalLink) => (
                <li key={legalLink.name}>
                  <Link
                    href={legalLink.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {legalLink.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* copyright  */}
        <div className="mt-12 pt-4 border-t">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
