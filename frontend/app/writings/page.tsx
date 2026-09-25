import { getWritings } from "@/api/writings";
import ErrorState from "../components/error";
import { PostCard, Writing } from "./writings";

export default async function Writings() {
  const writings: Writing[] = await getWritings();

  if (!writings || writings.length === 0) {
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

  return (
    <section className="relative flex flex-col items-center overflow-hidden bg-[#040B14] px-6 pb-24 pt-20 text-center">
      <div className="mx-auto flex max-w-2xl flex-col gap-6 px-6 py-12">
        {writings.map((post: Writing) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
