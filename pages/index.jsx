import LayoutDefault from "../components/layouts/LayoutDefault";
import PageTitle from "../components/text/PageTitle";
const Home = () => {
  return (
    <LayoutDefault>
      <PageTitle title={"Home page"} />
      <section>
        <h2>Main page content</h2>
        <div className="bg-blue-200 aspect-video">sdkjfh</div>
      </section>
    </LayoutDefault>
  );
};

export default Home;
