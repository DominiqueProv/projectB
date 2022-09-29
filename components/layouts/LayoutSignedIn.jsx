import Navbar from "../NavBar";
import Footer from "../Footer";
import FilesContextProvider from "../../context/FilesContext";
import BabiesContextProvider from "../../context/BabiesContext";

const LayoutDefault = (props) => {
  return (
    <>
      <FilesContextProvider>
        <BabiesContextProvider>
          <Navbar />
          <main className="max-w-[1920px] min-h-[calc(100vh-255px)] mx-auto px-4 pt-4">
            {props.children}
          </main>
          <Footer />
        </BabiesContextProvider>
      </FilesContextProvider>
    </>
  );
};

export default LayoutDefault;