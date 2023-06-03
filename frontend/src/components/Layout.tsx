import { ReactNode } from "react";
import NavBar from "./NavBar";

interface Props {
  children: ReactNode;
  title?: string;
}

const Layout = ({ title, children }: Props) => {
  return (
    <div>
      <NavBar title={title} />
      {children}
    </div>
  );
};
export default Layout;
