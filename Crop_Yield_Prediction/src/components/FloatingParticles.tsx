import { Leaf, Wheat, Sprout } from "lucide-react";

const FloatingParticles = () => {
  const particles = [
    { Icon: Leaf, delay: 0, left: "10%" },
    { Icon: Wheat, delay: 3, left: "30%" },
    { Icon: Sprout, delay: 6, left: "50%" },
    { Icon: Leaf, delay: 9, left: "70%" },
    { Icon: Wheat, delay: 12, left: "90%" },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((particle, index) => (
        <particle.Icon
          key={index}
          className="absolute text-accent/20"
          size={24}
          style={{
            left: particle.left,
            bottom: "-50px",
            animation: `particle-float 15s linear infinite`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingParticles;
