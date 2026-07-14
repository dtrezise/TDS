import Image from "next/image";
import Link from "next/link";

export type PrimarySection = "evidence" | "voices" | "tests" | "methodology";
export type TestSection = "christianity" | "patriotic" | "america-first" | "deals" | "world-standing";

function publicAssetPath(src: string) {
  const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1];
  const basePath = process.env.GITHUB_ACTIONS === "true" && repositoryName ? `/${repositoryName}` : "";
  return `${basePath}${src}`;
}

export function SiteHeader({ active }: { active: PrimarySection }) {
  const items: Array<{ label: string; href: string; section: PrimarySection }> = [
    { label: "Evidence", href: "/", section: "evidence" },
    { label: "Voices", href: "/voices", section: "voices" },
    { label: "Tests", href: "/tests", section: "tests" },
    { label: "Methods", href: "/methodology", section: "methodology" },
  ];

  return (
    <header className="site-header" id="top">
      <Link className="wordmark" href="/" aria-label="TDS Evidence Archive home">
        <span className="wordmark__mark">TDS</span>
        <span className="wordmark__text">TRUMP DERANGEMENT SYNDROME</span>
      </Link>
      <nav aria-label="Primary navigation">
        {items.map((item) => (
          <Link
            className="primary-nav__link"
            href={item.href}
            aria-current={active === item.section ? "page" : undefined}
            key={item.section}
          >
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </header>
  );
}

export function PageMasthead({
  src,
  alt,
  priority = false,
  fit = "contain",
  tone = "dark",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  fit?: "cover" | "contain";
  tone?: "dark" | "light";
}) {
  return (
    <figure className={`page-masthead page-masthead--${fit} page-masthead--${tone}`}>
      <Image
        src={publicAssetPath(src)}
        alt={alt}
        width={1734}
        height={908}
        priority={priority}
        sizes="100vw"
        unoptimized
      />
    </figure>
  );
}

export function SiteFooter({ tagline }: { tagline: string }) {
  return (
    <footer>
      <div className="wordmark wordmark--footer"><span className="wordmark__mark">TDS</span><span className="wordmark__text">Trump Derangement Syndrome</span></div>
      <p>{tagline}</p>
      <div className="footer-links"><Link href="/">Evidence</Link><Link href="/voices">Voices</Link><Link href="/tests">Tests</Link><Link href="/methodology">Methods</Link></div>
      <a className="footer-top" href="#top" aria-label="Back to top">↑</a>
    </footer>
  );
}

export function TestSuiteNav({ active }: { active: TestSection }) {
  const tests: Array<{ label: string; href: string; section: TestSection }> = [
    { label: "Christianity Test", href: "/christianity-test", section: "christianity" },
    { label: "Patriotic Test", href: "/patriotic-test", section: "patriotic" },
    { label: "America First Test", href: "/america-first-test", section: "america-first" },
    { label: "Deal Test", href: "/deal-test", section: "deals" },
    { label: "World Standing Test", href: "/world-standing-test", section: "world-standing" },
  ];

  return (
    <nav className="test-suite-nav" aria-label="Evidence tests">
      <span>Apply a test</span>
      {tests.map((test) => (
        <Link
          href={test.href}
          data-test={test.section}
          aria-current={active === test.section ? "page" : undefined}
          key={test.section}
        >
          {test.label}
        </Link>
      ))}
    </nav>
  );
}
