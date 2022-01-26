export default function AboutPoints() {
  return (
    <div className="flex flex-col space-y-28">
      <div className="w-[52%] px-20 flex flex-col space-y-5">
        <h2 className="text-4xl font-semibold">What is Alexandria?</h2>
        <span className="text-lg leading-8">
          We are a dead-simple notetaking app for your programming-related
          notes, but way more than that. Here, you can easily share your notes
          with your teams and swiftly access their code snippet into your
          project in VSCode! Oh yes... it's indefinitely <strong>free!</strong>
        </span>
        <span className="text-base leading-7 italic font-light pt-4">
          <span>
            Alexandria is maintained by myself <strong>(@fullstack.dre)</strong> as a
            solo-developer! <br/>
            Connect with me <span className="underline cursor-pointer hover:text-primary-blue">down below</span> and feel free to share your thoughts!
          </span>
        </span>
      </div>

      <div className="w-full flex pr-20 flex-row-reverse justify-between items-center">
        <div className="w-5/12 space-y-5">
          <h2 className="text-4xl font-semibold">Simply elegant editor.</h2>
          <p className="text-lg leading-8">
            Alexandria provides an elegant and easy-to-use editor just for you.
            More than just a rich-text editor, we crafted a dedicated code
            snippet feature with some famous theme highlighters and a bunch of
            language support. It will exactly feel like your day-to-day IDE!
          </p>
        </div>
        <div className="w-[1rem]"></div>
        <div className="w-[45%]">
          <img
            src="/mockup-1.png"
            alt="mockup-1.png"
            className="w-full object-contain"
          />
        </div>
      </div>

      <div className="w-full px-20 flex items-center justify-between">
        <div className="w-5/12 space-y-5">
          <h2 className="text-4xl font-semibold">Swift access!</h2>
          <p className="text-lg leading-8">
            Alexandria is available throughout many platforms, even a VSCode
            Extension. The extension allows you can manage your notes and
            quickly drop your code snippets directly to your current project!
          </p>
        </div>
        <div className="w-5/12 bg-gray-200"></div>
      </div>

      <div className="w-full px-20 flex flex-row-reverse items-center justify-between">
        <div className="w-5/12 space-y-5">
          <h2 className="text-4xl font-semibold">Safe and Share!</h2>
          <p className="text-lg leading-8">
            Easily collaborate with your teams through our secured share,
            including a live edit and comments! We made it easy to connect your
            teams and notes -- so you can discuss and move as one!
          </p>
        </div>
        <div className="w-5/12 bg-gray-200"></div>
      </div>
    </div>
  );
}
