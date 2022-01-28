import Helmet from "react-helmet";

export default function NotePage() {
  return (
    <div>
      <Helmet>
        <title>Your notes - Alexandria</title>
        <meta
          name="Your notes"
          content="Browse your programming notes collection here"
        />
      </Helmet>
      <p>Note Page</p>
    </div>
  );
}
