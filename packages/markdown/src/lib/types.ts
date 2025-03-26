import type { TElement } from '@udecode/plate';
import type * as mdastUtilMath from 'mdast-util-math';

import type {
  TCodeBlockElement,
  TDateElement,
  TEquationElement,
  TImageElement,
  TLinkElement,
  TMentionElement,
  TTableCellElement,
  TTableElement,
  TTableRowElement,
} from './internal/types';
import type { mdast } from './serializer';
import type { SerializeMdOptions } from './serializer/serializeMd';

export type ElementTypes =
  | InlineElementTypes
  | 'a'
  | 'blockquote'
  | 'callout'
  | 'code_block'
  | 'code_line'
  | 'column'
  | 'column_group'
  | 'date'
  | 'equation'
  | 'heading'
  | 'hr'
  | 'img'
  | 'inline_equation'
  | 'li'
  | 'lic'
  | 'list'
  | 'mention'
  | 'p'
  | 'suggestion'
  | 'table'
  | 'td'
  | 'th'
  | 'toc'
  | 'toggle'
  | 'tr';

export type NodeParser<K extends keyof ElementTypeMap> = {
  deserialize?: (
    mdastNode: ReturnTypeMap[K],
    options: SerializeMdOptions
  ) => ElementTypeMap[K];
  serialize?: (
    slateNode: ElementTypeMap[K],
    options: SerializeMdOptions
  ) => ReturnTypeMap[K];
};

export type Nodes = Partial<{
  [K in keyof ElementTypeMap]: NodeParser<K>;
}> &
  Record<
    string,
    {
      deserialize?: (mdastNode: any, options: SerializeMdOptions) => any;
      serialize?: (slateNode: any, options: SerializeMdOptions) => any;
    }
  >;

type ElementTypeMap = {
  a: TLinkElement;
  blockquote: TElement;
  code_block: TCodeBlockElement;
  date: TDateElement;
  equation: TEquationElement;
  heading: TElement;
  hr: TElement;
  img: TImageElement;
  inline_equation: TEquationElement;
  mention: TMentionElement;
  p: TElement;
  table: TTableElement;
  td: TTableCellElement;
  th: TElement;
  tr: TTableRowElement;
};

type InlineElementTypes =
  | 'bold'
  | 'code'
  | 'comment'
  | 'html'
  | 'italic'
  | 'strikethrough'
  | 'suggestion'
  | 'text';

type ReturnTypeMap = {
  a: mdast.Link;
  blockquote: mdast.Blockquote;
  code_block: mdast.Code;
  date: mdast.Text;
  equation: mdastUtilMath.Math;
  heading: mdast.Heading;
  hr: mdast.ThematicBreak;
  img: mdast.Paragraph;
  inline_equation: mdastUtilMath.InlineMath;
  mention: mdast.Text;
  p: mdast.Paragraph;
  table: mdast.Table;
  td: mdast.TableCell;
  th: mdast.TableCell;
  tr: mdast.TableRow;
};
