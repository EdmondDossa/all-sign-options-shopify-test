// components/HelpLink.tsx
import React from "react";

interface HelpLinkProps {
  url: string;
  text: string;
}

const HelpLink: React.FC<HelpLinkProps> = ({ url, text }) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="help-link"
    >
      <p className="help-link-text">{text}</p>
    </a>
  );
};

export default HelpLink;
