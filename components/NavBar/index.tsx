import { NextPage } from "next";
import Link from "next/link";
import { ReactNode } from "react";
import Layout from "../Layout";
import LinkButton from "./LinkButton";

export type NavBarDataType = {
  Component: ReactNode;
  link?: string;
};

export type NavBarType = {
  data: NavBarDataType[];
};

const NavBar: NextPage<NavBarType> = ({ data }) => {
  return (
    <Layout width="20%" backgroundColor="gray">
      {data.map((element, index) => {
        return (
          <LinkButton
            key={index}
            href={element.link ? element.link : ""}
            Component={element.Component}
          />
        );
      })}
    </Layout>
  );
};

export default NavBar;
