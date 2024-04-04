"use client";
import AttendContainer from "@/containers/attend/AttendContainer";

type Props = {
  params: {
    slug: number;
  }
}

const AttendPage = ({ params }:Props) => {
  return <AttendContainer  />;
};

export default AttendPage;
