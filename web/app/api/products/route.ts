import { type NextRequest } from 'next/server'
 

type Product = {
  name: string
  rating: number
  description: string
  price: number
  img: string
}
 
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('query')
  // query is "hello" for /api/search?query=hello


  // send a get request to https://savvy-walmart-signature.onrender.com/
  const signatureResponse = await fetch('https://savvy-walmart-signature.onrender.com/')
  const {signature, consumerID, timestamp, privateKeyVersion }  = await signatureResponse.json()

  console.log(signature, consumerID, timestamp, privateKeyVersion);
  

  // send a get request to https://developer.api.walmart.com/api-proxy/service/affil/product/v2/search
  const walmartResponse = await fetch(`https://developer.api.walmart.com/api-proxy/service/affil/product/v2/search?query=${query}`, {
    headers: {
      "WM_SEC.KEY_VERSION": privateKeyVersion,
      "WM_CONSUMER.ID": consumerID,
      "WM_CONSUMER.INTIMESTAMP": timestamp,
      "WM_SEC.AUTH_SIGNATURE": signature,
      }
  })

  const walmartJson = await walmartResponse.json()

  console.log(walmartJson);
  

  const cleaned: Product[] = []

  walmartJson.items.forEach((item: any) => {
    cleaned.push({
      name: item.name,
      rating: item.customerRating,
      description: item.shortDescription,
      price: item.salePrice,
      img: item.largeImage,
    })
  })

  return Response.json(cleaned)
}