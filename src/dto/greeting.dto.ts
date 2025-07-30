import { Rule, RuleType } from '@midwayjs/validate';

export class CreateOrderDTO {
  @Rule(RuleType.string().required())
  orderName: string;

  @Rule(RuleType.number().required())
  price: number;

  @Rule(RuleType.array().items(RuleType.string()))
  items: string[];
}