import React from "react";

type Props = {};

const Footer: React.FC<Props> = () => {
  return (
    <footer className="footer">
      <p>All rights reserved with PSPM Technologies.</p>
      <p>
        Contact:{" "}
        <a href="mailto:dev.abhijeetshinde@example.com">
          dev.abhijeetshinde@example.com
        </a>{" "}
        for issues/bugs
      </p>
    </footer>
  );
};

export default Footer;
