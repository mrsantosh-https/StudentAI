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

export async function checkATSScore(resumeData) {
  try {
    const prompt = `
Analyze this resume for ATS compatibility.

Resume:
Name: ${resumeData.full_name}
Email: ${resumeData.email}
Phone: ${resumeData.phone}
Summary: ${resumeData.summary}
Education: ${resumeData.education}
Skills: ${resumeData.skills}
Projects: ${resumeData.projects}
Experience: ${resumeData.experience}

Give result in this format:

ATS Score: __/100

Strengths:
-

Improvements:
-

Suggested Keywords:
-

Final Verdict:
`;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error(error);
    return "Failed to check ATS score.";
  }
}
export async function improveResume(resumeData) {
try {
  const prompt = `
You are an expert resume reviewer.

Improve the following resume.

Resume:

Name: ${resumeData.full_name}
Summary: ${resumeData.summary}
Education: ${resumeData.education}
Skills: ${resumeData.skills}
Projects: ${resumeData.projects}
Experience: ${resumeData.experience}

Return:

1. Improved Professional Summary

2. Skills to Add

3. Improvements

4. Final Advice
`;

  const result = await model.generateContent(prompt);
  return result.response.text();
} catch (error) {
  console.error(error);
  return "Failed to improve resume.";
}
}
export async function matchJobDescription(resumeData, jobDescription) {
  try {
    const prompt = `
Compare this resume with the job description.

Resume:
Name: ${resumeData.full_name}
Summary: ${resumeData.summary}
Skills: ${resumeData.skills}
Projects: ${resumeData.projects}
Experience: ${resumeData.experience}

Job Description:
${jobDescription}

Return exactly in this format:

Match Score: __/100

Matching Skills:
-

Missing Skills:
-

Resume Improvement Tips:
-

Final Verdict:
`;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error(error);
    return "Failed to match job description.";
  }
}
export async function generateCareerRoadmap(goal) {
  try {
    const prompt = `
Create a 6-month career roadmap for: ${goal}

Return in this format:

Goal:

Month 1:
-

Month 2:
-

Month 3:
-

Month 4:
-

Month 5:
-

Month 6:
-

Projects to Build:
-

Skills to Focus:
-

Final Advice:
`;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error(error);
    return "Failed to generate career roadmap.";
  }
}