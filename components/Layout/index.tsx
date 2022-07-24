import { NextPage } from "next";
import { LayoutType } from "../../style.props.config";
import { RootLayout } from "./style";

const Layout: NextPage<LayoutType> = ({ children, ...props }) => {
  return <RootLayout {...props}>{children}</RootLayout>;
};

export default Layout;
