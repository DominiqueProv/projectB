const PageTitle = ({ title }) => {
  return (
    <header className="flex items-center space-x-3 bg-indigo-100 rounded-md p-2">
      <h2 className="_title-md">{title}</h2>
    </header>
  );
};

export default PageTitle;
