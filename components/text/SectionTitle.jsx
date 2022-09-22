const PageTitle = ({ title }) => {
  return (
    <header className="flex items-center space-x-3 bg-indigo-100 rounded-md p-2">
      <h1 className="_title-md">{title}</h1>
    </header>
  );
};

export default PageTitle;
