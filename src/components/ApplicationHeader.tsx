type ApplicationHeaderProps = {
  title: string;
  description: string;
};

export const ApplicationHeader = ({
  application,
}: {
  application: ApplicationHeaderProps;
}) => {
  return (
    <div className="card bg-base-300 shadow-md">
      <div className="card-body">
        <div className="flex flex-col items-center">
          <div>
            <h1 className="text-lg">Welcome to</h1>
            <h2 className="text-3xl font-semibold text-primary">
              {application.title}!
            </h2>
            <h2 className="pt-1 text-lg">{application.description}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};
