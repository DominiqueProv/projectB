import React from "react";
import NoteOperation from "../components/NoteOperation";
import FileOperation from "../components/FileOperation";
import LayoutDefault from "../components/layouts/LayoutDefault";
import Image from "next/image";

const Dashboard = () => {
  return (
    <LayoutDefault>
      <header className="flex items-center h-20">
        <h1 className="_title-xl">Timeline</h1>
      </header>
      <section className="mt-10">
        <FileOperation />
      </section>
      <hr className="my-10" />
      <section className="mt-10">
        <NoteOperation />
      </section>
    </LayoutDefault>
  );
};

export default Dashboard;
