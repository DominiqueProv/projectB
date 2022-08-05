const Timeline = ({ files }) => {
  console.log(files);
  return (
    <div className="">
      {files.length ? (
        files.map((file) => {
          const date = new Date(file.metadata.timeCreated);
          const currentDayOfMonth = date.getDate();
          const currentMonth = date.getMonth();
          const currentYear = date.getFullYear();
          const dateString = `${currentDayOfMonth}-${
            currentMonth + 1
          }-${currentYear};`;
          console.log(dateString);
        })
      ) : (
        <></>
      )}
    </div>
  );
};

export default Timeline;
