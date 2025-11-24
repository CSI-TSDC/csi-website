'use client'

const Footer = () => {
  return (
    <footer id="Contact" className="py-4 md:py-8 px-8 md:px-10 flex flex-col justify-between bg-[#1a1a1a] text-white">
      <div className="w-full flex flex-row justify-between items-end flex-wrap gap-6 mb-6">
        <div className="flex text-[17vw]/[14vw] h-full ">
          <span>CSI</span>
        </div>
        <div className="w-max flex flex-wrap">
          <div className="flex flex-row w-max gap-20 flex-shrink-0 mr-20">
            <div className="flex flex-col space-y-3">
              <a href="#">
                <span className="mr-2">[ ]</span>
                <span>About Us</span>
              </a>
              <a href="#">
                <span className="mr-2">[ ]</span>
                <span>Projects</span>
              </a>
              <a href="#">
                <span className="mr-2">[ ]</span>
                <span>Events</span>
              </a>
              <a href="#">
                <span className="mr-2">[ ]</span>
                <span>Gallery</span>
              </a>
              <a href="#">
                <span className="mr-2">[ ]</span>
                <span>Team</span>
              </a>
            </div>
            <div className="flex flex-col space-y-3">
              <a href="#">
                <span className="mr-2">[ ]</span>
                <span>LinkedIn</span>
              </a>
              <a href="#">
                <span className="mr-2">[ ]</span>
                <span>Instagram</span>
              </a>
              <a href="#">
                <span className="mr-2">[ ]</span>
                <span>Github</span>
              </a>
              <a href="#">
                <span className="mr-2">[ ]</span>
                <span>TSDC</span>
              </a>
              <a href="#">
                <span className="mr-2">[ ]</span>
                <span>TSDC2</span>
              </a>
            </div>
          </div>
          <div className="flex flex-col w-max space-y-6">
            <div className="flex flex-row gap-6 w-[260px]">
              <span>A</span>
              <span>Thakur Shyamnarayan Degree College, Thakur Complex, Kandivali (E), Mumbai - 400067</span>
            </div>
            <div className="flex flex-row gap-6 w-[260px]">
              <span>C</span>
              <a href="">
                <span>+919969972299</span>
              </a>
            </div>
            <div className="flex flex-row gap-6 w-[260px]">
              <span>E</span>
              <span>csi@tsdcmumbai.om</span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full border-t py-6">
        <div className="flex flex-row space-x-4">
          <span>
            <span>2025©️TSDC. All Copyrights Reserved.</span>
          </span>
          <span>
            <span>Privacy Policy</span>
          </span>
          <span>
            <span>Terms</span>
          </span>
        </div>
        <div className="flex flex-row space-x-4">
          <span>
            <img src="" alt="" />
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
