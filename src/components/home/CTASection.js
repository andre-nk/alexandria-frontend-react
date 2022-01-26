import { useNavigate } from "react-router-dom";

export default function CTASection() {
  const navigate = useNavigate();

  return (
    <div className="w-full px-20 mt-24 flex flex-col justify-center items-center">
      <div className="h-20 w-20">
        <img src="/logo.png" alt="logo" className="object-cover" />
      </div>
      <h2 className="text-4xl mt-6 mb-4 font-semibold">
        Try Alexandria today.
      </h2>
      <p className="text-lg text-major-text">
        Start taking your notes and see them in action!
      </p>
      <p className="text-lg text-major-text mt-1">It's free. Indefinitely.</p>
      <button
        onClick={() => {
          navigate("/auth/login");
        }}
        className="bg-primary-blue px-10 py-2.5 mt-8 min-h-full text-primary-bg hover:bg-active-blue rounded-md text-base border duration-200"
      >
        Try Alexandria free
      </button>
    </div>
  );
}
