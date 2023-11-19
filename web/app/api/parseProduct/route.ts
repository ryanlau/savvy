import { type NextRequest } from 'next/server'
import { GoogleVertexAI } from "langchain/llms/googlevertexai/web";


 
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('query')
  
  // query is "hello" for /api/search?query=hello

  const model = new GoogleVertexAI({
    temperature: 0.2,
  });

  const res = await model.call(`You are an AI assistant for Walmart. You parse natural language queries into ones that are easily understood by the Walmart search bar. You compress the user's query into short, concise ones easily understood. Do not include any information regarding location like near me. Here are some examples:.

    Query: I'm really excited about new laptops. Can you help me find one under $500?
    Response: laptops under $500
    Query: what's the best, cheapest brand of water out there? I must know!!
    Response: cheap water
    Query: My friend likes blue dresses. I want to get them one in size medium as a gift.
    Response: medium blue dresses

    Fill the following response for this query:
    Query: ${query}
    Response:`,
  );

  return Response.json({product: res.trim()})
}