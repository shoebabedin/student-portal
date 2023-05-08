import Link from "next/link";

const Footer = () => {
  return (
    <>
      <div className="shadow-[0px_2px_22px_-10px_#000] w-full bg-white">
        <div className="container">
          <div className="flex items-center justify-center py-3">
            <p className="text-black">
              Made by{" "}
              <Link
                className="font-medium text-sky-800"
                href={"https://shoebabedin12.github.io/shoeb-abedin/"}
              >
                Shoeb Abedin
              </Link>{" "}
              © {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
