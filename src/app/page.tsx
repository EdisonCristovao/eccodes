import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex md:flex-row flex-col-reverse justify-between items-center text-white grow mx-10 my-5 md:my-0">
      <div>
        <div className="mb-10">
          <p className="">Hi all, I am</p>
          <h1 className="ml-[-8px] my-[-10px]">Edison Cristovão</h1>
          <h2 className="text-secondary-blue">{"> Full-stack develope"}r</h2>
        </div>

        <div>
          {/* <h3>{`// complete the game to continue`}</h3> */}
          <h3>{`// you can also see it on my Github`}</h3>
          <h3>
            <span className="text-secondary-blue">const</span>{" "}
            <span className="text-accent-green"> githubLink</span>
            {" = "}
            <Link href={"https://github.com/EdisonCristovao"} target="_blank">
              <span className="text-accent-nude hover:underline">
                “https://github.com/EdisonCristovao”
              </span>
            </Link>
          </h3>
        </div>
      </div>

      <div className="my-5 md:my-0">
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
