import DefaultLayout from "../layouts/default-layout";

export default function IndexPage(props) {
  // useEffect(() => {
  //   smoothscroll.polyfill();
  // }, []);

  return (
    <DefaultLayout>
      <pre>Hello, world!</pre>
    </DefaultLayout>
  );
}
