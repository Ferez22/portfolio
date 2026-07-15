"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useReducedMotion,
  wrap,
} from "motion/react";
import { ProjectCard } from "@/components/project-card";
import { DATA } from "@/data/resume";

type Project = (typeof DATA.projects)[number];

/** One vertical infinite-scrolling rail. */
function Rail({
  projects,
  baseVelocity,
}: {
  projects: readonly Project[];
  /** px/second. Positive = content drifts down, negative = up. */
  baseVelocity: number;
}) {
  const prefersReduced = useReducedMotion();

  // Height of a single copy of the list; measured from the first copy.
  const copyRef = useRef<HTMLDivElement>(null);
  const copyHeight = useRef(0);

  // Pause auto-drift while hovering so cards stay easy to click.
  const paused = useRef(false);

  const baseY = useMotionValue(0);

  // Page scroll velocity -> spring -> a multiplier that speeds the rail up
  // in the scroll direction (the parallax kick).
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  // wrap keeps y within [-copyHeight, 0) so the duplicated list loops seamlessly.
  const y = useTransform(baseY, (v) =>
    copyHeight.current ? wrap(-copyHeight.current, 0, v) : 0
  );

  useAnimationFrame((_, delta) => {
    if (prefersReduced) return;
    if (!copyHeight.current && copyRef.current) {
      copyHeight.current = copyRef.current.offsetHeight;
    }

    let moveBy = paused.current ? 0 : baseVelocity * (delta / 1000);

    // Add the scroll-driven boost. Sign matches the rail's own direction so a
    // scroll always accelerates the drift rather than reversing it.
    const factor = velocityFactor.get();
    moveBy += Math.sign(baseVelocity) * Math.abs(moveBy || 1) * factor * (delta / 1000);

    baseY.set(baseY.get() + moveBy);
  });

  return (
    <div
      className="h-full w-full overflow-hidden pointer-events-auto"
      onPointerEnter={() => (paused.current = true)}
      onPointerLeave={() => (paused.current = false)}
    >
      <motion.div style={{ y }} className="flex flex-col gap-4 will-change-transform">
        {/* First copy is measured; second copy fills the wrap gap. */}
        <div ref={copyRef} className="flex flex-col gap-4">
          {projects.map((project) => (
            <RailCard key={`a-${project.title}`} project={project} />
          ))}
        </div>
        <div className="flex flex-col gap-4" aria-hidden>
          {projects.map((project) => (
            <RailCard key={`b-${project.title}`} project={project} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function RailCard({ project }: { project: Project }) {
  return (
    <ProjectCard
      href={project.href}
      title={project.title}
      description={project.description}
      dates={project.dates}
      tags={project.technologies}
      image={project.image}
      video={project.video}
      links={project.links}
      className="bg-card/60 backdrop-blur-sm"
    />
  );
}

export default function ProjectsParallax() {
  const projects = DATA.projects;

  // Offset the right rail's starting order so the two sides don't mirror.
  const rightProjects = [...projects.slice(3), ...projects.slice(0, 3)];

  // Fixed rails pinned to the viewport edges. They live in the wide gutters
  // outside the centered max-w-2xl content, always visible while the page
  // scrolls. Gated to xl+ so the gutters are wide enough not to overlap text.
  const railWidth = "w-[clamp(240px,20vw,320px)]";

  return (
    <div aria-hidden className="pointer-events-none hidden xl:block">
      {/* Left rail drifts top -> bottom. */}
      <div className={`fixed inset-y-0 left-0 z-0 ${railWidth} px-4 py-4`}>
        <Rail projects={projects} baseVelocity={22} />
      </div>

      {/* Right rail drifts bottom -> top. */}
      <div className={`fixed inset-y-0 right-0 z-0 ${railWidth} px-4 py-4`}>
        <Rail projects={rightProjects} baseVelocity={-22} />
      </div>
    </div>
  );
}
