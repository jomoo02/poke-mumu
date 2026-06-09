import { Button } from '@/shared/ui/button';
import Link from 'next/link';
export default function ButtonList() {
  return (
    <div className="p-6 border rounded-4xl bg-card flex flex-col gap-6">
      <h2 className="text-2xl font-bold">버튼</h2>
      <section className="">
        <div>default</div>
        <div className="pt-3 flex gap-x-4">
          <Button asChild className="px-4 rounded-4xl  h-10">
            <Link href="/">Button</Link>
          </Button>
          <Button asChild className="px-4 rounded-4xl  h-10" variant={'ghost'}>
            <Link href="/">Button</Link>
          </Button>
          <Button
            asChild
            className="px-4 rounded-4xl h-10"
            variant={'secondary'}
          >
            <Link href="/">Button</Link>
          </Button>
          <Button asChild className="px-4 rounded-4xl h-10" variant={'outline'}>
            <Link href="/" className="f">
              Button
            </Link>
          </Button>
        </div>
      </section>
      <section className="">
        <div>lg</div>
        <div className="pt-3 flex gap-x-4">
          <Button asChild className="px-5 rounded-4xl  h-11">
            <Link href="/">Button</Link>
          </Button>
          <Button asChild className="px-5 rounded-4xl  h-11" variant={'ghost'}>
            <Link href="/">Button</Link>
          </Button>
          <Button
            asChild
            className="px-5 rounded-4xl h-11"
            variant={'secondary'}
          >
            <Link href="/">Button</Link>
          </Button>
          <Button
            asChild
            className="px-5 rounded-4xl  h-11"
            variant={'outline'}
          >
            <Link href="/">Button</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
