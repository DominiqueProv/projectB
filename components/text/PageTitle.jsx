const PageTitle = ({ children, title }) => {
  return (
    <header className="flex items-center justify-center space-x-3 bg-blue-100 rounded-md p-2">
      {children}
      <h1 className="_title-xl">{title}</h1>
    </header>
  );
};

export default PageTitle;
