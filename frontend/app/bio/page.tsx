import { getBio } from "@/api/bio";
import { BioCard } from "./bio";

type BioItem = {
  id: string;
  image_url?: string;
  photo_alt?: string;
  description: string;
};

export default async function Bio() {
  const bioItems = await getBio();
  console.log(bioItems)

  return (
    <section className="relative flex flex-col items-center overflow-hidden bg-[#040B14] px-6 pb-24 pt-20 text-center">
      <div className="mx-auto flex max-w-2xl flex-col gap-8 px-6 py-12">
      {bioItems && bioItems.map((item: BioItem, i: number) => (
        <BioCard
          key={item.id}
          photoSrc={item.image_url}
          photoAlt={item.photo_alt}
          imageOnLeft={i % 2 === 0}
        >
          {item.description}
        </BioCard>
      ))}
      </div>
    </section>
  );
}
