"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Share from "@/components/share";
import { url, title } from "@/lib/metadata";

import cinderellaImg from "@/public/cinderella.png";
import belleImg from "@/public/belle.png";
import arielImg from "@/public/ariel.png";
import rapunzelImg from "@/public/rapunzel.png";
import auroraImg from "@/public/aurora.png";

type Princess = "Cinderella" | "Belle" | "Ariel" | "Rapunzel" | "Aurora";

const princessImages: Record<Princess, string> = {
  Cinderella: cinderellaImg.src,
  Belle: belleImg.src,
  Ariel: arielImg.src,
  Rapunzel: rapunzelImg.src,
  Aurora: auroraImg.src,
};

const questions = [
  {
    question: "What is your favorite type of adventure?",
    options: [
      { text: "Finding a lost treasure", princess: "Cinderella" as Princess },
      { text: "Exploring a library", princess: "Belle" as Princess },
      { text: "Swimming in the ocean", princess: "Ariel" as Princess },
      { text: "Climbing a tower", princess: "Rapunzel" as Princess },
      { text: "Dreaming of a better world", princess: "Aurora" as Princess },
    ],
  },
  {
    question: "Which trait describes you best?",
    options: [
      { text: "Kind and resilient", princess: "Cinderella" as Princess },
      { text: "Intelligent and curious", princess: "Belle" as Princess },
      { text: "Free-spirited and adventurous", princess: "Ariel" as Princess },
      { text: "Creative and independent", princess: "Rapunzel" as Princess },
      { text: "Gentle and hopeful", princess: "Aurora" as Princess },
    ],
  },
  {
    question: "What is your favorite setting?",
    options: [
      { text: "A grand ballroom", princess: "Cinderella" as Princess },
      { text: "A cozy cottage", princess: "Belle" as Princess },
      { text: "A coral reef", princess: "Ariel" as Princess },
      { text: "A tall tower", princess: "Rapunzel" as Princess },
      { text: "A peaceful forest", princess: "Aurora" as Princess },
    ],
  },
  {
    question: "Which song would you sing?",
    options: [
      { text: "A hopeful ballad", princess: "Cinderella" as Princess },
      { text: "A love song", princess: "Belle" as Princess },
      { text: "A sea shanty", princess: "Ariel" as Princess },
      { text: "A lullaby", princess: "Rapunzel" as Princess },
      { text: "A lullaby of dreams", princess: "Aurora" as Princess },
    ],
  },
  {
    question: "What is your ideal gift?",
    options: [
      { text: "A pair of glass slippers", princess: "Cinderella" as Princess },
      { text: "A book of stories", princess: "Belle" as Princess },
      { text: "A seashell necklace", princess: "Ariel" as Princess },
      { text: "A long braid", princess: "Rapunzel" as Princess },
      { text: "A crystal pendant", princess: "Aurora" as Princess },
    ],
  },
];

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [scores, setScores] = useState<Record<Princess, number>>({
    Cinderella: 0,
    Belle: 0,
    Ariel: 0,
    Rapunzel: 0,
    Aurora: 0,
  });
  const [completed, setCompleted] = useState(false);

  const handleSelect = (princess: Princess) => {
    setScores((prev) => ({
      ...prev,
      [princess]: prev[princess] + 1,
    }));
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrent(0);
    setScores({
      Cinderella: 0,
      Belle: 0,
      Ariel: 0,
      Rapunzel: 0,
      Aurora: 0,
    });
    setCompleted(false);
  };

  if (!completed) {
    const q = questions[current];
    return (
      <div className="w-full max-w-md space-y-4">
        <h2 className="text-xl font-semibold">{q.question}</h2>
        <div className="flex flex-col gap-2">
          {q.options.map((opt) => (
            <Button
              key={opt.text}
              variant="outline"
              onClick={() => handleSelect(opt.princess)}
              className="w-full justify-start"
            >
              {opt.text}
            </Button>
          ))}
        </div>
      </div>
    );
  }

  const result = Object.entries(scores).reduce(
    (max, [key, val]) => (val > max[1] ? [key, val] : max),
    ["", 0] as [Princess, number]
  )[0] as Princess;

  const shareText = `I am ${result}! Check it out: ${url}`;

  return (
    <div className="w-full max-w-md text-center space-y-4">
      <h2 className="text-2xl font-bold">You are most like {result}!</h2>
      <img
        src={princessImages[result]}
        alt={result}
        className="mx-auto rounded-lg"
        width={200}
        height={200}
      />
      <Share text={shareText} className="mx-auto" />
      <Button variant="outline" onClick={resetQuiz} className="mx-auto">
        Retake Quiz
      </Button>
    </div>
  );
}
