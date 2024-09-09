export const plansMap = [
    {
      id: "basic",
      name: "Basic",
      description: "Get started with SpeakEasy!",
      price: "10",
      items: ["3 Blog Posts", "3 Transcription"],
      paymentLink: "https://buy.stripe.com/test_bIYcQsfLP4bpa6A3cc",
      priceId:
        process.env.NODE_ENV === "development"
          ? "price_1PxCvkG5x7vkpoG8lHdhfRGv"
          : "",
    },
    {
      id: "pro",
      name: "Pro",
      description: "All Blog Posts, let’s go!",
      price: "19.99",
      items: ["Unlimited Blog Posts", "Unlimited Transcriptions"],
      paymentLink: "https://buy.stripe.com/test_aEUeYAeHL4bp5Qk5kl",
      priceId:
        process.env.NODE_ENV === "development"
          ? "price_1PxCx2G5x7vkpoG8HzPxK7S3"
          : "",
    },
  ];
  
  export const ORIGIN_URL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://speakeasyai-demo.vercel.app";