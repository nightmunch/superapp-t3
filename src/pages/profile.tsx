import type { NextPage } from "next";
import { getSession, useSession } from "next-auth/react";

const Profile: NextPage = () => {
  const { data: sessionData } = useSession();
  return (
    <div className="flex justify-center rounded-xl bg-base-300 p-2 shadow-md">
      <div className="flex flex-col gap-5 p-5 sm:flex-row-reverse">
        <h1 className="text-xl font-semibold text-primary">
          {sessionData?.user?.name}
        </h1>
      </div>
    </div>
  );
};

export const getServerSideProps = async (context: any) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};

export default Profile;
