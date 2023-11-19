import { NextRequest } from 'next/server';
import { Message as VercelChatMessage, StreamingTextResponse } from 'ai';

import { AIMessage, HumanMessage, SystemMessage } from "langchain/schema";
import { ChatGoogleVertexAI } from "langchain/chat_models/googlevertexai/web";
import { BytesOutputParser } from 'langchain/schema/output_parser';
import { PromptTemplate } from 'langchain/prompts';

export const runtime = 'edge';

/**
 * Basic memory formatter that stringifies and passes
 * message history directly into the model.
 */
const formatMessage = (message: VercelChatMessage) => {
  if (message.role == "assistant") return ""
  return `${message.role}: ${message.content}`;
};


const examples = [
  {
    input: new HumanMessage(""),
    output: new AIMessage("")
  }
]


// const TEMPLATE = `
// Current conversation:
// {chat_history}
 
// User: {input}
// AI:
// `

/*
 * This handler initializes and calls a simple chain with a prompt,
 * chat model, and output parser. See the docs for more information:
 *
 * https://js.langchain.com/docs/guides/expression_language/cookbook#prompttemplate--llm--outputparser
 */
export async function POST(req: NextRequest) {
  const body = await req.json();

  const messages = body.messages ?? [];

  var initialPrompt = ""

  const parseProductResponse = await fetch(`https://shop.savvywith.us/api/parseProduct?query=${messages[0].content}`)
  const {product} = await parseProductResponse.json()


  const walmartProductsResponse = await fetch(`https://shop.savvywith.us/api/products?query=${product}`)
  const walmartProducts = await walmartProductsResponse.json()

  walmartProducts.forEach((product: any) => {
    initialPrompt += `${product.name}\n${product.price}\n${product.rating} stars\n${product.description}\n${product.img}\n${product.id}\n\n`
  })
  

  initialPrompt += `\n\nReturn an array containing JSON objects. For each one of the products given above, return a JSON object that has the fields including the name, rating, price, explanation, img, id, and features. The name is a string, and is provided for each example. Acceptable values for rating is a number on a scale of 0 to 100, according to how well it fits the user's query. Take into account how many stars others have given it (given on a 0 to 5 scale) into account when computing your rating as well. The explanation is a string explaining the rating you gave, in detail, about what about the product warrants that rating for the user. If you deducted points, what about the product caused you to deducted points. If it has a particularly high score, why? Write about the features that set each product apart in the explanation. The feature field is a string of semicolon delimited features. Remember to do this for all products. Be sure to respond in English and ensure that the response is a complete and valid JSON object.\nCurrent conversation: {chat_history}\n\nUser: {input}\nAI:`

  const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);
  
  const currentMessageContent = messages[messages.length - 1].content;

  const prompt = PromptTemplate.fromTemplate(initialPrompt);
  console.log(prompt)

  const model = new ChatGoogleVertexAI({
    maxOutputTokens: 2000,
    temperature: 0.5,
    // model: "text-bison-32k"
    //examples: examples,
    
  });

  const outputParser = new BytesOutputParser();
  const chain = prompt.pipe(model).pipe(outputParser);
  const stream = await chain.stream({
    chat_history: formattedPreviousMessages.join('\n'),
    input: currentMessageContent,
  });

  // return Response.json({});
  return new StreamingTextResponse(stream);
}