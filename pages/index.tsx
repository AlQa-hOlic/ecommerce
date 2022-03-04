import { useEffect } from "react";
import smoothscroll from "smoothscroll-polyfill";

export default function IndexPage(props) {
  useEffect(() => {
    smoothscroll.polyfill();
  }, []);

  return (
    <div className="text-gray-900 bg-gray-50 min-h-screen">
      <pre>Hello, world!</pre>
    </div>
  );
}
