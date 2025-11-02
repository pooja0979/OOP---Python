
import { GoogleGenAI, Type } from "@google/genai";
import type { EducationalContent } from '../types';

const fetchOopContent = async (): Promise<EducationalContent> => {
    if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable not set.");
    }
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const prompt = `
You are a world-class computer science teacher specializing in the IB curriculum. Your task is to generate a complete educational module for teaching Python Object-Oriented Programming (OOP) to IB Computer Science students. Please provide the content in a single, structured JSON object.

The JSON object must have three main keys: "concepts", "quiz", and "practiceProblems".

1.  **concepts**: An array of objects. Each object should represent a core OOP concept and have the following keys:
    *   "title": The name of the concept (e.g., "Classes and Objects").
    *   "explanation": A clear, concise explanation of the concept suitable for an IB student. Use markdown for formatting if needed.
    *   "codeExample": A simple, well-commented Python code example that demonstrates the concept.

    Please cover these concepts: Classes and Objects, The __init__() Method, Attributes (Instance and Class), Methods (Instance Methods), Inheritance, Polymorphism, and Encapsulation.

2.  **quiz**: An array of 5 multiple-choice question objects. Each object must have the following keys:
    *   "question": The question text.
    *   "options": An array of four string options.
    *   "correctAnswerIndex": The 0-based index of the correct answer in the "options" array.

3.  **practiceProblems**: An array of 3 hands-on practice problem objects. Each object must have the following keys:
    *   "title": A short, descriptive title for the problem.
    *   "problemStatement": A clear description of the problem to be solved. Use markdown for formatting.
    *   "solution": The complete, well-commented Python code solution for the problem.
`;

    const responseSchema = {
        type: Type.OBJECT,
        properties: {
            concepts: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        title: { type: Type.STRING },
                        explanation: { type: Type.STRING },
                        codeExample: { type: Type.STRING },
                    },
                    required: ["title", "explanation", "codeExample"],
                },
            },
            quiz: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        question: { type: Type.STRING },
                        options: { type: Type.ARRAY, items: { type: Type.STRING } },
                        correctAnswerIndex: { type: Type.INTEGER },
                    },
                    required: ["question", "options", "correctAnswerIndex"],
                },
            },
            practiceProblems: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        title: { type: Type.STRING },
                        problemStatement: { type: Type.STRING },
                        solution: { type: Type.STRING },
                    },
                    required: ["title", "problemStatement", "solution"],
                },
            },
        },
        required: ["concepts", "quiz", "practiceProblems"],
    };

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
                temperature: 0.7,
            },
        });

        const jsonText = response.text.trim();
        const parsedContent: EducationalContent = JSON.parse(jsonText);
        return parsedContent;

    } catch (error) {
        console.error("Error fetching or parsing Gemini content:", error);
        throw new Error("Failed to retrieve educational content from Gemini API.");
    }
};

export { fetchOopContent };
