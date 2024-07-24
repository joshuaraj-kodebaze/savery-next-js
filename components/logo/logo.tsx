// Import libraries
import Link from "next/link";
import Image from "next/image";

// Import assets
import SaveryLogo from "@/assets/images/savery-logo.png";

// Import utils
import { ROUTES } from "@/utils/constants";

// Import hooks
import { useAppSelector } from "@/hooks/useAppSelector";

const Logo = () => {
  const { userToken } = useAppSelector((state) => state.auth);
  return (
    <Link href={userToken ? ROUTES.projects.ALL_PROJECTS : "#"}>
      <div style={{ display: "flex" }}>
        <Image src={SaveryLogo} width={100} height={25} alt="Savery Logo" />
      </div>
    </Link>
  );
};

export default Logo;
