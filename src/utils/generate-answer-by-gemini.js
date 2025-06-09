const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();


async function generateAnswer(username, genders, targetAudience, possibleRecommendations) {
    const chatIA = new GoogleGenAI({ apiKey: process.env.API_KEY_GEMINI });


    try {
        const modelIA = chatIA.models.generateContent({
            model: "gemini-2.0-flash",
            contents: `
                Gere uma resposta em json mínima para o usuário ${username}, contendo:

                Um parágrafo curto descrevendo seu perfil de espectador com base nos gêneros(description):
                    ${genders}

                Demografias: ${targetAudience}


                Inclua uma recomendação de anime compatível com o perfil(recommendation).

                Você tem a disposição os seguintes animes mapeados para recomendar: ${possibleRecommendations}

                Responda somente  necessário, sem incluir outro atributo além de : description e recommendation no objeto json

                Obs: description é relatorio resumido e recommendation é o nome do anime, exemplo de estrutura retornada :
                {
                    description: ".....",
                    recommendation: "...."
                }

                nada mais e nada menos em ihipotesse alguma.
            `
        });
        const response = (await modelIA).text;
        const tokens = (await modelIA).usageMetadata;
        console.log({
            tokens
        })

        const responseExtract = response.slice(7, response.length - 3)

        return JSON.parse(responseExtract);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = {
    generateAnswer
}