'use client'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import messages from '@/messages.json'
import Autoplay from "embla-carousel-autoplay";
import { Mail } from "lucide-react";


const Home = () => {
  return (
    <main className='flex flex-grow flex-col items-center justify-center px-4 md:px-24 py-12'>
      <section className='text-center mb-8 md:mb-12'>
        <h1 className='text-3xl md:text-4xl font-bold'>
          Dive into the world of <span className='text-red-400'>Annonymous Conversations</span>
        </h1>
        <p className='mt-3 md:mt-4 text-base'>
      Explore <span className='text-red-400'>Anony</span>~ where your identity remains secret.
        </p>
      </section>

      <Carousel plugins={[Autoplay({ delay: 2000 })]} className="w-full max-w-lg md:max-w-xl">
      <CarouselContent>
        {messages.map((message, index) => (
          <CarouselItem key={index} className="p-4">
            <Card>
              <CardHeader>
                <CardTitle>{message.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-start space-y-2 md:flex-row md:space-x-4 md:space-y-0">
                <Mail className="flex-shrink-0" />
                <div>
                  <p>{message.content}</p>
                  <p className="text-xs text-muted-foreground">{message.received}</p>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
    </main>
  )
}

export default Home