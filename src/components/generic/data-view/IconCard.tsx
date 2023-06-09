import React from "react";
import { Project } from "@prisma/client";
import { FaHeading, FaTag, FaTree } from "react-icons/fa";
import {FaCheck} from "react-icons/all";

interface IconCardProps {
  title: string;
  value: string;
  className?: string;
  icon: any;
  trailing?: any;
  valueClassName?: string;
}

const IconCard = (props: IconCardProps) => {
  return (
    <article className={`${props.className} rounded-lg border border-gray-200 bg-white p-3 mb-3 flex justify-between items-center`}>
      <div className="flex items-center gap-4">
        <span className="hidden rounded-full bg-gray-100 p-2 text-gray-600 sm:block">{props.icon}</span>

        <div>
          <p className="text-sm text-gray-500">{props.title}</p>

          <p className={props.valueClassName ?? "text-lg font-medium text-gray-900"}>{props.value}</p>

        </div>
      </div>
      <div>{props.trailing}</div>
    </article>
  );
};

export default IconCard;
