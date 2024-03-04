import React from 'react'
import Card from '@/components/Card'

const NewsStories: React.FC = () => {
  return (
    <main className="relative top-0 flex min-h-screen flex-col items-center justify-center p-24 bg-hi-dark font-poppins">
        <section className="container w-10/12">
        <Card apiUrl={process.env.NEXT_PUBLIC_POSTS_API} />
        </section>
    </main>
  )
}

export default NewsStories