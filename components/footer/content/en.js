import YoutubeIcon from "../assets/YouTube.svg";
import InstagramIcon from "../assets/Instagram.svg";
import FacebookIcon from "../assets/Facebook.svg";

export const footerContent = {
  title: "© 2025 TomsEnglish.com",
  sections: [
    {
      title: "Classes",
      items: [
        { text: "Individual classes", href: "/classes/individual" },
        // { text: "Group classes", href: "/classes/group" },
      ],
    },
    {
      title: "Community",
      items: [
        // { text: "Forum", href: "/community" },
        { text: "Discord", href: "https://discord.gg/wQ63ZPvCTk" },
      ],
    },
    // {
    //   title: "Resources",
    //   items: [
    //     { text: "Blog", href: "/blog" },
    //     // { text: "Help Center", href: "/help" },
    //   ],
    // },
    {
      title: "More",
      items: [
        { text: "About", href: "/about" },
        { text: "Contact", href: "/contact" },
      ],
    },
  ],
  // newsletter: { title: "Get the newsletter" },
  links: [
    // { text: "Privacy Policy", href: "/privacy" },
  ],
  social: [
    { icon: YoutubeIcon, href: "https://www.youtube.com/@EnglishbyTomYT", alt: "YouTube" },
    // { icon: InstagramIcon, href: "https://www.instagram.com/englishbytom", alt: "Instagram" },
    // { icon: FacebookIcon, href: "https://www.facebook.com/englishbytom", alt: "Facebook" },
  ],
};
