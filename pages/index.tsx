import DefaultLayout from "../layouts/default-layout";

export default function IndexPage(props) {
  // useEffect(() => {
  //   smoothscroll.polyfill();
  // }, []);

  return (
    <DefaultLayout>
      <div className="min-h-[800rem]">
        <pre>Hello, world!</pre>
      </div>
    </DefaultLayout>
  );
}
