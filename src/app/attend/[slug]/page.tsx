"use client";
import AttendContainer from "@/containers/attend/AttendContainer";

type Props = {
  params: {
    slug: number;
  }
}

const AttendPage = ({ params }:Props) => {
  return <AttendContainer roomId = {params.slug}/>;
};

export default AttendPage;
