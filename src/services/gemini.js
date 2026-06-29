import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

export async function generateSummary(userData) {
  try {
    const prompt = `
Generate a professional resume summary.

Name: ${userData.fullName}
Education: ${userData.education}
Skills: ${userData.skills}
Projects: ${userData.projects}
Experience: ${userData.experience}

Return only the professional summary.
`;

    const result = await model.generateContent(prompt);

    return result.response.text();
  } catch (error) {
    console.error(error);
    return "Failed to generate summary.";
  }
}

export async function generateCoverLetter(data) {
  try {
    const prompt = `
Generate a professional cover letter.

Company: ${data.company}
Job Role: ${data.role}
Skills and Experience: ${data.details}

Return only the cover letter.
`;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error(error);
    return "Failed to generate cover letter.";
  }
}
export async function generateInterviewQuestions(role) {
  try {
    const prompt = `
Generate 5 technical interview questions for the role: ${role}.

Return only numbered questions.
`;

    const result = await model.generateContent(prompt);

    return result.response.text();
  } catch (error) {
    console.error(error);
    return "Failed to generate interview questions.";
  }
}

export async function evaluateInterviewAnswer(question, answer) {
  try {
    const prompt = `
Evaluate this interview answer.

Question: ${question}

User Answer: ${answer}

Give feedback in this format:
1. Score out of 10
2. What is good
3. What can be improved
4. Better answer
`;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error(error);
    return "Failed to evaluate answer.";
  }
}
