import { ChevronDownIcon } from 'lucide-react';
import {
  RadioGroup as RadioGroupPrimitive,
  Label as LabelPrimitive,
} from 'radix-ui';

import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button';
import { Field, FieldGroup, FieldLabel, FieldSet } from '@/shared/ui/field';
import { Label } from '@/shared/ui/label';
import { RadioGroup, RadioGroupItem } from '@/shared/ui/radio-group';

interface ControlTriggerButtonProps extends React.ComponentProps<'button'> {
  isActive: boolean;
  isOpen?: boolean;
}

function ControlTriggerButton({
  isActive,
  children,
  isOpen,
  ...props
}: ControlTriggerButtonProps) {
  return (
    <Button
      variant={isActive ? 'default' : 'secondary'}
      className={cn(
        'h-10.5 transition-none',
        isActive
          ? 'bg-primary hover:bg-primary/70 text-primary-foreground active:bg-primary/70'
          : 'bg-input/50 dark:bg-input/70 hover:bg-input/70 dark:hover:bg-input',
      )}
      {...props}
    >
      {children}
      <ChevronDownIcon
        className={cn(
          'size-4.5 transition-transform duration-150',
          isOpen ? 'rotate-180 ' : '',
        )}
      />
    </Button>
  );
}

function ControlFieldGroup({
  className,
  children,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <FieldSet>
      <FieldGroup className={cn('gap-y-1 gap-x-6 grid', className)} {...props}>
        {children}
      </FieldGroup>
    </FieldSet>
  );
}

function ControlField({
  className,
  children,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <Field
      orientation={'horizontal'}
      className={cn(
        'gap-x-2.5 h-10 flex cursor-pointer',
        'relative isolate',
        'after:absolute after:inset-y-0 after:-inset-x-2 after:-z-10 after:rounded-lg hover:after:bg-muted',
        className,
      )}
      {...props}
    >
      {children}
    </Field>
  );
}

function ControlFieldLabel({ ...props }: React.ComponentProps<typeof Label>) {
  return (
    <FieldLabel
      className="font-medium cursor-pointer h-full text-md gap-2.5 flex-1 pr-2 -mr-2"
      {...props}
    />
  );
}

function ControlRadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroup
      className={cn('grid gap-x-6 gap-y-1', className)}
      {...props}
    ></RadioGroup>
  );
}

function ControlRadioGroupLabel({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <Label
      className={cn(
        'relative isolate flex items-center gap-2.5 h-10 text-md cursor-pointer',
        'after:absolute after:inset-y-0 after:-inset-x-2 after:-z-10 after:rounded-lg hover:after:bg-muted',
        className,
      )}
      {...props}
    />
  );
}

function ControlRadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupItem className={cn('cursor-pointer', className)} {...props} />
  );
}

export {
  ControlTriggerButton,
  ControlFieldGroup,
  ControlField,
  ControlFieldLabel,
  ControlRadioGroup,
  ControlRadioGroupLabel,
  ControlRadioGroupItem,
};
