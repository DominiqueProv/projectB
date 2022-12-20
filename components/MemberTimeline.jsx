import FileCard from "./cards/FileCard";
import UploadButton from "./buttons/UploadButton";

const MemberTimeline = ({ babyData, filesData }) => {
  return (
    <section className="mt-10">
      <h2 className="mb-5 text-6xl leading-[100px] _linear-wipe">
        {`${babyData?.name}'s story`}
      </h2>
      <div className="flex lg:mt-10 gap-6">
        <div className="grid lg:grid-cols-3 xl:grid-cols-5 w-full gap-5">
          <UploadButton />
          {filesData
            ? filesData
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
            : null}
        </div>
      </div>
    </section>
  );
};

export default MemberTimeline;
