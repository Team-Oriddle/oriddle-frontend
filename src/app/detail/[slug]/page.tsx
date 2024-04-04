"use client";
import DetailContainer from "@/containers/detail/DetailContainer";

type Props = {
  params: {
    slug: number;
  }
}

const DetailPage = ({ params }:Props) => {
  return <DetailContainer quizId = {params.slug}/>;
};

export default DetailPage;