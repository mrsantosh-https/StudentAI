import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  import.meta.env.VITE_GEMINI_API_KEY
);

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