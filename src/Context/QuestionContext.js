import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect
} from "react";
import Logger from "./../Logger";

// Substitute your own logging solution for console logs if desired
const logger = new Logger();

/**
 * This data object has 5 categories, each an array of possible questions.
 */
const questionData = {
  sustainability: [
    "Is this item produced sustainably?",
    "Does this purchase align with your environmental values?"
  ],
  long_term: [
    "Are you sure you are not buying this item on impulse? Do you really need it?",
    "Will this purchase bring you long-term satisfaction?"
  ],
  personal_finances: [
    "Does this item fit in your budget?",
    "Are you sure you are not overspending on this purchase?"
  ],
  practicality: [
    "Will you wear this item more than 10 times?",
    "Will you wear this item more than once a month?"
  ],
  social_influence: [
    "Are you sure you are not buying this just because you saw it on social media?",
    "Are you sure you are not buying this just to impress others? Do you genuinely like it?"
  ],
};

/**
 * Returns exactly 1 random question from each category.
 * Produces an array of objects like:
 * [
 *   { category: 'sustainability', text: '...' },
 *   { category: 'long_term', text: '...' },
 *   ...
 * ]
 */
function buildOneQuestionPerCategory() {
  const categories = Object.keys(questionData);

  // Go through each category, pick a random question
  const randomQuestions = categories.map((category) => {
    const questionsInCat = questionData[category];
    const randIndex = Math.floor(Math.random() * questionsInCat.length);
    return { category, text: questionsInCat[randIndex] };
  });

  // Optional shuffle if you want these 5 in random order
  for (let i = randomQuestions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [randomQuestions[i], randomQuestions[j]] = [randomQuestions[j], randomQuestions[i]];
  }

  return randomQuestions;
}

/**
 * Creates a new question list state with EXACTLY one random question from each category.
 * Logs them to console and logs with your custom logger as well.
 */
function createQuestionListState() {
  const list = buildOneQuestionPerCategory();
  console.log("[QUESTION_CONTEXT] Created a new question set with", list.length, "questions:", list);
  logger.log(list, "start");
  return {
    list,
    index: 0, // We'll cycle through these 5
  };
}

/**
 * Attempt to load a previously saved questionListState from localStorage.
 * If none found or invalid, create a brand new one.
 */
function loadQuestionListState() {
  try {
    const stored = localStorage.getItem("questionListState");
    if (stored) {
      const parsed = JSON.parse(stored);
      if (
        parsed &&
        parsed.list &&
        Array.isArray(parsed.list) &&
        typeof parsed.index === "number"
      ) {
        console.log("[QUESTION_CONTEXT] Loaded a question set from localStorage:", parsed);
        return parsed;
      }
    }
  } catch (err) {
    console.warn("[QUESTION_CONTEXT] Failed to parse questionListState from localStorage.", err);
  }
  // Fallback: create a new question set
  return createQuestionListState();
}

/**
 * Save the question list state to localStorage whenever it changes.
 */
function saveQuestionListState(state) {
  try {
    localStorage.setItem("questionListState", JSON.stringify(state));
  } catch (err) {
    console.warn("[QUESTION_CONTEXT] Failed to save questionListState to localStorage.", err);
  }
}

/**
 * Context that provides a question list plus easy "get next question" logic.
 */
const QuestionsContext = createContext();

export function QuestionsProvider({ children }) {
  // 1) Load from localStorage (or create new) once at mount.
  const [questionListState, setQuestionListState] = useState(loadQuestionListState);

  // 2) Persist the questionListState to local storage whenever it changes.
  useEffect(() => {
    saveQuestionListState(questionListState);
  }, [questionListState]);

  // Move to next question, looping back if we pass the end (5 total).
  const getNextQuestion = useCallback(() => {
    setQuestionListState((prev) => {
      const nextIndex = (prev.index + 1) % prev.list.length;
      return { ...prev, index: nextIndex };
    });
  }, []);

  // The current question from that array
  const currentQuestion = questionListState.list[questionListState.index];

  // Create a new question set (again, 1 from each category, total 5).
  // Call this anytime you want to discard the old set.
  const resetQuestions = useCallback(() => {
    console.log("[QUESTION_CONTEXT] Resetting to a brand new question set...");
    setQuestionListState(createQuestionListState());
  }, []);

  // Expose these in context
  const value = useMemo(() => {
    return {
      currentQuestion,
      getNextQuestion,
      resetQuestions
    };
  }, [currentQuestion, getNextQuestion, resetQuestions]);

  return (
    <QuestionsContext.Provider value={value}>
      {children}
    </QuestionsContext.Provider>
  );
}

export function useQuestions() {
  return useContext(QuestionsContext);
}