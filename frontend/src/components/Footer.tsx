
const Footer = () => {
  return (
     <footer className="mt-20">

      {/* Footer Content */}
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 py-10 px-5">

        {/* Logo + Description */}
        <div>
          <h2 className="text-2xl font-bold mb-5">
            FOREVER<span className="text-red-300">.</span>
          </h2>

          <p className="text-gray-500 text-sm leading-5 max-w-md">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            ever scrambled it to make a type specimen book.
          </p>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-sm font-semibold mb-5">
            COMPANY
          </h3>

          <ul className="flex flex-col gap-2 text-gray-500 text-sm">
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        {/* Get In Touch */}
        <div>
          <h3 className="text-sm font-semibold mb-5">
            GET IN TOUCH
          </h3>

          <ul className="flex flex-col gap-2 text-gray-500 text-sm">
            <li>+1-212-456-7890</li>
            <li>contact@foreveryou.com</li>
          </ul>
        </div>

      </div>

      {/* Copyright */}
      <div className="border-t border-gray-200">
        <p className="py-5 text-center text-xs text-gray-500">
          Copyright 2024@ forever.com - All Right Reserved.
        </p>
      </div>

    </footer>
  )
}

export default Footer