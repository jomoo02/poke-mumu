export type Condition = {
  key: string;
  value: string | number | boolean;
};

export type Detail = {
  trigger: string;
  display: string;
  conditions: Condition[];
};
