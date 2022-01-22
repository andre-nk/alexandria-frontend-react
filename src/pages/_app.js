import "../styles/globals.css";
import { AuthContextProvider } from "../context/AuthContext";
import Layout from "../components/layout/Layout";

function SafeHydrate({ children }) {
  return (
    <div suppressHydrationWarning>
      {typeof window === "undefined" ? null : children}
    </div>
  );
}

function MyApp({ Component, pageProps }) {
  return (
    <SafeHydrate>
      <AuthContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthContextProvider>
    </SafeHydrate>
  );
}

export default MyApp;
