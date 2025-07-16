import React from "react";
import './Footer.css'

const Footer = () => {
  return (
    <div id="footer">
      <div className="social-links">
        <a href="https://www.linkedin.com/in/naveenchandar/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" title="LinkedIn Profile">
          <svg className="social-icon" height="72" width="72" viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path d="M8,72 L64,72 C68.418278,72 72,68.418278 72,64 L72,8 C72,3.581722 68.418278,-8.11624501e-16 64,0 L8,0 C3.581722,8.11624501e-16 -5.41083001e-16,3.581722 0,8 L0,64 C5.41083001e-16,68.418278 3.581722,72 8,72 Z" fill="currentColor" /><path d="M62,62 L51.315625,62 L51.315625,43.8021149 C51.315625,38.8127542 49.4197917,36.0245323 45.4707031,36.0245323 C41.1746094,36.0245323 38.9300781,38.9261103 38.9300781,43.8021149 L38.9300781,62 L28.6333333,62 L28.6333333,27.3333333 L38.9300781,27.3333333 L38.9300781,32.0029283 C38.9300781,32.0029283 42.0260417,26.2742151 49.3825521,26.2742151 C56.7356771,26.2742151 62,30.7644705 62,40.051212 L62,62 Z M16.349349,22.7940133 C12.8420573,22.7940133 10,19.9296567 10,16.3970067 C10,12.8643566 12.8420573,10 16.349349,10 C19.8566406,10 22.6970052,12.8643566 22.6970052,16.3970067 C22.6970052,19.9296567 19.8566406,22.7940133 16.349349,22.7940133 Z M11.0325521,62 L21.769401,62 L21.769401,27.3333333 L11.0325521,27.3333333 L11.0325521,62 Z" fill="#FFF" /></g></svg>
        </a>

        <a href="https://github.com/navchandar/" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile" title="GitHub Profile">
          <svg className="social-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M5.315 2.1c.791 -.113 1.9 .145 3.333 .966l.272 .161l.16 .1l.397 -.083a13.3 13.3 0 0 1 4.59 -.08l.456 .08l.396 .083l.161 -.1c1.385 -.84 2.487 -1.17 3.322 -1.148l.164 .008l.147 .017l.076 .014l.05 .011l.144 .047a1 1 0 0 1 .53 .514a5.2 5.2 0 0 1 .397 2.91l-.047 .267l-.046 .196l.123 .163c.574 .795 .93 1.728 1.03 2.707l.023 .295l.007 .272c0 3.855 -1.659 5.883 -4.644 6.68l-.245 .061l-.132 .029l.014 .161l.008 .157l.004 .365l-.002 .213l-.003 3.834a1 1 0 0 1 -.883 .993l-.117 .007h-6a1 1 0 0 1 -.993 -.883l-.007 -.117v-.734c-1.818 .26 -3.03 -.424 -4.11 -1.878l-.535 -.766c-.28 -.396 -.455 -.579 -.589 -.644l-.048 -.019a1 1 0 0 1 .564 -1.918c.642 .188 1.074 .568 1.57 1.239l.538 .769c.76 1.079 1.36 1.459 2.609 1.191l.001 -.678l-.018 -.168a5.03 5.03 0 0 1 -.021 -.824l.017 -.185l.019 -.12l-.108 -.024c-2.976 -.71 -4.703 -2.573 -4.875 -6.139l-.01 -.31l-.004 -.292a5.6 5.6 0 0 1 .908 -3.051l.152 -.222l.122 -.163l-.045 -.196a5.2 5.2 0 0 1 .145 -2.642l.1 -.282l.106 -.253a1 1 0 0 1 .529 -.514l.144 -.047l.154 -.03z" stroke-width="0" fill="currentColor" />
          </svg>
        </a>

        <a href="https://bsky.app/profile/navchandar.bsky.social/" target="_blank" rel="noopener noreferrer" aria-label="Bluesky Profile" title="Bluesky Profile">
          <svg className="social-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 64 57" width="92" height="81.9375"><defs><linearGradient x1="0" y1="0" x2="0" y2="1" id="sky"><stop offset="0" stop-color="currentColor" stop-opacity="1" /><stop offset="1" stop-color="currentColor" stop-opacity="1" /></linearGradient></defs><path fill="url(#sky)" d="M13.873 3.805C21.21 9.332 29.103 20.537 32 26.55v15.882c0-.338-.13.044-.41.867-1.512 4.456-7.418 21.847-20.923 7.944-7.111-7.32-3.819-14.64 9.125-16.85-7.405 1.264-15.73-.825-18.014-9.015C1.12 23.022 0 8.51 0 6.55 0-3.268 8.579-.182 13.873 3.805ZM50.127 3.805C42.79 9.332 34.897 20.537 32 26.55v15.882c0-.338.13.044.41.867 1.512 4.456 7.418 21.847 20.923 7.944 7.111-7.32 3.819-14.64-9.125-16.85 7.405 1.264 15.73-.825 18.014-9.015C62.88 23.022 64 8.51 64 6.55c0-9.818-8.578-6.732-13.873-2.745Z" /></svg>
        </a>

        <a href="https://stackoverflow.com/users/7964299/naveen?tab=profile/" target="_blank" rel="noopener noreferrer" aria-label="Stack Overflow Profile" title="Stack Overflow Profile">
          <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" fill="currentColor" viewBox="0 0 512 512"><path d="M392,440V320h40V480H64V320h40V440Z" /><path d="M149.1,308.77l198.57,40.87,8.4-39.32L157.5,269.45Zm26.27-93.12L359.22,300,376,263.76,192.18,178.92Zm50.95-89,156,127.78,25.74-30.52-156-127.78ZM328,32,294.61,55.8,415.43,216.17,448,192ZM144,400H348V360H144Z" /></svg>
        </a>
      </div>

      <i>
        <p>Copyright © {new Date().getFullYear()} All Rights Reserved</p>
      </i>
    </div>
  );
}

export default Footer