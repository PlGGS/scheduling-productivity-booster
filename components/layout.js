import Head from "next/head";
import Header from "./header";
import Footer from "./footer";

const Layout = (props) => (
  <div>
    <Head>
      <title>Scheduling Productivity Booster</title>
      <meta
        name="DePaul University CSC394 Scheduler"
        content="By: Saiyed Irfanullah, Isaiah Antonio, Kuiper Poznyak, Nathan Santiago, David Shargorodsky, Blake Boris"
      />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Header />
    <div className="wrapper">
      <div id="front">{props.children}</div>
    </div>
    <style jsx>{`
      .front {
        height: 100%;
      }
    //   .wrapper {
    //     border-style: solid;
    //     border-color: yellow;
    //     grid-template-columns: repeat(3, 1fr);
    //     grid-template-rows: repeat(2, 1fr);
    //     grid-gap: 10px;
    //     width: 100%;
    //     height: 100%;
    //   }
    `}</style>
  </div>
);

export default Layout;
