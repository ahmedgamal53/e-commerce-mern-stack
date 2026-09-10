import { RefreshCcw, BadgeCheck, Headset } from "lucide-react";

const OurPolicy = () => {
  return (
    <div className=" flex justify-between flex-col gap-3 sm:flex-row items-center text-center py-10">

  <div className="flex flex-col items-center">
    <RefreshCcw size={38} strokeWidth={2} />
    <h3 className="mt-4 text-sm font-medium">
      Easy Exchange Policy
    </h3>
    <p className="text-xs text-gray-400 mt-2">
      We offer hassle free exchange policy
    </p>
  </div>

  <div className="flex flex-col items-center">
    <BadgeCheck size={38} strokeWidth={2} />
    <h3 className="mt-4 text-sm font-medium">
      7 Days Return Policy
    </h3>
    <p className="text-xs text-gray-400 mt-2">
      We provide 7 days free return policy
    </p>
  </div>

  <div className="flex flex-col items-center">
    <Headset size={38} strokeWidth={2} />
    <h3 className="mt-4 text-sm font-medium">
      Best customer support
    </h3>
    <p className="text-xs text-gray-400 mt-2">
      we provide 24/7 customer support
    </p>
  </div>

</div>
  )
}

export default OurPolicy