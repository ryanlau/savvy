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
  return `${message.role}: ${message.content}`;
};


const examples = [
  {
    input: new HumanMessage(`Shopper Query: Which TV is best for me under $500?

List of options: [{
"name": "Sony 65” Class BRAVIA XR A90J 4K HDR OLED TV Smart Google TV XR65A90J (New)",
            "msrp": 2198,
            "salePrice": 1398,
            "shortDescription": "Introducing Sony’s best-ever OLED TV, with awe-inspiring contrast and our brightest-ever OLED picture. The BRAVIA XR A90J OLED TV, powered by the all-new Cognitive Processor XR, features next-generation technologies that redefine the viewing experience. Engineered for beauty inside and out, the A90J brings a premium, minimalist-inspired design that fits even the most sophisticated of aesthetics. Enjoy breathtaking contrast on our best ever OLED with picture quality that feels deep, natural, and real. Its revolutionary processor uses human perspective analysis to cross-analyze and optimize hundreds of thousands of elements in a blink of an eye. Paired with our unique OLED panel, this technology delivers pure blacks and our brightest ever picture."},
{"name": "SAMSUNG 65\" Class TU690T Crystal UHD 4K Smart Television - UN65TU690TFXZA",
            "salePrice": 398,
            "shortDescription": "See how the 65\" Class TU690T Crystal UHD 4K Smart TV powered by Tizen elevates what you watch—at a value you'll love. Go beyond HDTV to enjoy your content in 4K resolution, and in PurColor. And with Smart TV powered by Tizen built in, it's easy to find and stream the latest shows and movies in just a few clicks."},
{"name": "SAMSUNG 55\" Class TU690T Crystal UHD 4K Smart Television - UN55TU690TFXZA (New)",
            "msrp": 418,
            "salePrice": 298,
            "shortDescription": "See how the 55\" Class TU690T Crystal UHD 4K Smart TV powered by Tizen elevates what you watch—at a value you'll love. Go beyond HDTV to enjoy your content in 4K resolution, and in PurColor. And with Smart TV powered by Tizen built in, it's easy to find and stream the latest shows and movies in just a few clicks. Stream your favorite shows. Play games. Work out with a trainer. Do all you enjoy with Smart TV Powered by Tizen. Discover your must-have apps and streaming services all just a few clicks away. Upgrade your entertainment with this SAMSUNG 55\" Class TU690T Crystal UHD 4K Smart Television."}]`),
    output: new AIMessage(`[
      {
          "name": "Sony 65” Class BRAVIA XR A90J 4K HDR OLED TV Smart Google TV XR65A90J (New)",
          "topFeatures": "OLED picture, Cognitive Processor XR, optimal contrast, bright display",
          "rating": 40,
          "comment": "Excellent quality but exceeds budget constraints"
      },
      {
          "name": "SAMSUNG 65" Class TU690T Crystal UHD 4K Smart Television - UN65TU690TFXZA",
          "topFeatures": "4K resolution, PurColor, Smart TV features, budget-friendly",
          "rating": 90,
          "comment": "Great match for budget and features"
      },
      {
          "name": "SAMSUNG 55" Class TU690T Crystal UHD 4K Smart Television - UN55TU690TFXZA (New)",
          "topFeatures": "4K resolution, Tizen OS, PurColor, excellent value for price",
          "rating": 95,
          "comment": "Superb choice for budget and 4K experience"
      }
  ]`)
  },
  {
    input: new HumanMessage(`Shopper Query: I'm looking for a cheap and portable chair

    List of options:  [{"name": "Adult Folding Faux Fur Butterfly Chair, Gray",
                "msrp": 34.97,
                "salePrice": 28,
                "shortDescription": "Lounging in style has never been easier with the Mainstays Folding Butterfly Chair in Gray Faux Fur. Decked out in soft, luxurious faux fur, this portable accent chair is your modern seating solution for any living space, big or small. This smart folding chair features a well-tailored, button-tufted backrest and a cushy, padded seat that easily slides onto a hardwearing steel frame. The simple, collapsible design makes it easy to fold and carry, perfect for everyday use in small-space dorms or apartment living. And when you need extra floor space, this padded folding chair is easy to store. Add convenient comfort and style to any space with the Mainstays Folding Butterfly Chair in Grey Faux Fur. Plus, it holds up to 225 LBS, good for both teenage and adult. Available in multiple colors! Choose from black Microsuede, gray faux fur, spearmint faux fur and teal faux fur. Age group: Adult"},{"name": "Mainstays All-Steel Metal Folding Chair, Double Braced, Gray",
                "salePrice": 13.98, "shortDescription": "Use this Mainstays All-Steel Folding Chair for your next activity or get together! The perfect seating solution for any gathering, this full-size chair is multipurpose and great for hosting dinner parties with friends, family game night, or use for everyday dining. With its contoured seat back, this trusted seating solution provides long-lasting comfort for any occasion and is ready to serve all your needs! Available in a sophisticated gray colorway to match any household décor or personal aesthetic and features non marring foot caps that helps to protect your floors from scratches or damage. The chair’s durable, all-steel construction allows for a 250 lbs. weight capacity rating. Its overall design makes it easy to clean using a damp cloth and folds flat for compact storage. With a 1-year, limited warranty, you can relax knowing you’ve created an entertainer’s daydream using these durable and comfortable chairs."}, {"name": "Ozark Trail Basic Quad Folding Camp Chair with Cup Holder, Blue, Adult use",
                "salePrice": 8.88, "shortDescription": "If you are looking for easy-to-use, versatile seating, choose the Ozark Trail Basic Quad Folding Outdoor Camp Chair, Blue. This chair is perfect for use at the campsite, while tailgating, on the sidelines at your children’s game or anywhere else you need a seat. This quad folding chair features steel frame construction for durability and boasts a weight capacity of 225 pounds. And thanks to the durable 600D polyester fabric with PE coating you can count on this chair for long-lasting comfort. It is also designed with a built-in mesh cup holder to keep your drink or other important items close at hand. With this chair’s quad-folding design, it does not take up much space when folded and comes with a polyester carry bag for easy transportation. Whether you are planning your next camping trip or just hanging out in the backyard, if you need comfortable and reliable seating, choose the Ozark Trail Basic Quad Folding Outdoor Camp Chair."}`),
    output: new AIMessage(`[
      {
          "name": "Adult Folding Faux Fur Butterfly Chair, Gray",
          "topFeatures": "Soft faux fur, button-tufted backrest, foldable and portable, holds up to 225 lbs",
          "rating": 85,
          "comment": "Highly portable and stylish, but slightly higher in price."
      },
      {
          "name": "Mainstays All-Steel Metal Folding Chair, Double Braced, Gray",
          "topFeatures": "Contoured seat back, all-steel construction, 250 lbs weight capacity, folds flat for storage",
          "rating": 90,
          "comment": "Extremely durable and budget-friendly, but less portable due to its metal construction."
      },
      {
          "name": "Ozark Trail Basic Quad Folding Camp Chair with Cup Holder, Blue, Adult use",
          "topFeatures": "Steel frame, 225 lbs weight capacity, mesh cup holder, comes with a carry bag",
          "rating": 95,
          "comment": "Excellent for portability and affordability, ideal for outdoor use."
      }]`)
  },
  {
    input: new HumanMessage (`Shopper Query: "I need an affordable, multifunctional printer for home use. Preferably under $100."

    List of Options: [
        {
            "name": "HP DeskJet 2755e Wireless All-in-One Printer",
            "salePrice": 74.99,
            "shortDescription": "The HP DeskJet 2755e offers versatile printing for your whole family. Easily print, scan, and copy everyday documents from your smartphone using HP Smart app. This wireless printer also comes with a 6-month free trial of Instant Ink, which HP ships to you automatically."
        },
        {
            "name": "Canon PIXMA MG3620 Wireless All-In-One Color Inkjet Printer",
            "salePrice": 59.99,
            "shortDescription": "The Canon PIXMA MG3620 is a Wireless Inkjet All-In-One printer that offers convenience and simplicity for all your printing needs. Print and scan from almost anywhere around the house with its wireless capability. Save time and money with great features such as Auto duplex printing and Mobile Device Printing."
        },
        {
            "name": "Epson EcoTank ET-2760 Wireless Color All-in-One Cartridge-Free Supertank Printer",
            "salePrice": 299.99,
            "shortDescription": "The EcoTank ET-2760 offers Cartridge-Free Printing with easy-to-fill, supersized ink tanks. You get up to 2 years of ink with each included or replacement ink set. Plus, save up to 90 percent with low-cost replacement ink bottles compared to ink cartridges."
        }
    ]`),
    output: new AIMessage (`[
      {
          "name": "HP DeskJet 2755e Wireless All-in-One Printer",
          "topFeatures": "Wireless printing, scan/copy functions, HP Smart app compatibility, 6-month free trial of Instant Ink",
          "rating": 92,
          "comment": "Great value for money, offering versatile functions within your budget."
      },
      {
          "name": "Canon PIXMA MG3620 Wireless All-In-One Color Inkjet Printer",
          "topFeatures": "Wireless, Auto duplex printing, Mobile Device Printing, simple setup",
          "rating": 95,
          "comment": "Excellent affordability with advanced features, perfect for home use."
      },
      {
          "name": "Epson EcoTank ET-2760 Wireless Color All-in-One Cartridge-Free Supertank Printer",
          "topFeatures": "Cartridge-Free Printing, supersized ink tanks, cost-effective ink replacement, 2 years of ink included",
          "rating": 60,
          "comment": "Offers long-term savings but exceeds the specified budget."
      }
  ]`)
  }
]





const TEMPLATE = `You are an assistant is designed to analyze a list of products and provide recommendations to users based on their specific queries. You are adept at understanding and processing various product attributes like price, features, and descriptions.

Capabilities:

Product Analysis: You can interpret detailed product information, including name, pricing, features, and descriptions.
Query Understanding: You understand user queries well, and can handle specific filters like "___ under $500", or "with/without {{feature_name}}"
Rating System: You employ a rating system to score products out of 100, considering how well each product matches the user's requirements. This rating is influenced by factors like how closely the product fits the user's budget and the value it offers for its price.
Customized Responses: Your responses are in JSON format, providing a structured and machine-readable output. Each response includes the product name, a summary of its top features, a rating score, and a brief comment that contextualizes the score.

Input Format:
Shopper Query (text): ___?
List of options (list): [{{
"name": ___,
"msrp": ___,
"salePrice":___,
"shortDescription":___,
}}]

Output Format (JSON): The response is structured as a JSON array, with each element being an object that contains the following keys:

name: The name of the product.
topFeatures: A brief description of the product's most notable features. Comma delimited
rating: A score out of 100, indicating how well the product matches the user's query.
comment: A explanation or remark that provides context to the rating, highlighting why the product received its particular score. You should pull external data about the product, if necessary to write the best review possible. Justify your rating. Your rating is very important because the shopper takes your word seriously.

Current conversation:
{chat_history}
 
User: {input}
AI:
`

/*
 * This handler initializes and calls a simple chain with a prompt,
 * chat model, and output parser. See the docs for more information:
 *
 * https://js.langchain.com/docs/guides/expression_language/cookbook#prompttemplate--llm--outputparser
 */
export async function POST(req: NextRequest) {
  const body = await req.json();
  const messages = body.messages ?? [];
  const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);
  const currentMessageContent = messages[messages.length - 1].content;

  const prompt = PromptTemplate.fromTemplate(TEMPLATE);
  /**
   * See a full list of supported models at:
   * https://js.langchain.com/docs/modules/model_io/models/
   */
  const model = new ChatGoogleVertexAI({
    temperature: 0.2,
    // examples,
  });

  const outputParser = new BytesOutputParser();
  const chain = prompt.pipe(model).pipe(outputParser);

  const stream = await chain.stream({
    chat_history: formattedPreviousMessages.join('\n'),
    input: currentMessageContent,
  });


  return new StreamingTextResponse(stream);
}