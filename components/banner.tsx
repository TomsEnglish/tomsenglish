"use client";

import Image from "next/image";
import BannerImg from "./banner.jpg";

type BannerContent = {
  title: any;
  subtitle: any;
  button: any;
};

export default function Banner({ title, subtitle, button }: BannerContent) {
  return (
    <div className="relative flex flex-col h-fit w-full! items-center bg-primary-card">
      {/* <Image
        src={BannerImg}
        style={{ objectFit: "cover" }}
        className="opacity-15 m-0!"
        sizes="100vw"
        fill
        alt="Students at university"
      /> */}
      <div className="z-40 container-fluid flex flex-col gap-4 pt-6 pb-10 md:pt-10 md:pb-12">
        <div className="flex flex-col gap-0.5  pr-12 sm:pr-0">
          <h1 className="mb-0!">{title}</h1>
          <p>{subtitle}</p>
        </div>
        {/* {button} */}
      </div>
    </div>
  );
}
