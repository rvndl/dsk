import { useRouter } from "next/router";

const Share = () => {
  const router = useRouter();
  const { slug } = router.query;
  return <div>{slug}</div>;
};

export default Share;
