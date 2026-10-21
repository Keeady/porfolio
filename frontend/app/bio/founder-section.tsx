import { BioCard, BioItem } from "./bio";

export function FounderSection({ items }: { items: BioItem[] }) {
  return (
    <section className="py-20">
      <header className="mx-auto mb-12 max-w-3xl text-center">
        <p className="text-xl font-semibold uppercase tracking-[0.2em] text-violet-400">
          The Person Behind the Studio
        </p>

        <h2 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-5xl">
          Camaria E. Bevavy
        </h2>

        <p className="mt-5 text-lg text-slate-400">
          A little about the founder turning ideas into software.
        </p>
      </header>

      <div className="space-y-8">
        {/* Education */}
        <BioCard
          imageOnLeft
          photoSrc={items[0].image_url}
          photoAlt={items[0].photo_alt}
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-violet-400">
            01 / My Journey
          </p>

          <h2>Where it all started.</h2>

          <p>
            My journey into software engineering began at{" "}
            <strong>Lipscomb University in Nashville, Tennessee</strong>, where
            I earned my Bachelor's degree in Information Technology.
          </p>

          <p>
            It was during my very first programming class, CS 101, that I fell
            in love with coding. I remember being fascinated by the
            possibilities — the idea that I could take something from my
            imagination and turn it into something real, simply by writing code.
          </p>

          <p>
            What drew me to computer science wasn't just the technology itself.
            It was the opportunity to{" "}
            <strong>
              build things that solve real problems and make a meaningful
              difference in people's lives and communities.
            </strong>
          </p>

          <p>
            That curiosity and desire to create led me to continue my education
            at{" "}
            <strong>
              Rochester Institute of Technology in Rochester, New York
            </strong>
            , where I earned my Master's degree in Computer Science, focusing on
            database design and modeling.
          </p>

          <p>
            Looking back, that first programming class sparked something that
            has stayed with me ever since: a love for learning, building, and
            exploring what technology can make possible.
          </p>
        </BioCard>

        {/* Professional experience */}
        <BioCard
          imageOnLeft={false}
          photoSrc={items[2].image_url}
          photoAlt={items[2].photo_alt}
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-violet-400">
            02 / My Experience
          </p>

          <h2>A decade of building.</h2>

          <p>
            I've spent over 10 years building software, from startups to
            large-scale systems at Microsoft to independent products that
            started as ideas and became real applications.
          </p>

          <p>
            My experience spans full-stack development, backend systems, mobile
            applications, and AI-powered features.
          </p>

          <p>
            Today, I bring that experience into Restless Moon Studio, combining
            thoughtful engineering with a passion for turning ideas into useful
            products.
          </p>
        </BioCard>

        {/* Current location */}
        <BioCard
          imageOnLeft
          photoSrc={items[1].image_url}
          photoAlt="A favorite scene from where I live"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-violet-400">
            03 / Where I'm Based
          </p>

          <h2>Where I call home.</h2>
          <p>
            These days, I call Seattle, Washington home, nestled in the
            beautiful Pacific Northwest. It's where I build software, explore
            new ideas, and continue growing Restless Moon Studio.
          </p>

          <p>
            One of the things I love most about living in the Evergreen State is
            being surrounded by nature: lush green forests, sparkling lakes,
            rugged coastlines, and breathtaking mountains.
          </p>

          <p>
            Some of my best ideas come when I'm away from the screen, whether
            I'm hiking a forest trail, exploring somewhere new, or simply taking
            my dog for a walk. Being outdoors gives me space to recharge,
            reflect, and find fresh inspiration to bring back to the things I
            build.
          </p>
        </BioCard>

        {/* Origin */}
        <BioCard
          imageOnLeft={false}
          photoSrc={items[3].image_url}
          photoAlt={items[3].photo_alt}
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-violet-400">
            04 / My Roots
          </p>

          <h2>Where I come from.</h2>

          <p>
            I'm originally from Madagascar, a beautiful island in the Indian
            Ocean, off the eastern coast of Africa. My hometown is surrounded by
            lush rainforests, stunning beaches, and, most importantly, some of
            the warmest and most welcoming people you'll ever meet.
          </p>

          <p>
            Growing up, I spent many weekends on our family farm, helping my
            parents grow rice, tend to crops, and care for farm animals. It
            wasn't always easy work, but those experiences taught me the value
            of hard work, patience, perseverance, and dedication.
          </p>

          <p>
            Looking back, those simple days on the farm shaped much of who I am
            today. They taught me that meaningful things take time, care, and
            consistent effort; values I carry with me in life and in the
            software I build.
          </p>

          <p>
            No matter how far life takes me, Madagascar will always be a special
            part of who I am.
          </p>
        </BioCard>

        {/* Hobbies */}
        <BioCard
          imageOnLeft
          photoSrc={items[4].image_url}
          photoAlt={items[4].photo_alt}
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-violet-400">
            05 / Beyond the Code
          </p>

          <h2>Life outside the screen.</h2>

          <p>
            When I'm not building software, you'll probably find me writing
            stories, getting lost in a good book, tending to my garden, spending
            time with family, or exploring the beautiful Pacific Northwest with
            my dog, Louis, and my cat, Lily.
          </p>

          <p>
            I've always loved creative hobbies, especially writing, baking, and
            gardening. There's something incredibly satisfying about creating
            something from scratch, whether it's a story, a fresh loaf of
            homemade bread, or a thriving vegetable garden.
          </p>

          <p>
            This year, I've spent a lot of time perfecting my whole wheat bread
            recipe and growing my own vegetables and herbs. There's a special
            kind of joy in watching something grow from a tiny seed or pulling a
            warm loaf of bread out of the oven.
          </p>
          <p>
            I think that's what connects many of my interests, including
            software engineering. I simply love the process of creating,
            learning, experimenting, and watching an idea come to life.
          </p>
        </BioCard>
      </div>
    </section>
  );
}
