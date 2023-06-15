export default function Home() {
  return (
    <div className="flex justify-center items-center text-white grow">
      <div className="mr-40">
        <div className="mb-10">
          <p className="">Hi all, I am</p>
          <h1 className="ml-[-8px] my-[-10px]">Edison Cristovao</h1>
          <h2 className="text-secondary-blue">{"> Full-stack develope"}r</h2>
        </div>

        <div>
          <h3>{`// complete the game to continue`}</h3>
          <h3>{`// you can also see it on my Github page`}</h3>
          <h3>
            <span className="text-secondary-blue">const</span>{" "}
            <span className="text-accent-green"> githubLink</span>
            {" = "}
            <span className="text-accent-nude">
              “https://github.com/example/url”
            </span>
          </h3>
        </div>
      </div>

      <div>
        <div className="h-56 w-56 bg-black"></div>
      </div>
    </div>
  );
}
