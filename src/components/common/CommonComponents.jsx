import { C } from "../../data/constants";
import { useInView } from "../../hooks/useInView";

export const FadeIn = ({ children, delay = 0, dir = "up", style = {} }) => {
  const [ref, inView] = useInView();
  const map = { up: "translateY(32px)", left: "translateX(-32px)", right: "translateX(32px)", none: "none" };
  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : map[dir], transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`, ...style }}>
      {children}
    </div>
  );
};

export const SLabel = ({ children }) => (
  <div className="sans" style={{ fontSize: 11, letterSpacing: 4, color: C.mid, textTransform: "uppercase", marginBottom: 12 }}>{children}</div>
);

export const SHeading = ({ children }) => (
  <h2 className="serif" style={{ fontSize: "clamp(30px,3.8vw,50px)", color: C.navy, lineHeight: 1.1, marginBottom: 16 }}>{children}</h2>
);
