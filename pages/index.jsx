import LayoutDefault from "../components/layouts/LayoutDefault";
import NavLinkPrimary from "../components/buttons/NavLinkPrimary";
import Icon from "../components/buttons/Icon";

const Home = () => {
  return (
    <LayoutDefault>
      <h1 className="mb-5 text-7xl uppercase font-extrabold text-center">
        <span className="_linear-wipe inline-block">
          your private <br />
          digital journal
        </span>{" "}
        🥳
      </h1>
      <section>
        <div className="h-[150px] lg:h-[300px] backdrop-blur-sm flex-col gap-7 flex items-center justify-center rounded-lg mt-8">
          <h3 className="text-center font-medium">
            How about a break from sharing! <br />
            Follow the progress of your love ones
          </h3>
          <div className="flex gap-4">
            <NavLinkPrimary
              exact
              url="/signup"
              label="Create an account"
              xClass={"px-10 py-4 rounded-md"}
            />
            <NavLinkPrimary
              exact
              url="/login"
              label="Login"
              xClass={"px-10 py-4 rounded-md"}
            />
          </div>
        </div>
        <div className="grid sm:grid-cols-3 gap-8 my-8">
          <div className="aspect-square bg-slate-100 rounded-xl"></div>
          <div className="aspect-square bg-slate-100 rounded-xl"></div>
          <div className="aspect-square bg-slate-100 rounded-xl"></div>
        </div>
      </section>
    </LayoutDefault>
  );
};

export default Home;
