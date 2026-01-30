import { checkTextIntergerType, getDirectionalParticle } from '../lib';
import { useSearchContext } from '../provider/search.context';

interface InputValue {
  inputValue: string;
}

function EmptyCase() {
  return <span className="text-foreground">최근 검색한 포켓몬</span>;
}

function PokedexNumberCase({ inputValue }: InputValue) {
  return (
    <div>
      <span className=" text-foreground">도감 번호</span>
      <span className="underline mx-1  text-foreground underline-offset-2 decoration-foreground">
        {inputValue}
      </span>
      <span className=" text-foreground">포켓몬</span>
    </div>
  );
}

function PokeNameCase({ inputValue }: InputValue) {
  return (
    <div>
      <span className=" text-foreground  underline-offset-2 decoration-foreground">
        {inputValue}
      </span>
      <span className="text-foreground ">{`${getDirectionalParticle(inputValue) || '(으)로'} 검색한 포켓몬`}</span>
    </div>
  );
}

export default function Description() {
  const { isInputEmpty, inputValue } = useSearchContext();

  // return <PokeNameCase inputValue={inputValue} />;

  return (
    <div className="px-4 border-b py-2">
      {isInputEmpty ? (
        <EmptyCase />
      ) : checkTextIntergerType(inputValue) ? (
        <PokedexNumberCase inputValue={inputValue} />
      ) : (
        <PokeNameCase inputValue={inputValue} />
      )}
    </div>
  );
}
