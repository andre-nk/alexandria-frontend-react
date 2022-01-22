import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function SocialAuthComponent({github, google}) {
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <p className="text-minor-text self-center text-sm my-4 font-light duration-200">
        - or -
      </p>
      <div className="flex w-full">
        <button
          onClick={github}
          className="bg-primary-white text-major-text hover:bg-primary-border border border-primary-border rounded-md text-medium flex align-center justify-center flex-1 px-4 py-3 duration-200 mb-6 mr-1.5"
        >
          <FaGithub size={20} className="self-center"></FaGithub>
          <p className="pl-2 self-center">Github</p>
        </button>
        <button
          onClick={google}
          className="bg-primary-white text-major-text hover:bg-primary-border border border-primary-border rounded-md text-medium flex align-center justify-center flex-1 px-4 py-3 duration-200 mb-6 ml-1.5"
        >
          <FcGoogle size={20} className="self-center"></FcGoogle>
          <p className="pl-2 self-center">Google</p>
        </button>
      </div>
    </div>
  );
}
