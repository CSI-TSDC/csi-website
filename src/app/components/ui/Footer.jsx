'use client'

const Footer = () => {
  const handleSendMail = () => {
    const mailtoLink = `mailto:csi@tsdcmumbai.in?subject=Become a Collaborator or Sponsor`
    window.location.href = mailtoLink
  }
  return (
    <>
      <footer id="Contact" className="w-full h-max py-4 md:py-8 px-8 md:px-16 min-h-[40vh] flex flex-wrap justify-between bg-white text-black font-satoshi font-normal border-b">
        <div className="flex flex-col space-y-4">
          <div className="relative font-medium text-3xl w-max">
            <span className="block float-left">Find us at</span>
          </div>
          <div className="relative font-light text-base opacity-70">
            <span className="float-left">Thakur Shyamnarayan Degree College,</span>
            <span className="float-left clear-both">90ft Road, Thakur Complex,</span>
            <span className="float-left clear-both">Kandivali (E), Mumbai - 400067</span>
          </div>
          <div className="relative flex">
            <span className="block h-[50px] w-auto mr-3">
              <img className="w-full h-full" src="/assets/images/csi_logo.png" alt="CSI Logo" />
            </span>
            <span className="block h-[50px] w-auto">
              <img className="w-full h-full" src="/assets/images/tsdc_logo.png" alt="TSDC Logo" />
            </span>
          </div>
        </div>
        <div className="flex flex-row flex-wrap text-xl font-light space-x-14">
          <div className="flex flex-col">
            <div className="mb-4">
              Quick Links
            </div>
            <div className="flex flex-col space-y-1 text-base">
            <a href="#">
                <span>C.S.I</span>
              </a>
              <a href="#">
                <span>T.S.D.C</span>
              </a>
              <a href="#">
                <span>Hackvision</span>
              </a>
              <a href="#">
                <span>Gallery</span>
              </a>
              <a href="#">
                <span>Events</span>
              </a>
              <a href="#">
                <span>Teams</span>
              </a>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="mb-4">
              <span>About</span>
            </div>
            <div className="flex flex-col space-y-1 text-base">
              <a href="#">
                <span>About CSI</span>
              </a>
              <a href="#">
                <span>About TSDC</span>
              </a>
              <span>
                <span>Join Us</span>
              </span>
              <a href="#">
                <span>csi@tsdcmumbai.in</span>
              </a>
              <a href="#">
                <span>+91 12345 67890</span>
              </a>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="mb-4">
              <span>Stay Connected</span>
            </div>
            <div className="flex flex-col text-base mb-4">
              <span className="block">Get updates on events, projects,</span>
              <span className="block clear-both">and everything conducted by our</span>
              <span className="block clear-both">committee.</span>
            </div>
            <div className="flex flex-row space-x-3">
              <span className="block w-[25px]">
              <svg
                width="64px"
                height="64px"
                className="w-full h-full"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
                    fill="#0F0F0F"
                  ></path>

                  <path
                    d="M18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z"
                    fill="#0F0F0F"
                  ></path>

                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M1.65396 4.27606C1 5.55953 1 7.23969 1 10.6V13.4C1 16.7603 1 18.4405 1.65396 19.7239C2.2292 20.8529 3.14708 21.7708 4.27606 22.346C5.55953 23 7.23969 23 10.6 23H13.4C16.7603 23 18.4405 23 19.7239 22.346C20.8529 21.7708 21.7708 20.8529 22.346 19.7239C23 18.4405 23 16.7603 23 13.4V10.6C23 7.23969 23 5.55953 22.346 4.27606C21.7708 3.14708 20.8529 2.2292 19.7239 1.65396C18.4405 1 16.7603 1 13.4 1H10.6C7.23969 1 5.55953 1 4.27606 1.65396C3.14708 2.2292 2.2292 3.14708 1.65396 4.27606ZM13.4 3H10.6C8.88684 3 7.72225 3.00156 6.82208 3.0751C5.94524 3.14674 5.49684 3.27659 5.18404 3.43597C4.43139 3.81947 3.81947 4.43139 3.43597 5.18404C3.27659 5.49684 3.14674 5.94524 3.0751 6.82208C3.00156 7.72225 3 8.88684 3 10.6V13.4C3 15.1132 3.00156 16.2777 3.0751 17.1779C3.14674 18.0548 3.27659 18.5032 3.43597 18.816C3.81947 19.5686 4.43139 20.1805 5.18404 20.564C5.49684 20.7234 5.94524 20.8533 6.82208 20.9249C7.72225 20.9984 8.88684 21 10.6 21H13.4C15.1132 21 16.2777 20.9984 17.1779 20.9249C18.0548 20.8533 18.5032 20.7234 18.816 20.564C19.5686 20.1805 20.1805 19.5686 20.564 18.816C20.7234 18.5032 20.8533 18.0548 20.9249 17.1779C20.9984 16.2777 21 15.1132 21 13.4V10.6C21 8.88684 20.9984 7.72225 20.9249 6.82208C20.8533 5.94524 20.7234 5.49684 20.564 5.18404C20.1805 4.43139 19.5686 3.81947 18.816 3.43597C18.5032 3.27659 18.0548 3.14674 17.1779 3.0751C16.2777 3.00156 15.1132 3 13.4 3Z"
                    fill="#0F0F0F"
                  ></path>
                </g>
              </svg>

              </span>
              <span className="block w-[25px]">
              <svg
                width="64px"
                height="64px"
                className="w-full h-full"
                viewBox="0 0 20 20"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                fill="#000000"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <title>github [#142]</title>
                  <desc>Created with Sketch.</desc>
                  <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g transform="translate(-140, -7559)" fill="#000000">
                      <g transform="translate(56, 160)">
                        <path
                          id="github-[#142]"
                          d="M94,7399 C99.523,7399 104,7403.59 104,7409.253 C104,7413.782 101.138,7417.624 97.167,7418.981 C96.66,7419.082 96.48,7418.762 96.48,7418.489 C96.48,7418.151 96.492,7417.047 96.492,7415.675 C96.492,7414.719 96.172,7414.095 95.813,7413.777 C98.04,7413.523 100.38,7412.656 100.38,7408.718 C100.38,7407.598 99.992,7406.684 99.35,7405.966 C99.454,7405.707 99.797,7404.664 99.252,7403.252 C99.252,7403.252 98.414,7402.977 96.505,7404.303 C95.706,7404.076 94.85,7403.962 94,7403.958 C93.15,7403.962 92.295,7404.076 91.497,7404.303 C89.586,7402.977 88.746,7403.252 88.746,7403.252 C88.203,7404.664 88.546,7405.707 88.649,7405.966 C88.01,7406.684 87.619,7407.598 87.619,7408.718 C87.619,7412.646 89.954,7413.526 92.175,7413.785 C91.889,7414.041 91.63,7414.493 91.54,7415.156 C90.97,7415.418 89.522,7415.871 88.63,7414.304 C88.63,7414.304 88.101,7413.319 87.097,7413.247 C87.097,7413.247 86.122,7413.234 87.029,7413.87 C87.029,7413.87 87.684,7414.185 88.139,7415.37 C88.139,7415.37 88.726,7417.2 91.508,7416.58 C91.513,7417.437 91.522,7418.245 91.522,7418.489 C91.522,7418.76 91.338,7419.077 90.839,7418.982 C86.865,7417.627 84,7413.783 84,7409.253 C84,7403.59 88.478,7399 94,7399"
                        />
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
              </span>
              <span className="block w-[25px]">
                <svg
                  width="64px"
                  height="64px"
                  className="w-full h-full"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M6 2C3.79086 2 2 3.79086 2 6V18C2 20.2091 3.79086 22 6 22H18C20.2091 22 22 20.2091 22 18V6C22 3.79086 20.2091 2 18 2H6ZM4 6C4 4.89543 4.89543 4 6 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V6ZM9 11C9 10.4477 8.55228 10 8 10C7.44772 10 7 10.4477 7 11V17C7 17.5523 7.44772 18 8 18C8.55228 18 9 17.5523 9 17V11ZM9.5 7.5C9.5 8.32843 8.82843 9 8 9C7.17157 9 6.5 8.32843 6.5 7.5C6.5 6.67157 7.17157 6 8 6C8.82843 6 9.5 6.67157 9.5 7.5ZM12 10C12.5523 10 13 10.4477 13 11V17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17V11C11 10.4477 11.4477 10 12 10ZM18 13.5714C18 11.9258 16.6594 10 14.5 10C13.9036 10 13.3329 10.1502 12.8203 10.4279C12.6395 10.1692 12.3395 10 12 10C11.4477 10 11 10.4477 11 11V12.9658C11.3974 12.2849 11.9759 12 12.5 12C13.3406 12 14 12.8032 14 13.5714V17C14 17.5523 14.4477 18 15 18C15.5523 18 16 17.5523 16 17V13.579C16 13.5865 16 13.5941 16 13.6017C16 13.6093 16 13.617 16 13.6246C16 13.6323 16 13.64 16 13.6477C16 13.6555 16 13.6632 16 13.671C16 13.6788 16 13.6866 16 13.6944C16 13.7022 16 13.7101 16 13.718C16 13.7258 16 13.7338 16 13.7417C16 13.7496 16 13.7576 16 13.7655C16 13.7735 16 13.7815 16 13.7896C16 13.7976 16 13.8057 16 13.8137C16 13.8218 16 13.8299 16 13.838C16 13.8462 16 13.8543 16 13.8625C16 13.8706 16 13.8788 16 13.887C16 13.8953 16 13.9035 16 13.9117C16 13.92 16 13.9283 16 13.9365C16 13.9448 16 13.9532 16 13.9615C16 13.9698 16 13.9782 16 13.9866C16 13.9949 16 14.0033 16 14.0117C16 14.0201 16 14.0286 16 14.037V17C16 17.5523 16.4477 18 17 18C17.5523 18 18 17.5523 18 17V13.5714Z"
                      fill="#000000"
                    />
                  </g>
                </svg>
              </span>
            </div>
          </div>
        </div>
      </footer>
      <div className="w-full h-max py-4 md:py-8 px-8 md:px-16 flex justify-between">
        <div>
          <span>Handcrafted by Tech Team</span>
        </div>
        <div>
          <span>©️2025 TSDC. All Rights Reserved.</span>
        </div>
      </div>
    </>
    
  );
};

export default Footer;
