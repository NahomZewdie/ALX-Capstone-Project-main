
import PropTypes from 'prop-types'; 
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

// Definition of children property type validation
Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
