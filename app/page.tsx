import Header from "@/components/Header";
import SearchForm from "@/components/SearchForm";

export default function Home() {
  return (
    <>
      <Header />
      <h1 className="col-span-4 mx-auto pb-12 text-center text-4xl leading-tight sm:max-w-96 md:col-span-8 md:text-[3.25rem] lg:col-span-12 lg:max-w-none lg:pb-16">
        How’s the sky looking today?
      </h1>
      <section className="col-span-4 md:col-span-8 lg:col-span-12">
        <SearchForm />
      </section>
    </>
  );
}
