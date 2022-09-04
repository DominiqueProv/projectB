import Navbar from "../../components/Navbar";

const LayoutDefault = (props) => {
  return (
    <>
      <Navbar />
      <main className="max-w-[1920px] mx-auto px-4 pt-4">{props.children}</main>
    </>
  );
};

export default LayoutDefault;
