import { NextPage } from "next";
import Link from "next/link";
import { ReactNode } from "react";
import { Anchor } from "./style";

export type LinkButtonProps = {
  Component: string | ReactNode;
  href: string;
};

const LinkButton: NextPage<LinkButtonProps> = ({ Component, href }) => {
  return (
    <Link href={href}>
      <Anchor>{Component}</Anchor>
    </Link>
  );
};

export default LinkButton;
