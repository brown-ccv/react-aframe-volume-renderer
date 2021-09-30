import React from "react";

export default function Footer(props) {
  return (
    <footer className="footer-grid footer bg-light">
      <section className="footer-grid-section-a">
        <div className="footer-left">
          <div className="footer-logos">
            <img
              src="assets/images/ricaim-logo-name.svg"
              width="256"
              height="256"
              className="d-inline-block align-top"
              alt="RI C-AIM"
            />
            <img
              src="assets/images/uri-logo.svg"
              width="256"
              height="256"
              className="d-inline-block align-top"
              alt="RI C-AIM"
            />
            <img
              src="assets/images/brown-logo.svg"
              width="256"
              height="256"
              className="d-inline-block align-top"
              alt="RI C-AIM"
            />
          </div>
          <p className="footer-left-email">
            <a href="mailto:ridatadiscoverycenter@brown.edu">
              ridatadiscoverycenter@brown.edu
            </a>
          </p>
        </div>
      </section>
      <section className="footer-grid-section-b">
        <div className="footer-right">
          <p className="container">
            This material is based upon work conducted by the Rhode Island
            Consortium for Coastal Ecology Assessment, Innovation & Modeling (RI
            C-AIM), and supported in full by the National Science Foundation
            EPSCoR Cooperative Agreement 1655221. Any opinions, findings, and
            conclusions or recommendations expressed in this material are those
            of the author(s) and do not necessarily reflect the views of the
            National Science Foundation.
          </p>
          <img
            src="assets/images/nsf.svg"
            width="128"
            height="128"
            className="d-inline-block align-top"
            alt="NSF"
          />
        </div>
      </section>
      <section className="footer-grid-bottom">
        <span className="copyright-span">© 2021</span>
        <span className="copyright-span">Narragansett Bay Volume Viewer</span>
      </section>
    </footer>
  );
}
