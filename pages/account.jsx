import LayoutSignedIn from "../components/layouts/LayoutSignedIn";
import UpdateUser from "../components/user/UpdateUser";
import PageTitle from "../components/text/PageTitle";
import UserInfo from "../components/user/UserInfo";
import MembersGrid from "../components/user/MembersGrid";
import AccountWidget from "../components/user/AccountWidget";

const Account = () => {
  return (
    <LayoutSignedIn>
      <PageTitle title={"Your account"} />
      <section className="flex flex-col-reverse sm:flex-row gap-3 mt-4">
        <UserInfo />
        <UpdateUser />
      </section>
      <section className="flex flex-col-reverse sm:flex-row gap-3 mt-4">
        <MembersGrid />
        <AccountWidget />
      </section>
    </LayoutSignedIn>
  );
};

export default Account;