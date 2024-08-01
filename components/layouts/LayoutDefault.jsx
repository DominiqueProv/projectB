import Navbar from "../NavBar";
import Footer from "../Footer";

const LayoutDefault = (props) => {
  return (
    <>
      <Navbar />
      <main className="max-w-[1920px] min-h-[calc(100vh-255px)] mx-auto px-2 md:px-4 sm:pt-8">
        {props.children}
      </main>
      <Footer />
    </>
  );
};

export default LayoutDefault;
