import LayoutDefault from "../components/layouts/LayoutDefault";
import UpdateUser from "../components/account/UpdateUser";
import PageTitle from "../components/text/PageTitle";
import UserInfo from "../components/account/UserInfo";
import MembersGrid from "../components/account/MembersGrid";
import { useAuth } from "../context/AuthContext";

const Account = () => {
  const { user } = useAuth();

  return (
    <LayoutDefault>
      <PageTitle
        title={`${user.displayName ? user.displayName + "'s" : "Your"} account`}
      />
      <section className="flex flex-col lg:flex-row gap-3 mt-4">
        <div className="lg:w-1/2">
          <UserInfo />
          <UpdateUser />
        </div>
        <div className="lg:w-1/2">
          <MembersGrid />
        </div>
      </section>
    </LayoutDefault>
  );
};

export default Account;
