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
    input: new HumanMessage(""),
    output: new AIMessage("")
  }
]





const TEMPLATE = `
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

  const message = `
Hisense 100L5G-DLT100B 100-inch 4K Smart Laser TV, Including Hard Screen, with an Additional 1 Year Coverage by Epic Protect (2022)
$2309
4.3 stars
Hisense 100L5G-DLT100B Smart Laser TV - Ultra Short Throw Technology - 100" Laser TV Display - Dolby Atmos Sound - Smart Android TV - 25,000 Hour Life - Smooth Motion - MEMC - Game Mode - ALLM - Filmmaker Mode - 4K - 60Hz Refresh - Ambient Light Rejection - HDR10 - 2700 Lumens Peak Brightness - X-Fusion Laser Engine - Smart Home Ready - 83 Percent DCI-P3 Color Space - 1,000,000:1 Dynamic Contrast Ratio - Blue Laser and Phosphor Color Filter Light Source - 0.25:1 Throw Ratio - App Store - Multiple Streaming Services - Voice Assistant Compatible - Chromecast Screen Mirroring - Wi-Fi - Bluetooth - Ethernet - 3x HDMI - 2x USB - RF - Optical - Analog Audio - Noise Reduction - Parental Controls - Closed Caption - Sleep Timer - Eye Safety - Remote Finder - 30W Stereo Audio - Dolby Digital - eARC/CEC - 150 Degree Viewing Angle - Accessories Included: Remote, Quick Start Guide, Power Cable, Cleaning Kit - Fresnel ALR - 1.0 Gain - Scratch Resistance - Screen Assembly Required - Screen: (88.60"W x 1.20"D x 50.40"H) - Projector: (21.50"W x 13.60"D x 6.20"H) - (Black/Gray) with a 1 Year Coverage by Epic Protect in Addition to the Included Full Manufacturer Warranty. Intended for Residential Use Only


LG 70" Class 4K UHD 2160P webOS Smart TV - 70UQ7070ZUD
$498
4.4 stars
Dive into a world of free content and personalized recommendations for everyone you share the remote with. Enhance your picture and sound with AI from the α5 Gen5 AI Processor 4K that is engineered to amaze by transforming your regular content into 4K for sharper definition and detail, even on our biggest screens*. Take binge-watching further by customizing your viewing experience with separate accounts and personalized recommendations for every member of your family with webOS 22. And enjoy binge-worthy streaming with built-in access to Netflix, the Apple TV app, Disney+, HBO Max** and to over 300+ free LG Channels*** with everything from comedy to movies to sports. For gamers, you can make it the best gaming experience by quickly adjusting all your game settings in one location with the LG Game Optimizer and Dashboard. Bring your content to life with LG UHD. See a vivid picture every time with LG UHD’s 4K resolution. *Image quality of upscaled content will vary based on the source resolution. **Internet connection and subscriptions to streaming services are required. HBO Max™ ©2022 Warner Media, LLC. All Rights Reserved. HBO Max is used under license. ***Number of LG Channels subject to change. with. *Number of LG Channels subject to change.


Philips 75" Class 4K Ultra HD (2160p) Google Smart LED TV (75PUL7552/F7)
$628
4.5 stars
Watch what you love, control it with your voice. The Philips Google TV brings together movies, shows, live TV and more from across your apps and organizes them just for you. Ask Google to find movies and shows, answer questions, control smart home devices, and more, with your voice. Enjoy the beauty of 4K Ultra HD TV and see more of what the director intended. Find the entertainment you love with help from Google.


onn. 70” Class 4K UHD (2160P) LED Roku Smart TV HDR (100012588)
$428
4.1 stars
Binge on movies and TV episodes, news, sports, music and more! We insisted on 4K Ultra High Definition for this 70” LED TV, bringing out more lifelike color, texture and detail than ever before. We also partnered with Roku to bring you the best possible content with thousands of channels to choose from, conveniently presented through your own customizable home screen. Watch via cable, satellite, HDTV antenna or just start streaming from your favorite app. Like the sound of your own voice You can actually use it with the Roku mobile app to search for a title, artist, actor or director, or just go old-school with our handy remote. We handle all software updates too, automatically, so all you have to worry about is what to watch. Lose yourself in the ultimate viewing experience. Watch on with our onn. 4K UHD 70" Smart TV. We're onn. to something here. We took the hassle out of buying electronics and built a brand that's fresh and simple. With delightful pops of color, finding the right product has never been easier. Say goodbye to stressful decision-making and fear of the electronics aisle. Our mission is simple… to deliver great products and make it easy. Choose onn. and get back to using your brainpower for the important things in life like pondering the question, "What should I binge watch this weekend?"


Return an array containing JSON objects. For each one of the products given above, return a JSON object that has the fields including the name, rating, and explanation. The name is a string, and is provided for each example. Acceptable values for rating is a number on a scale of 0 to 100, according to how well it fits the user's query. Take into account how many stars others have given it (given on a 0 to 5 scale) into account when computing your rating as well. The explanation is a string explaining the rating you gave, in detail, about what about the product warrants that rating for the user. If you deducted points, what about the product caused you to deducted points. If it has a particularly high score, why? Write about the features that set each tv apart in the explanation. Be sure to respond in English.


The user query is: "${currentMessageContent}"`

  const prompt = PromptTemplate.fromTemplate(TEMPLATE);
  /**
   * See a full list of supported models at:
   * https://js.langchain.com/docs/modules/model_io/models/
   */
  const model = new ChatGoogleVertexAI({
    temperature: 0.2,
    //examples: examples,
    
  });

  const outputParser = new BytesOutputParser();
  const chain = prompt.pipe(model).pipe(outputParser);
  const stream = await chain.stream({
    chat_history: formattedPreviousMessages.join('\n'),
    input: message,
  });

  return new StreamingTextResponse(stream);
}