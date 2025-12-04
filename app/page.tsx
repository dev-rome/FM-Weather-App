import Header from "@/components/Header";
import SearchForm from "@/components/SearchForm";

export default function Home() {
  return (
    <>
      <Header />
      <h1 className="text-4xl pb-12 lg:pb-16 md:text-[3.25rem] text-center col-span-4 md:col-span-8 sm:max-w-96 mx-auto lg:max-w-none lg:col-span-12 leading-tight">
        How’s the sky looking today?
      </h1>
      <section className="col-span-4 md:col-span-8 lg:col-span-12">
        <SearchForm />
      </section>
    </>
  );
}
