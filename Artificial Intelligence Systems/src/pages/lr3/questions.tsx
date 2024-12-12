import { CreativityQuestion } from "./components/creativity";
import { InterestQuestion } from "./components/interest";
import { Question } from "./components/question";
import { SkillQuestion } from "./components/skills";

export const questions = [
  {
    id: 0,
    content: "Как вы оцениваете свои технические навыки?",
    description: `Выберете на шкале наиболее подходящую степень оценки.\nДиапазон: 0–10 (где 0 — отсутствие навыков, 10 — экспертный уровень).`,
    answers: [
      {
        id: 0,
        content: "0",
      },
      {
        id: 1,
        content: "1",
      },
      {
        id: 2,
        content: "2",
      },
      {
        id: 3,
        content: "3",
      },
      {
        id: 4,
        content: "4",
      },
      {
        id: 5,
        content: "5",
      },
      {
        id: 6,
        content: "6",
      },
      {
        id: 7,
        content: "7",
      },
      {
        id: 8,
        content: "8",
      },
      {
        id: 9,
        content: "9",
      },
      {
        id: 10,
        content: "10",
      },
    ],
    element: <SkillQuestion id={0} />,
  },
  {
    id: 1,
    content: "Насколько вам интересно изучать новые технологии?",
    description:
      "Выберете на шкале наиболее подходящую степень оценки\nДиапазон: 0–10 (где 0 — нет интереса, 10 — высокий интерес).",
    answers: [
      {
        id: 0,
        content: "0",
      },
      {
        id: 1,
        content: "1",
      },
      {
        id: 2,
        content: "2",
      },
      {
        id: 3,
        content: "3",
      },
      {
        id: 4,
        content: "4",
      },
      {
        id: 5,
        content: "5",
      },
      {
        id: 6,
        content: "6",
      },
      {
        id: 7,
        content: "7",
      },
      {
        id: 8,
        content: "8",
      },
      {
        id: 9,
        content: "9",
      },
      {
        id: 10,
        content: "10",
      },
    ],
    element: <InterestQuestion id={1} />,
  },
  {
    id: 2,
    content: "Как вы оцениваете свою склонность к творческой деятельности?",
    description:
      "Выберете на шкале наиболее подходящую степень оценки\nДиапазон: 0–10 (где 0 — нет творчества, 10 — высокая креативность).",
    answers: [
      {
        id: 0,
        content: "0",
      },
      {
        id: 1,
        content: "1",
      },
      {
        id: 2,
        content: "2",
      },
      {
        id: 3,
        content: "3",
      },
      {
        id: 4,
        content: "4",
      },
      {
        id: 5,
        content: "5",
      },
      {
        id: 6,
        content: "6",
      },
      {
        id: 7,
        content: "7",
      },
      {
        id: 8,
        content: "8",
      },
      {
        id: 9,
        content: "9",
      },
      {
        id: 10,
        content: "10",
      },
    ],
    element: <CreativityQuestion id={2} />,
  },
  {
    id: 3,
    content: "Хотите ли вы работать в команде?",
    description: "",
    answers: [
      {
        id: 0,
        content: "Нет",
      },
      {
        id: 1,
        content: "Да",
      },
    ],
    element: (
      <Question
        id={3}
        answers={[
          {
            id: 0,
            content: "Нет",
          },
          {
            id: 1,
            content: "Да",
          },
        ]}
      />
    ),
  },
  {
    id: 4,
    content: "Вам нравится решать задачи, требующие высокой концентрации?",
    description: "",
    answers: [
      {
        id: 0,
        content: "Нет",
      },
      {
        id: 1,
        content: "Да",
      },
    ],
    element: (
      <Question
        id={4}
        answers={[
          {
            id: 0,
            content: "Нет",
          },
          {
            id: 1,
            content: "Да",
          },
        ]}
      />
    ),
  },
  {
    id: 5,
    content: "Готовы ли вы брать на себя ответственность за принятие решений?",
    description: "",
    answers: [
      {
        id: 0,
        content: "Нет",
      },
      {
        id: 1,
        content: "Да",
      },
    ],
    element: (
      <Question
        id={5}
        answers={[
          {
            id: 0,
            content: "Нет",
          },
          {
            id: 1,
            content: "Да",
          },
        ]}
      />
    ),
  },
  {
    id: 6,
    content: "Интересно ли вам участвовать в создании визуальных или дизайнерских элементов?",
    description: "",
    answers: [
      {
        id: 0,
        content: "Нет",
      },
      {
        id: 1,
        content: "Да",
      },
    ],
    element: (
      <Question
        id={6}
        answers={[
          {
            id: 0,
            content: "Нет",
          },
          {
            id: 1,
            content: "Да",
          },
        ]}
      />
    ),
  },
  {
    id: 7,
    content: "С каким утверждением вы согласны больше остальных?",
    description: "",
    answers: [
      {
        id: 0,
        content: `"Мне нравится решать логические задачи и писать код."`,
      },
      {
        id: 1,
        content: `"Я люблю разрабатывать что-то визуально привлекательное."`,
      },
      {
        id: 2,
        content: `"Я предпочитаю координировать работу команды."`,
      },
      {
        id: 3,
        content: `"Мне нравится анализировать данные и находить закономерности."`,
      },
    ],
    element: (
      <Question
        id={7}
        answers={[
          {
            id: 0,
            content: `"Мне нравится решать логические задачи и писать код."`,
          },
          {
            id: 1,
            content: `"Я люблю разрабатывать что-то визуально привлекательное."`,
          },
          {
            id: 2,
            content: `"Я предпочитаю координировать работу команды."`,
          },
          {
            id: 3,
            content: `"Мне нравится анализировать данные и находить закономерности."`,
          },
        ]}
      />
    ),
  },
  {
    id: 8,
    content: "С каким утверждением вы согласны больше другого?",
    description: "",
    answers: [
      {
        id: 0,
        content: `"Я предпочитаю стабильную работу с четкими задачами."`,
      },
      {
        id: 1,
        content: `"Мне интересно искать новые подходы и решения."`,
      },
    ],
    element: (
      <Question
        id={8}
        answers={[
          {
            id: 0,
            content: `"Я предпочитаю стабильную работу с четкими задачами."`,
          },
          {
            id: 1,
            content: `"Мне интересно искать новые подходы и решения."`,
          },
        ]}
      />
    ),
  },
  {
    id: 9,
    content: "С каким утверждением вы согласны больше другого?",
    description: "",
    answer: [
      {
        id: 0,
        content: `"Мне нравится работать с людьми и помогать им решать задачи."`,
      },
      {
        id: 1,
        content: `Я предпочитаю сосредоточиться на своей задаче и работать самостоятельно."`,
      },
    ],
    element: (
      <Question
        id={9}
        answers={[
          {
            id: 0,
            content: `"Мне нравится работать с людьми и помогать им решать задачи."`,
          },
          {
            id: 1,
            content: `Я предпочитаю сосредоточиться на своей задаче и работать самостоятельно."`,
          },
        ]}
      />
    ),
  },
];
