import React from "react";
import LayoutDefault from "../components/layouts/LayoutDefault";
import UpdateUser from "../components/user/UpdateUser";
import PageTitle from "../components/text/PageTitle";
import UserInfo from "../components/user/UserInfo";

const Update = () => {
  return (
    <LayoutDefault>
      <PageTitle title={"Your account"} />
      <section className="flex flex-col-reverse sm:flex-row gap-3 mt-4">
        <UserInfo />
        <UpdateUser />
      </section>
    </LayoutDefault>
  );
};

export default Update;
