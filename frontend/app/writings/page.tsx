import ErrorState from "../components/error";

export default function Writings() {
  return (
    <section className="relative flex flex-col items-center overflow-hidden bg-[#040B14] px-6 pb-24 pt-20 text-center">
      <ErrorState
        title={"Under Construction ..."}
        message="Check out my posts on LinkedIn."
        redirect="https://linkedin.com/in/camariabevavy"
      />
    </section>
  );
}
