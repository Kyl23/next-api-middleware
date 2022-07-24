import { NextPage } from "next";
import Layout from "../components/Layout";
import NavBar, { NavBarDataType } from "../components/NavBar";

const SmallBox: NextPage = () => {
  return <Layout backgroundColor="white"/>;
};

const data: NavBarDataType[] = [
  { Component: <SmallBox />, link: "https://google.com" },
  { Component: <SmallBox />, link: "https://facebook.com" },
];

const Home: NextPage = () => {
  return (
    <Layout>
      <NavBar data={data} />
    </Layout>
  );
};

export default Home;
