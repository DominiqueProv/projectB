import React from "react";
import LayoutDefault from "../components/layouts/LayoutDefault";
import UpdateUser from "../components/UpdateUser";
import PageTitle from "../components/text/PageTitle";

const Update = () => {
  return (
    <LayoutDefault>
      <PageTitle title={"Update User"} />
      <hr />
      <UpdateUser />
    </LayoutDefault>
  );
};

export default Update;
