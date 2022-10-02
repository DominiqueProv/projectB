import Navbar from "../NavBar";
import Footer from "../Footer";
import BabiesContextProvider from "../../context/BabiesContext";

const LayoutDefault = (props) => {
  return (
    <>
      <BabiesContextProvider>
        <Navbar />
        <main className="max-w-[1920px] min-h-[calc(100vh-255px)] mx-auto px-2 md:px-4 pt-4">
          {props.children}
        </main>
        <Footer />
      </BabiesContextProvider>
    </>
  );
};

export default LayoutDefault;
