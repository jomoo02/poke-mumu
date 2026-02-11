import { MoveDown, MoveRight } from 'lucide-react';

// import { type DetailArrowDirection } from '../../model';

// interface ArrowIconProps {
//   arrowDirection: DetailArrowDirection;
// }

export default function ArrowIcon() {
  // const { mobile, desktop } = arrowDirection;

  return (
    <>
      <div className="hidden lg:block">
        <MoveRight className="size-7.5 text-muted-foreground" />
        {/* {desktop === 'up' && (
          <MoveUpRight className="size-7.5 text-muted-foreground" />
        )}
        {desktop === 'down' && (
          <MoveDownRight className="size-7.5 text-muted-foreground" />
        )} */}
        {/* {desktop === 'center' && (
          <MoveRight className="size-7.5 text-muted-foreground" />
        )} */}
      </div>
      <div className="lg:hidden">
        <MoveDown className="size-7.5 text-muted-foreground" />
        {/* {mobile === 'left' && (
          <MoveDownLeft className="size-7.5 text-muted-foreground" />
        )}
        {mobile === 'right' && (
          <MoveDownRight className="size-7.5 text-muted-foreground" />
        )}
        {mobile === 'center' && (
          <MoveDown className="size-7.5 text-muted-foreground" />
        )} */}
      </div>
    </>
  );
}
