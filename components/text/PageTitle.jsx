const PageTitle = ({ title }) => {
  return (
    <header className="flex items-center justify-center space-x-3 bg-blue-100 rounded-md p-2">
      <h1 className="_title-xl">{title}</h1>
    </header>
  );
};

export default PageTitle;
