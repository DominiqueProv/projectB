const PageTitle = ({ children, title }) => {
  return (
    <div className="text-center">
      <header className="inline-flex items-center justify-center space-x-3 bg-slate-100 rounded-full py-2 px-10">
        {children}
        <h1 className="_title-xl">{title}</h1>
      </header>
    </div>
  );
};

export default PageTitle;
