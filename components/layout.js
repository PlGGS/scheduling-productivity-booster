import Head from 'next/head';
import Header from './header';
import Footer from './footer';

const Layout = (props) => (
    <div>
       <Head>
          <title>Scheduling Productivity Booster</title>
          <meta name="DePaul University CSC394 Scheduler" content="By: Saiyed Irfanullah, Isaiah Antonio, Kuiper Poznyak, Nathan Santiago, David Shargorodsky, Blake Boris" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header/>
        <div id="front">
            {props.children}
        </div>
        <Footer />
    </div>
);

export default Layout;