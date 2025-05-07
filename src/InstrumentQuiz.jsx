import React, { useState } from "react";
import SurveyCard from "./SurveyCard";
import instruments from "./assets/instruments.json";
import InstrumentBarChart from "./InstrumentBarChart";
import "./InstrumentQuiz.css";

// Helper to initialize instrument compatibility scores
const getInitialScores = () => instruments.reduce((acc, instrument) => {
  acc[instrument.name] = 50;
  return acc;
}, {});

const questions = [
  {
    key: "pain-tolerance",
    question: "How well are you able to tolerate physical pain?",
    options: [
      {
        label: "What?? Why would I want to play an instrument that hurts?",
        value: 0
      },
      {
        label: "A little pain is ok as long as I'm not bleeding",
        value: 5
      },
      {
        label: "I'm ok with losing blood on the bandstand",
        value: 10
      }
    ],
    tooltip: "Some instruments hurt, especially when you're learning or coming back from vacation",
    postSubmit: (answer, scores, setScores) => {
      instruments.forEach(instrument => {
        if (instrument.physicalPain > answer) {
          const difference = instrument.physicalPain - answer;
          setScores({ ...scores, [instrument.name]: scores[instrument.name] -= (difference * 5) });
        } else {
          setScores({ ...scores, [instrument.name]: scores[instrument.name] += instrument.physicalPain });
        }
      });
    }
  },
  {
    key: "strength",
    question: "How strong are you?",
    options: [
      {
        label: "Although I possess a great inner strength, I can't lift very much",
        value: 75
      },
      {
        label: "I'm in decent shape, and can probably lift most instruments comfortably",
        value: 125
      },
      {
        label: "I lift weights multiple days per week and drink creatine milkshakes for breakfast, lunch, and dinner",
        value: 200
      }
    ],
    tooltip: "Some instruments are heavy enough to be taxing on the body",
    postSubmit: (answer, scores, setScores) => {
      instruments.forEach(instrument => {
        if (instrument.playingWeightInOunces > answer) {
          setScores({ ...scores, [instrument.name]: scores[instrument.name] -= 5 });
        } else {
          setScores({ ...scores, [instrument.name]: scores[instrument.name] += 5 });
        }
      });
    }
  },
  {
    key: "ease-for-beginners",
    question: "How quickly do you want to ramp up to sounding decent on your instrument?",
    options: [
      {
        label: "It doesn't matter. I enjoy the process of practicing and noticing the small wins along the way",
        value: 10
      },
      {
        label: "Semi-quickly; I'll be frustrated if I can't play simple songs after the first couple weeks",
        value: 5
      },
      {
        label: "I want to play professionally within my first two years",
        value: 1
      }
    ],
    tooltip: "Some instruments are easy to get started on, while others require expertise to get a good sound at all",
    postSubmit: (answer, scores, setScores) => {
      instruments.forEach(instrument => {
        if (instrument.beginnerToIntermediateDifficulty > answer) {
          const difference = instrument.beginnerToIntermediateDifficulty - answer;
          setScores({ ...scores, [instrument.name]: scores[instrument.name] -= (difference * 2) });
        } else {
          setScores({ ...scores, [instrument.name]: scores[instrument.name] += 5 });
        }
      });
    }
  },
  {
    key: "need-for-game",
    question: "How famous do you need to be?",
    options: [
      {
        label: "Not famous. I'm ok being a freelancer in bands led by others",
        value: 1
      },
      {
        label: "I want to tour regionally with my own band",
        value: 4
      },
      {
        label: "I want to headline the biggest jazz festivals",
        value: 8
      },
      {
        label: "I want to transcend music fame and have a major motion picture about my life",
        value: 10
      }
    ],
    tooltip: "Some instruments resonate better with audiences, especially when expanding beyond core-jazz audiences.",
    postSubmit: (answer, scores, setScores) => {
      instruments.forEach(instrument => {
        if (instrument.leaderPotential < answer) {
          const difference = answer - instrument.leaderPotential;
          setScores({ ...scores, [instrument.name]: scores[instrument.name] -= (difference * 3) });
        } else {
          setScores({ ...scores, [instrument.name]: scores[instrument.name] += instrument.leaderPotential });
        }
      });
    }
  },
  {
    key: "work-reliability",
    question: "How often do you want to play gigs?",
    options: [
      {
        label: "I'm going to make my living outside of music, so occasional gigs are enough",
        value: 1
      },
      {
        label: "I'd like to be in a few bands that play regularly",
        value: 4
      },
      {
        label: "I want more than one gig each week",
        value: 7
      },
      {
        label: "I want to play gigs literally every day",
        value: 10
      }
    ],
    tooltip: "Some instruments are featured in virtually every band, while others are played almost exclusively by band leaders",
    postSubmit: (answer, scores, setScores) => {
      instruments.forEach(instrument => {
        if (instrument.freelancePotential < answer) {
          const difference = answer - instrument.freelancePotential;
          setScores({ ...scores, [instrument.name]: scores[instrument.name] -= (difference * 2) });
        } else {
          setScores({ ...scores, [instrument.name]: scores[instrument.name] += instrument.freelancePotential });
        }
      });
    }
  },
  {
    key: "perfect-pitch",
    question: "Do you have perfect pitch?",
    options: [
      {
        label: "Yes",
        value: "yes"
      },
      {
        label: "No",
        value: "no"
      }
    ],
    tooltip: "For people with perfect pitch (the ability to identify musical notes without reference), we recommend non-transposing instruments.",
    postSubmit: (answer, scores, setScores) => {
      if (answer === "yes") {
        // Reduce score for transposing instruments
        const updated = { ...scores };
        instruments.forEach(instrument => {
          if (instrument.isTransposing) {
            updated[instrument.name] = (updated[instrument.name] || 0) - 10;
          }
        });
        setScores(updated);
      }
    }
  },
  {
    key: "scholarships",
    question: "Should college scholarship availability factor into your instrument choice?",
    options: [
      {
        label: "Yes",
        value: 7
      },
      {
        label: "Maybe a little",
        value: 5
      },
      {
        label: "No",
        value: 0
      }
    ],
    tooltip: "Jazz programs tend to offer more scholarships for hard-to-fill chairs in their big band",
    postSubmit: (answer, scores, setScores) => {
      if (answer === "yes") {
        instruments.forEach(instrument => {
          if (instrument.scholarshipAvailability < answer) {
            const difference = answer - instrument.scholarshipAvailability;
            setScores({ ...scores, [instrument.name]: scores[instrument.name] -= (difference * 2) });
          } else {
            setScores({ ...scores, [instrument.name]: scores[instrument.name] += instrument.scholarshipAvailability });
          }
        });
      }
    }
  }
];

export default function InstrumentQuiz() {
      const [submissions, setSubmissions] = useState([]);
      const [instrumentScores, setInstrumentScores] = useState(getInitialScores);
      const [showWelcome, setShowWelcome] = useState(true);
      const currentIdx = submissions.length;
      const currentQuestion = questions[currentIdx];

      const handleSubmit = (answer) => {
        if (currentQuestion && currentQuestion.postSubmit) {
          currentQuestion.postSubmit(answer, instrumentScores, setInstrumentScores);
        }
        setSubmissions([...submissions, answer]);
      };

      // Handles going to the previous question and resetting scores
      const handlePrevious = () => {
        const newSubmissions = submissions.slice(0, -1);
        // Re-initialize scores
        let scores = getInitialScores();
        // Replay postSubmit for each answered question
        newSubmissions.forEach((answer, idx) => {
          const q = questions[idx];
          if (q.postSubmit) {
            // Use a dummy setter to update the local scores object
            q.postSubmit(answer, scores, updated => { scores = updated; });
          }
        });
        setInstrumentScores(scores);
        setSubmissions(newSubmissions);
      };

      return (
        <div style={{}}>
          <div className="quiz-layout">
            {showWelcome ? (
              <>
                <SurveyCard
                  question={"Welcome to the JazzStickers.com Instrument Compatability Quiz"}
                  options={[]}
                  tooltip={null}
                  onSubmit={() => setShowWelcome(false)}
                  showPrevious={false}
                  onPrevious={() => {}}
                  completedCount={0}
                  totalCount={questions.length}
                  isWelcome={true}
                />
                <InstrumentBarChart scores={instrumentScores} />
              </>
            ) : currentIdx < questions.length ? (
              <>
                <SurveyCard
                  question={currentQuestion.question}
                  options={currentQuestion.options}
                  tooltip={currentQuestion.tooltip}
                  onSubmit={handleSubmit}
                  showPrevious={currentIdx > 0}
                  onPrevious={handlePrevious}
                  completedCount={currentIdx}
                  totalCount={questions.length}
                />
                <InstrumentBarChart scores={instrumentScores} />
              </>
            ) : (
              <>
                <SurveyCard
                  question={`Survey complete. The instrument you should play is ${Object.entries(instrumentScores).sort((a, b) => b[1] - a[1])[0][0]}`}
                  options={[]}
                  tooltip={null}
                  onSubmit={() => {}}
                  showPrevious={true}
                  onPrevious={handlePrevious}
                  completedCount={currentIdx}
                  totalCount={questions.length}
                />
                <InstrumentBarChart scores={instrumentScores} />
              </>
            )}
          </div>
        </div>
      );
    }

