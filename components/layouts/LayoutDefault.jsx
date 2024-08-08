import Navbar from "../NavBar";
import Footer from "../Footer";

const LayoutDefault = (props) => {
  const { isDark } = props;
  return (
    <>
      <Navbar isDark={isDark} />
      <main
        className={`max-w-[1920px] min-h-[calc(100vh-255px)] mx-auto px-2 md:px-4 sm:pt-8 ${
          isDark ? "bg-indigo-900" : ""
        }`}
      >
        {props.children}
      </main>
      <Footer isDark={isDark} />
    </>
  );
};

export default LayoutDefault;
