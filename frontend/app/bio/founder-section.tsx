import { BioCard, BioItem } from "./bio";

export function FounderSection({ items }: { items: BioItem[] }) {
  return (
    <section className="py-20">
      <header className="mx-auto mb-12 max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-400">
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
            My journey into software engineering began with [your educational
            background].
          </p>

          {items[0].description}

          <p>
            [Share what you studied, what first sparked your interest in
            technology, and how that shaped your career.]
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
            I've spent over 10 years building software, from large-scale systems
            at Microsoft to independent products that started as ideas and
            became real applications.
          </p>

          <p>
            My experience spans full-stack development, backend systems, mobile
            applications, and AI-powered features.
          </p>

          <p>{items[2].description}</p>

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

          <p>{items[1].description}</p>

          <p>
            These days, I'm based in [your city or region], where I work on
            software products and grow Restless Moon Studio.
          </p>

          <p>
            [Add what you enjoy about living there or how the environment
            inspires your work.]
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

          <p>I'm originally from [your hometown or country].</p>

          <p>{items[3].description}</p>

          <p>
            [Share a little about your upbringing, your culture, or the
            experiences that shaped how you see the world.]
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
            When I'm not building software, you'll probably find me [your
            favorite hobbies or activities].
          </p>

          <p>{items[4].description}</p>
          <p>
            [Share something fun or personal that gives visitors a glimpse into
            your personality.]
          </p>
        </BioCard>
      </div>
    </section>
  );
}
