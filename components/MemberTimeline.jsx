import FileCard from "./cards/FileCard";

const MemberTimeline = ({ babyData, filesData }) => {
  return (
    <section className="mt-10">
      <h2 className="mb-5 text-6xl leading-[65px] lg:leading-[100px] _linear-wipe">
        {babyData && `${babyData?.name}'s timeline`}
      </h2>
      <div className="flex lg:mt-10 gap-6">
        <div className="grid lg:grid-cols-3 xl:grid-cols-4 w-full gap-5 auto-rows-max">
          {filesData.length > 0 ? (
            filesData
              .sort(
                (a, b) =>
                  b?.metadata?.customMetadata?.originalDate -
                  a?.metadata?.customMetadata?.originalDate
              )
              .map((file, i) => {
                return (
                  <FileCard
                    file={file}
                    key={i}
                    index={i}
                    dob={babyData?.date}
                  />
                );
              })
          ) : (
            <>
              <div className="relative bg-gray-50 rounded-lg aspect-card w-full p-4">
                <div className="bg-gray-100 aspect-video rounded-lg h-50"></div>
                <div className="absolute bottom-5 left-5 space-y-2">
                  <div className="bg-gray-200 rounded-full w-64 h-4"></div>
                  <div className="bg-gray-100 rounded-full w-56 h-4"></div>
                </div>
              </div>
              <div className="relative bg-gray-50 rounded-lg aspect-card w-full p-4">
                <div className="bg-gray-100 aspect-video rounded-lg h-50"></div>
                <div className="absolute bottom-5 left-5 space-y-2">
                  <div className="bg-gray-200 rounded-full w-64 h-4"></div>
                  <div className="bg-gray-100 rounded-full w-56 h-4"></div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default MemberTimeline;
