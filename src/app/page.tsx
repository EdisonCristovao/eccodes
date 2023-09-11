import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col md:flex-row md:justify-center items-center text-white grow mx-10 my-5 md:my-0">
      <div className="flex flex-col justify-around h-[80%] md:h-0 mt-40 md:mt-0">
        <div className="mb-10">
          <p className="text-lg md:text-lg">Hi all, I am</p>
          <h1 className="text-6xl md:text-7xl ml-[-8px] my-[-8px]">
            Edison Cristovão
          </h1>
          <h2 className="text-base md:text-3xl text-secondary-blue">
            {"> Full-stack develope"}r
          </h2>
        </div>

        <div>
          {/* <h3>{`// complete the game to continue`}</h3> */}
          <h3 className="text-sm md:text-base">{`// you can also see it on my Github`}</h3>
          <div>
            <span className="text-secondary-blue text-sm md:text-base">
              const
            </span>{" "}
            <span className="text-accent-green text-sm md:text-base">
              {" "}
              githubLink
            </span>
            {" = "}
            <Link href={"https://github.com/EdisonCristovao"} target="_blank">
              <span className="text-accent-nude hover:underline text-sm md:text-base">
                “https://github.com/EdisonCristovao”
              </span>
            </Link>
          </div>
        </div>
      </div>

      <div className="hidden md:inline">
        {/* <div className="h-56 w-56 bg-black"></div> */}
        <Image
          src={"/imgs/profile-photo.png"}
          width={500}
          height={200}
          alt=""
        />
      </div>
    </div>
  );
}
