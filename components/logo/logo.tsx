// Import libraries
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

// Import assets
import SaveryLogo from "@/assets/images/savery-logo.png";

// Import utils
import { ROUTES } from "@/utils/constants";

const Logo = () => {
  const pathName = usePathname();

  return pathName === ROUTES.user.LOGIN ? (
    <div style={{ display: "flex" }}>
      <Image src={SaveryLogo} width={100} height={25} alt="Savery Logo" />
    </div>
  ) : (
    <Link href={ROUTES.workspaces.ALL_WORKSPACES}>
      <div style={{ display: "flex" }}>
        <Image src={SaveryLogo} width={100} height={25} alt="Savery Logo" />
      </div>
    </Link>
  );
};

export default Logo;
