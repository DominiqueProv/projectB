import React from "react";
import NoteOperation from "../components/NoteOperation";
import FileOperation from "../components/FileOperation";
import LayoutDefault from "../components/layouts/LayoutDefault";
import { FaPhotoVideo } from "react-icons/fa";

const Dashboard = () => {
  return (
    <LayoutDefault>
      <header className="flex items-center space-x-3 h-20">
        <h1 className="_title-xl">Timeline</h1>
        <FaPhotoVideo className="text-indigo-500" size={30} />
      </header>
      <hr />
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
