import Helmet from "react-helmet";
import AboutPoints from "../../components/about/AboutPoints";

export default function AboutPage() {
  return (
    <div className="my-24">
      <Helmet>
        <title>About Page - Alexandria</title>
        <meta
          name="About Page"
          content="We are a dead-simple notetaking app for your programming-related
          notes, but way more than that."
        />
      </Helmet>
      <AboutPoints />
    </div>
  );
}
