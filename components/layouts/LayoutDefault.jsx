import Navbar from "../NavBar";
import Footer from "../Footer";

const LayoutDefault = (props) => {
  return (
    <>
      <Navbar />
      <main className="max-w-[1920px] min-h-[calc(100vh-255px)] mx-auto px-4 pt-4">
        {props.children}
      </main>
      <Footer />
    </>
  );
};

export default LayoutDefault;
