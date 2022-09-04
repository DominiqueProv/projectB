import React from "react";
import LayoutDefault from "../components/layouts/LayoutDefault";
import UpdateUser from "../components/modals/UpdateUser";

const Update = () => {
  return (
    <LayoutDefault>
      <header className="flex items-center justify-center space-x-3 bg-blue-100 rounded-md p-2">
        <h1 className="_title-xl">Update User</h1>
      </header>
      <hr />
      <section className="mt-10">
        <UpdateUser />
      </section>
    </LayoutDefault>
  );
};

export default Update;
