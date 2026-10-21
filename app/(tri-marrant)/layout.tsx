import { TriFooter } from "../components/TriFooter";
import { TriHeader } from "../components/TriHeader";

export default function TriMarrantLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TriHeader />
      <main>{children}</main>
      <TriFooter />
    </>
  );
}
