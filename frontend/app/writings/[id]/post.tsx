/**
 * components/PostDetail.tsx
 *
 * Individual post page. Continues the same postcard family (paper,
 * elevated double border, dashed inner border) as WritingsList, scaled
 * up to a full page rather than a list card.
 *
 * The image is a CSS float: text bodies wrap around it the old-fashioned
 * way — every body block that appears before the float clears will wrap
 * around the image, not just the first one, which is standard float
 * behavior and matches "content should wrap around it."
 */

import { Caveat, Courier_Prime, Patrick_Hand } from "next/font/google";

export interface WritingWithBodies {
  id: string;
  title: string;
  summary: string;
  image_url?: string;
  tags?: string[];
  bodies: WritingBody[];
}

interface WritingBody {
  id: string;
  header?: string;
  content: string;
  content_type?: string;
  url?: string;
}

const courierPrime = Courier_Prime({ weight: "700", subsets: ["latin"], variable: "--font-courier" });
const patrickHand = Patrick_Hand({ weight: "400", subsets: ["latin"], variable: "--font-patrick" });
const caveat = Caveat({ weight: ["600","700"], subsets: ["latin"], variable: "--font-caveat" });

function BodyBlock({ body }: { body: WritingBody }) {
  return (
    <div className="mb-6 last:mb-0">
      {body.header && (
        <h3 className={`mb-2 ${caveat.className} text-xl font-bold text-[#2E2418]`}>
          {body.header}
        </h3>
      )}

      {body.content_type === "code" ? (
        <pre className="overflow-x-auto border border-dashed border-[#7A6A50]/60 bg-[#e9dcc0] p-3">
          <code className={`${courierPrime.className} text-sm text-[#2E2418]`}>
            {body.content}
          </code>
        </pre>
      ) : (
        <p className={`${patrickHand.className} text-[1.1rem] leading-relaxed text-[#3a2f22]`}>
          {body.content}
        </p>
      )}
    </div>
  );
}

export default function PostDetail({ post }: { post: WritingWithBodies }) {
  const { title, image_url, tags, bodies } = post;

  return (
    <article className="mx-auto max-w-2xl px-6 py-12">
      <div className="border-[3px] border-[#7A6A50] bg-[#f6efdd] p-1.5 shadow-[0_8px_20px_rgba(0,0,0,0.35)]">
        <div className="border border-dashed border-[#7A6A50]/70 bg-[#F1E7D0] p-8">
          {/* title */}
          <h1 className={`mb-3 ${caveat.className} text-4xl font-bold text-[#2E2418]`}>
            {title}
          </h1>

          {/* tags, directly under title */}
          {tags && tags.length > 0 && (
            <div className="mb-5 flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className={`border border-[#3B5568]/40 bg-[#e4d6b8] px-2 py-0.5 ${patrickHand.className} text-xs text-[#3B5568]`}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* image floats left; body content below wraps around it */}
          {image_url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={image_url}
              alt={title}
              className="float-left mb-2 mr-5 w-44 border border-[#7A6A50]/50 object-cover sm:w-56"
            />
          )}

          {/* body blocks — wrap around the float until content clears it */}
          <div>
            {bodies.map((body, i) => (
              <BodyBlock key={i} body={body} />
            ))}
          </div>

          {/* clear the float so the card border doesn't collapse if the
              image is taller than the wrapped text */}
          <div className="clear-left" />
        </div>
      </div>
    </article>
  );
}
