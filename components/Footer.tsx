import { Chakra_Petch } from "next/font/google";

const font = Chakra_Petch({ weight: "400", subsets: ["latin"] });

const Footer = () => {
  
  return (
    <footer
      className={`${font.className} w-full my-8 md:my-14 text-[14px] lg:text-[1.5rem] m-auto 
    justify-center text-center`}
    >
      create with ❤️ by dara boy smos.
    </footer>
  );
};

export default Footer;
